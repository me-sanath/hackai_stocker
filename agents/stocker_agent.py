import smtplib
import requests
from uagents import Agent, Model, Context, Bureau
import os
from dotenv import load_dotenv

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
    message: str

# Create a data model for temperature data
class TemperatureData(Model):
    temperature: float

# Define a data model for user data
class UserData(Model):
    email: str
    next_notify: float

# Cache Data
user_cache = []

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
    ctx.logger.info(f"Received message from {sender}: {msg.message}")

# User handlers
@user.on_interval(period=3.0)
async def send_message(ctx: Context):
    # ctx.send is a function that sends a message to the specified agent address
    await ctx.send('agent1qv0p5fru7v5pc2hymcfvnt389w9nc8aq3wn9ysl2ym8rn7vshnlx6kj5gs4', Request(message="hello there bob"))
    ctx.logger.info(f"Message has been sent to Bob")

# Notifier handlers
@notifier.on_interval(period=10.0)
async def alert_user(ctx: Context):
    pass

# -x-x-x-x-x-x-x-Support Functions-x-x-x-x-x-x-x-x-x-x-x

async def send_email(subject, receiver, message_body):
    # Constructs the email message
    sender = "stalker@stocker.com"
    message = f"""\
Subject: {subject}
To: {receiver}
From: {sender}

{message_body}
"""
    with smtplib.SMTP("sandbox.smtp.mailtrap.io", 2525) as server:
        server.login(sender_email, sender_password)
        server.sendmail(sender, receiver, message)

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
            return response.get("Time Series (Daily)")   
    except:
        return 500,None
    
def get_all_enabled_user_data(ctx:Context):
    try:
        response = requests.get(server_address+"/get_all_data/")
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




if __name__ == '__main__':
    bureau = Bureau()
    bureau.add(stocker)
    bureau.add(user)
    bureau.run()

else:
    bureau = Bureau()
    bureau.add(stocker)
    bureau.run()