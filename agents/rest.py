
import requests


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

api_url = {
    "searchCode": "http://www.alphavantage.co/query",
    "companyData":"https://www.alphavantage.co/query?function=OVERVIEW&symbol=AAPL&apikey=2A33Y7074BNT5VM3"
}

def get_symbols(keywords):
    function = "SYMBOL_SEARCH"
    # Make the API request
    response = requests.get(api_url["searchCode"], params={
        "function": function,
        "keywords": keywords,
        "apikey": apikey
    }, proxies=proxies)

    if response.status_code == 200:
        data = response.json()
        print(data)
        return data.get("bestMatches")[0]
    else:
        print(f"Error: {response.status_code}")
        return None
    
def get_company_meta(company_code):
    try:
        response = requests.get(api_url["companyData"],  proxies=proxies)
        if response.status_code == 200:
            if "rate limit" in response.status_code:
                return 400, None
            meta = {
                "company_name":,
                "currency":,
                "country":,
                "sector":,
                "market_cap":,
                "peg_ratio":,
                "pe_ratio":,
                "pb_ratio":,
                "div_yield":,
                "year_high":,
                "year_low":,
                "day_moving_average_fifty":,
                "day_moving_average_fifty":,
            }
            return 200, meta
    except:
        return 500,None

proxies = get_proxy(0)
apikey = "14IPD07A3222NYS1"
function = "SYMBOL_SEARCH"
# params={
#         "function": function,
#         "keywords": "reliance",
#         "apikey": apikey
#     }
response = requests.get(api_url["companyData"],  proxies=proxies)

if response.status_code == 200:
    print(response.text)  # Print the response content
else:
    print("Request failed with status code:", response.status_code)
