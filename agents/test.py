import requests




PROXY_USERNAME = "upwalarz"
PROXY_PASSWORD = "dtf7a0idytuq"
ip = "185.199.229.156"
port = "7492"

proxy = {
    "https": f"http://{PROXY_USERNAME}:{PROXY_PASSWORD}@{ip}:{port}",
    "http": f"http://{PROXY_USERNAME}:{PROXY_PASSWORD}@{ip}:{port}",
}
api_url = {
    "searchCode": "https://www.alphavantage.co/query",
}
apikey = "14IPD07A3222NYS1"


def get_reliance_symbols(keywords):
    function = "SYMBOL_SEARCH"
    # Make the API request
    response = requests.get(api_url["searchCode"], params={
        "function": function,
        "keywords": keywords,
        "apikey": apikey
    }, proxies=proxy)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        # Parse the JSON response
        data = response.json()
        print(data)
        return data.get("bestMatches")[0]

    else:
        # Print an error message if the request was not successful
        print(f"Error: {response.status_code}")
        return None

# # Call the function and print the results
# indian_symbols = get_reliance_symbols("reliance")
# print (indian_symbols)

print(requests.get("https://www.google.com",proxies=proxy))