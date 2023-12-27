import smtplib
import time
import requests
from uagents import Agent, Model, Context, Bureau
import os
from dotenv import load_dotenv
import numpy as np
import pandas as pd
import yfinance as yf
from keras.models import load_model
import matplotlib.pyplot as plt
import sys
from datetime import date, timedelta
from typing import List, Optional

load_dotenv()

stocker = Agent(name="Stocker", seed="bendl")
user = Agent(name="user", seed="bendasl")
notifier = Agent(name="notifier", seed="notifier")
proxy_num = 1

sender_email = os.getenv("EMAIL_USERNAME")
sender_password = os.getenv("EMAIL_PASSWORD")
auth_token = os.getenv("DATABASE")
api_key = os.getenv("APIKEY")

api_url = "http://www.alphavantage.co/query"
server_address = "http://test/get_data/"

class Request(Model):
    request_data_type: str
    message: str

class Response(Model):
    status: bool
    message: str

# Create a data model for temperature data
class TemperatureData(Model):
    temperature: float

# Data model for company data
class companyData(Model):
    companyName: str
    companyCode: str

# Data model for user data
class UserData(Model):
    identifier: str
    next_notify: float
    company: List[companyData]

# Cache Data
user_cache = []

users_data = []

# Using proxy to avoid Rate Limiting from APIs
def get_proxy(use_proxy):
    proxy_list = [
        "http://upwalarz:dtf7a0idytuq@38.154.227.167:5868",
        "http://upwalarz:dtf7a0idytuq@185.199.229.156:7492",
        "http://upwalarz:dtf7a0idytuq@185.199.228.220:7300",
        "http://upwalarz:dtf7a0idytuq@185.199.231.45:8382",
        "http://upwalarz:dtf7a0idytuq@188.74.210.207:6286",
        "http://upwalarz:dtf7a0idytuq@188.74.183.10:8279",
        "http://upwalarz:dtf7a0idytuq@188.74.210.21:6100",
        "http://upwalarz:dtf7a0idytuq@45.155.68.129:8133",
        "http://upwalarz:dtf7a0idytuq@154.95.36.199:6893",
        "http://upwalarz:dtf7a0idytuq@45.94.47.66:8110"
    ]
    proxies = {
        'http': proxy_list[use_proxy],
        'https': proxy_list[use_proxy]
    }
    return proxies

# Main handlers
@stocker.on_message(model=Request)
async def handle_message(ctx: Context, sender: str, msg: Request):
    if msg.request_data_type =="graph_data":
        response = get_graph_data(msg.message)
    if msg.request_data_type =="all_data":
        company_data = get_company_meta(msg.message)
        graph_data = get_graph_data(msg.message)
        response = {
            "meta":company_data,
            "graph":graph_data,
        }
    if msg.request_data_type =="predict":
        response = getStockPrice(msg.message)
        response = {"Advice":response}
    if response:
        ctx.send(sender,Response(status=True,message=response))
    else:
        ctx.send(sender,Response(status=False,message="Bad Request"))

# User handlers
@user.on_interval(period=3.0)
async def send_message(ctx: Context):
    # ctx.send is a function that sends a message to the specified agent address
    await ctx.send('agent1qv0p5fru7v5pc2hymcfvnt389w9nc8aq3wn9ysl2ym8rn7vshnlx6kj5gs4', Request(message="hello there bob"))
    ctx.logger.info(f"Message has been sent to Bob")

# Notifier handlers
@notifier.on_interval(period=10.0)
async def alert_user(ctx: Context):
    users = get_all_enabled_user_data(Context)
    for user in users:
        temp = get_user_follower(user,Context)
        if temp != False:
            users_data.append(temp)
    for user in users_data:
        notify_if_required(user,Context)
            
# -x-x-x-x-x-x-x-Support Functions-x-x-x-x-x-x-x-x-x-x-x

async def send_email(subject, receiver, message_body,ctx:Context):
    # Constructs the email message
    sender = "stalker@stocker.com"
    message = f"""\
Subject: {subject}
To: {receiver}
From: {sender}

{message_body}
"""
    try:
        with smtplib.SMTP("sandbox.smtp.mailtrap.io", 2525) as server:
            server.login(sender_email, sender_password)
            server.sendmail(sender, receiver, message)
        return True
    except Exception as e:
        ctx.logger(f"Failed to send email {e}")
        return False


def get_symbols(keywords):
    try:
        function = "SYMBOL_SEARCH"
        # Make the API request
        response = requests.get(api_url["searchCode"], params={
            "function": function,
            "keywords": keywords,
            "apikey": api_key
        }, proxies=get_proxy(proxy_num))

        if response.status_code == 200:
            data = response.json()
            print(data)
            return data.get("bestMatches")[0]
        else:
            print(f"Error: {response.status_code}")
            return None
    except:
        pass
    
