import React from 'react';
import { TableCell, TableHead, TableRow } from '@material-ui/core';

const tableHeaders: Map<String, String> = new Map([
    ['symbol', 'Symbol'],
    ['name', 'Name'],
    ['usdPrice', 'USD Price'],
    ['btcPrice', 'BTC Price'] ,
    ['usdVolume', 'USD Volume']
]);

const tableHeadersMoreInfo: Map<String, String> = new Map([
    ['symbol',  'Ofiical Symbol of the currency'],
    ['name', 'Name of the currency'],
    ['usdPrice', 'The equal price of the currency in US Dollars'],
    ['btcPrice', 'The equal price of the currency in BitCoin'],
    ['usdVolume', 'The volume of ALL the existing coins in US Dollars'],
    ['averageSentiment', 'Average Sentiment - using a scoring system from 1 to 5 with 1 being very bearish and 5 being very bullish we provide the average over all coins'],
    ['newsArticles', 'Number of news articles written about the coin'],
    ['numberOfTweets', 'Number of tweets made about the coin'],
    ['redditActivity', 'Number of Reddit posts made about the coin'],
]);

const CurrencyHeader: React.FC<Props> = (props: Props) => {
    const { coinProperties } = props;

    return (
        <TableHead>
            <TableRow>
            <TableCell />
            {
                coinProperties.map((prop) => {
                    return (
                        <TableCell>
                            {tableHeaders.get(prop)}
                        </TableCell>
                    )})
            }
            </TableRow>
        </TableHead>
    );
}

interface Props {
    coinProperties: String[]
}

export default CurrencyHeader;