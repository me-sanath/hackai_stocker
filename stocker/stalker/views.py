from django.shortcuts import render
from rest_framework.views import APIView
from getStockPrice import getStockPrice
from django.http import HttpResponse, JsonResponse

# Create your views here.


class getStock(APIView):
    def get(self,request):
        stock_symbol = request.GET.get('stock_symbol')
        response = getStockPrice(stock_symbol)
        message = {
            'message':response
        }
        print(message)
        return JsonResponse(message)