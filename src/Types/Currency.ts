interface Currency {
    assetId: string,
    name: string,
    isCrypto: boolean,
    startTradeDate: Date,
    endTradeDate: Date,
    tradeCount: number,
    priceInUSD: number,
}

export default Currency;