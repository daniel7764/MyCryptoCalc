import axios from 'axios';
import { useState, useEffect} from 'react';

import Currency from '../../Types/Currency'

export const OK_STATUS = 200;
const pageLimit: number = 20;
const marketData: string = 'market';
export const apiKey: string = 'yeqvteinmrrs9llr77a7a';
export const coinApiUrl: string = 'https://api.lunarcrush.com/v2';

const useExchangeTable = (ExchangeTableInput: useExchangeTableInput): useExchangeTableOutput => {
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [coinProperties, setCoinProperties] = useState<String[]>([]);
    const { page } = ExchangeTableInput;

    const getCurrenciesData = async () => {
        setIsLoading(true);
        const response = await axios.get(coinApiUrl + '/assets', {
            params: {
                key: apiKey,
                data: marketData,
                limit: pageLimit,
                page: page
            }}
        );
        if(response.status !== OK_STATUS || !response.data.data) {
        } else {
            const allCurrenciesMapped: Currency[] = mapCoinsToArray(response.data.data);
            coinProperties.length === 0 &&
                setCoinProperties(Object.getOwnPropertyNames(allCurrenciesMapped[0]));
            setCurrencies([...currencies, ...allCurrenciesMapped]);
            setHasMore(response.data.data.length > 0);
            setIsLoading(false);
        }
    }

    const mapCoinsToArray = (data: any) => {
        return data.map((currCoin: any) => {
            return {
                id: currCoin.id,
                symbol: currCoin.s,
                name: currCoin.n,
                usdPrice: currCoin.p,
                btcPrice: currCoin.p_btc,
                usdVolume: currCoin.v
            }
        });
    }

    useEffect(() => { getCurrenciesData() }, [page]);

    return { hasMore, isLoading, currencies, coinProperties };
}

interface useExchangeTableInput {
    page: number
}

interface useExchangeTableOutput {
    hasMore: boolean,
    isLoading: boolean,
    currencies: Currency[],
    coinProperties: String[],
}

export default useExchangeTable;