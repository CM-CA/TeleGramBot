import cbpro
from time import strftime


class CoinsMarketValue():

    def __init__(self, coin):
        self.coin = coin

    def get_coin_value(self):
        public_client = cbpro.PublicClient()
        product = public_client.get_product_ticker(self.coin)
        coinValue = round((float(product["price"]) * 0.92), 5)
        time = strftime("%H:%M:%S")
        printValue = print(coinValue, time, sep=' € a las ')
        return printValue


kncUsd = CoinsMarketValue("KNC-USD")
kncUsd.get_coin_value()
