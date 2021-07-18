import React from 'react';
import { Typography } from '@material-ui/core';

import ExtentedCoinData from '../../../Types/ExtentedCoinData';

const moreInfoHeaders: Map<String, String> = new Map([
    ['averageSentiment', 'Average Sentiment'],
    ['tweets', 'Tweets'],
    ['open', 'Open'],
    ['close', 'Close'],
    ['high', 'High'],
    ['low', 'Low'],
    ['marketCap', 'Market Cap'],
    ['galaxyScore', 'Galaxy Score'],
    ['altRank', 'Alt Rank']
]);

const CurrencyMoreInfo: React.FC<Props> = (props: Props) => {
    const { coinData } = props;

    return (
        <div>
            {
                coinData &&
                    Object.entries(coinData).map((coinExtraData) => {
                        return <Typography>{moreInfoHeaders.get(coinExtraData[0]) + ': ' + coinExtraData[1]}</Typography>
                    })
            }
        </div>
    );
}

interface Props {
    coinData: ExtentedCoinData | undefined;
}

export default CurrencyMoreInfo;