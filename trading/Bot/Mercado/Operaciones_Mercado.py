from time import strftime
from Bot.Bot import Bot
import cbpro


class Mercado(Bot):

    def __init__(self, nombre_moneda):
        super().__init__(nombre_moneda)

    def precio_actual_moneda(self):
        cliente = cbpro.PublicClient()
        producto = cliente.get_product_ticker(self.nombre_moneda)
        valor_moneda_euro = round((float(producto["price"]) * 0.92), 5)
        return valor_moneda_euro

    def enviar_mensaje_valor_moneda(self):
        public_client = cbpro.PublicClient()
        product = public_client.get_product_ticker(self.nombre_moneda)
        coinvalue = round((float(product["price"]) * 0.92), 5)
        time = strftime("%H:%M:%S")
        return print(coinvalue, time, sep=' € a las ')


b = Bot("KNC-USD").devolver_nombre_moneda()
m = Mercado(b)
valor = m.precio_actual_moneda()
print(valor)
