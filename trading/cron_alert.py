import cbpro
from .trading import CoinsMarketValue
from twisted.internet import task
from twisted.internet import reactor


class CronMarketValue():

    def __init__(self, time, min_value):

        self.time = time
        self.min_value = min_value

    def set_minimun_value(self):
        min_value = self.min_value
        return min_value

    def alert():
        coin_value = CoinsMarketValue.get_coin_value()
        min_value = CronMarketValue.set_minimun_value()

        if coin_value < min_value:
            return "El precio esta bajando"
        else:
            pass

    def run_cron(self):
        cron = task.LoopingCall(CronMarketValue.alert)
        cron.start(self.time)
        reactor.run()


cron_start = CronMarketValue()
cron_start.get_coin_value()

cron_start.run_cron()
