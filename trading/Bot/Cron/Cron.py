from timeloop import Timeloop
from datetime import timedelta
from Bot.Bot import Bot
from Bot.Mercado import Operaciones_Mercado as Mercado

tl = Timeloop()


@tl.job(interval=timedelta(seconds=2))
def obtener_valor_modena_cada_2seg():
    b = Bot("KNC-USD").devolver_nombre_moneda()
    m = Mercado.Mercado(b)
    valor = m.precio_actual_moneda()
    return valor


@tl.job(interval=timedelta(seconds=20))
def alerta_bajada_precio():
    valor_moneda = obtener_valor_modena_cada_2seg()
    valor_fijado = 0.65
    if valor_moneda <= valor_fijado:
        return print("El precio esta bajando")
    elif valor_moneda >= valor_fijado:
        return print("El precio esta aumentando")


if __name__ == "__main__":
    tl.start(block=True)
    obtener_valor_modena_cada_2seg()
    alerta_bajada_precio()
