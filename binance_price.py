import sys
from binance.um_futures import UMFutures

um_futures_client = UMFutures()


def markPrice(coin: str):
    return um_futures_client.mark_price(coin)["markPrice"]


def addStrTail(coin: str):
    return coin + 'usdt'


def disp(coins):
    disp_string = ''
    for coin in coins:
        try:
            mark_price = markPrice(addStrTail(coin))
            disp_string += coin + '[' + mark_price + '] '
        except:
            pass
    return disp_string


coins = sys.argv[1:]
print(disp(coins))
