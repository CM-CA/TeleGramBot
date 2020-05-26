import cbpro

public_client = cbpro.PublicClient()


def get_price():
    product = public_client.get_product_ticker("KNC-USD")
    print((float(product["price"]) * 0.92), "€")


print(get_price())
