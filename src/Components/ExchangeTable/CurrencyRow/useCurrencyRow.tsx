import axios from 'axios';
import { useState, useEffect } from 'react';

import ExtentedCoinData from '../../../Types/ExtentedCoinData';
import { OK_STATUS, apiKey, coinApiUrl } from '../useExchangeTable';

const assetsData: string = 'assets';
const dataPoints: number = 0;

const useCurrencyMoreInfo = (currencyRowInput: useCurrencyMoreInfoInput): useCurrencyMoreInfoOutput => {
    const { symbol, open } = currencyRowInput;
    const [ moreCoinData, setMoreCoinData] = useState<ExtentedCoinData>();

    useEffect(() => {
        open && getSpecificCoinData();
    }, [open])

    const getSpecificCoinData = async () => {
        const response = await axios.get(coinApiUrl + '/assets', {
            params: {
                key: apiKey,
                symbol: symbol,
                data: assetsData,
                data_points: dataPoints,
            }}
        );
        if(response.status !== OK_STATUS || !response.data.data[0]) {
        } else {
            setMoreCoinData(mapExtraData(response.data.data[0]));
        }
    }

    const mapExtraData = (data: any): ExtentedCoinData => {
        return {
            altRank: data.alt_rank,
            averageSentiment: data.average_sentiment,
            galaxyScore: data.galaxy_score,
            high: data.high,
            low: data.low,
            close: data.close,
            open: data.open,
            marketCap: data.market_dominance,
            tweets: data.tweets,
        }
    }

    return { moreCoinData };

}

interface useCurrencyMoreInfoInput {
    symbol: string,
    open: boolean
}

interface useCurrencyMoreInfoOutput {
    moreCoinData: ExtentedCoinData | undefined,
}

export default useCurrencyMoreInfo;