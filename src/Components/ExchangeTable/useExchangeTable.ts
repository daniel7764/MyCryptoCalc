import axios from 'axios';
import React from 'react';

import Currency from '../../Types/Currency'

const OK_STATUS = 200;
const coinApiUrl: string = 'https://rest.coinapi.io/v1';
const apiKey: string = 'E36D9A48-19BA-485B-9784-695B29C409EC';

const useExchangeTable = (ExchangeTableInput: useExchangeTableInput): useExchangeTableOutput => {
    const { currencies, setCurrencies } = ExchangeTableInput;

    const getCurrenciesData = async () => {
        const data = await axios.get(coinApiUrl + '/assets', {
            headers: {
                'X-CoinAPI-Key': apiKey
            }}
        );
        if(data.status !== OK_STATUS || !data.data) {

        } else {
            const allCurrenciesMapped: Currency[] = data.data.map((currCoin: any) => {
                return {
                    assetId: currCoin.asset_id,
                    name: currCoin.name,
                    isCrypto: Boolean(currCoin.type_is_crypto),
                    startTradeDate: currCoin.data_trade_start,
                    endTradeDate: currCoin.data_trade_end,
                    tradeCount: currCoin.data_trade_count,
                    priceInUSD: currCoin.price_usd,
                }
            });
            console.log(allCurrenciesMapped);
            setCurrencies(allCurrenciesMapped);
        }
    }

    return { getCurrenciesData };
}

interface useExchangeTableInput {
    currencies: Currency[],
    setCurrencies: React.Dispatch<React.SetStateAction<Currency[]>>,
}

interface useExchangeTableOutput {
    getCurrenciesData: () => void;
}

export default useExchangeTable;