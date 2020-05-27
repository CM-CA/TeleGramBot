import cbpro
from twisted.internet import task
from twisted.internet import reactor


timeout = 60.0  # seconds


def executeCron():

    public_client = cbpro.PublicClient()
    # We get the value of our coin
    product = public_client.get_product_ticker("KNC-USD")
    # value in €
    coin_value = round((float(product["price"]) * 0.92), 5)
    # set min value
    min_value = 0.50
    # check if the actual value is less
    if coin_value > min_value:
        pass
    else:
        print("El valor de Kyber está bajando!!")

    pass


l = task.LoopingCall(executeCron)
l.start(timeout)

reactor.run()
