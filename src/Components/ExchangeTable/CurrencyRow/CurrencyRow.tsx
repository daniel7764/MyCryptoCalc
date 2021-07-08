import React from 'react';
import {  } from 'bootstrap';

import Currency from '../../../Types/Currency';

const CurrencyRow: React.FC<Props> = (props: Props) => {
    const { assetId, name, isCrypto, priceInUSD, startTradeDate, endTradeDate, tradeCount} = props.currCoin;

    return (
        <tr>
            <td>{assetId}</td>
            <td>{name}</td>
            <td>{isCrypto ? "Crypto" : "Regular"}</td>
            <td>{priceInUSD ? priceInUSD : 'X'}</td>
            <td>{startTradeDate ? startTradeDate.toLocaleDateString() : 'X'}</td>
            <td>{endTradeDate ? endTradeDate.toLocaleDateString() : 'X'}</td>
            <td>{tradeCount ? tradeCount : 'X'}</td>
        </tr>
    );
}

interface Props {
    currCoin: Currency;
}

export default CurrencyRow;