def get_company_meta(company_code):
    try:
        response = requests.get(api_url,  proxies=get_proxy(proxy_num), params={
            "function": "OVERVIEW",
            "symbol": company_code,
            "apikey": api_key})
        if response.status_code == 200:
            if "rate limit" in response.status_code:
                return 400, None
            response = response.json()
            if response == None:
                return
            meta = {
                "company_name":response["Name"],
                "description":response["Description"],
                "currency":response["Currency"],
                "country":response["Country"],
                "sector":response["Sector"],
                "market_cap":response["MarketCapitalization"],
                "peg_ratio":response["PEGRatio"],
                "pe_ratio":response["PERatio"],
                "profit_margin":response["ProfitMargin"],
                "div_yield":response["DividendYield"],
                "year_high":response["52WeekHigh"],
                "year_low":response["52WeekLow"],
                "day_moving_average_fifty":response["50DayMovingAverage"],
                "day_moving_average_fifty":response["200DayMovingAverage"],
            }
            return 200, meta
    except:
        return 500,None
    
def get_graph_data(company_code):
    try:
        response = requests.get(api_url,  proxies=get_proxy(proxy_num), params={
            "function": "TIME_SERIES_DAILY",
            "symbol": company_code,
            "apikey": api_key})
        if response.status_code == 200:
            if "rate limit" in response.status_code:
                return 400, None
            response = response.json()
            if response == None:
                return
            return response.get("Time Series (Daily)")[:7]
    except:
        return 500,None
    
def get_all_enabled_user_data(ctx:Context):
    try:
        response = requests.get(server_address+"/get_all_data/",headers={"Authorization": "Token " + auth_token})
        if response.status_code == 200:
            users = response.json()
            for user in users:
                if user.get("to_notify") == True:
                    cache_user = UserData(
                        email=user.get("email"),
                        next_notify=user.get("last_notified")
                        )
                    user_cache.append(cache_user)
            return user_cache
        return None   
    except:
        ctx.logger("Getting Data from storage Failed")
        return None
    
def get_user_follower(user: UserData,ctx: Context):
    try:
        response = requests.get(server_address+"/stock_subbed/"+user.identifier)
        if response.status_code == 200:
            followed = response.json()
            user.company = None
            for companies in followed:
                temp = companyData(
                    companyName=companies.get("company_name"),
                    companyCode=companies.get("company_code"),
                )
                user.company.append(temp)
            return user
        return None   
    except:
        ctx.logger("Getting Data from storage Failed")
        return None

def getStockPrice(stock_symbol):
    model = load_model('HackAI_Model.keras')
    today = date.today()
    yesterday = today - timedelta(days=1)
    stock = stock_symbol
    start = '2012-01-01'
    end = yesterday
    try:
        data = yf.download(stock, start ,end)
        data_train = pd.DataFrame(data.Close[0: int(len(data)*0.80)])
        data_test = pd.DataFrame(data.Close[int(len(data)*0.80): len(data)])
        from sklearn.preprocessing import MinMaxScaler
        scaler = MinMaxScaler(feature_range=(0,1))
        pas_100_days = data_train.tail(100)
        data_test = pd.concat([pas_100_days, data_test], ignore_index=True)
        data_test_scale = scaler.fit_transform(data_test)
        x = []
        y = []
        for i in range(100, data_test_scale.shape[0]):
            x.append(data_test_scale[i-100:i])
            y.append(data_test_scale[i,0])
        x,y = np.array(x), np.array(y)
        predict = model.predict(x)
        scale = 1/scaler.scale_
        predict = predict * scale
        y = y * scale
        # fig4 = plt.figure(figsize=(8,6))
        # plt.plot(predict, 'r', label='Original Price')
        # plt.plot(y, 'g', label = 'Predicted Price')
        # plt.xlabel('Time')
        # plt.ylabel('Price')
        # plt.show()
        t = data['Close'][data.shape[0]-1]
        t2 = t/predict[predict.shape[0]-2]
        fin = predict[predict.shape[0]-1] * t2
        # print(fin[0])
        if(fin[0] > t):
            # print("Buy the stock")
            return "Buy the stock"
        else:
            # print("Dont buy the stock")
            return "Dont buy the stock"
    except:
        return False
    
def update_database(user:UserData,ctx:Context):
    try:
        response = requests.get(server_address+"/sent_success/"+user.identifier)
        if response.status_code == 200:
            followed = response.json()
            return True
        return False   
    except:
        ctx.logger("Getting Data from storage Failed")
        return None

def notify_if_required(user: UserData,ctx: Context):
    if user.next_notify >= time.time():
        send_message = ""
        if user.company:
            for company in user.company:
                notification_message = getStockPrice(company.companyCode)
                if notification_message:
                    message = f"\n Company Name: {company.companyName}  {notification_message}"
                send_message += message
        
        send_email("Daily Stocker Alert",user.identifier,message_body=send_message,ctx=Context)
        update_database(user,ctx)
        ctx.logger(f"Mail sent successfully for {user.identifier}")
        return True
    else:
        pass


if __name__ == '__main__':
    bureau = Bureau()
    bureau.add(stocker)
    bureau.add(user)
    bureau.run()

else:
    bureau = Bureau()
    bureau.add(stocker)
    bureau.run()