import numpy as np
import pandas as pd
import yfinance as yf
from keras.models import load_model
import matplotlib.pyplot as plt
import sys
from datetime import date, timedelta




def getStockPrice(stock_symbol):
    model = load_model('HackAI_Model.keras')

    today = date.today()
    # yesterday = today - timedelta(days=1)

    stock = stock_symbol
    start = '2012-01-01'
    end = today

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
            return "Good time to buy this stock"
        
        else:
            # print("Dont buy the stock")
            return "Not a good time to buy this stock"


    except:
        # print("No Stock Found")
        return "No Stock Found"


# print(getStockPrice('HFCL.NS'))