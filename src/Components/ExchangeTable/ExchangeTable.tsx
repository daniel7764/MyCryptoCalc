import React, { useState, useEffect } from 'react';

import Currency from '../../Types/Currency';
import CurrencyRow from './CurrencyRow/CurrencyRow';
import useExchangeTable from './useExchangeTable';

const ExchangeTable: React.FC = () => {
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const { getCurrenciesData } = useExchangeTable({currencies, setCurrencies});

    useEffect(() => getCurrenciesData(), []);

    return (
        <table>
            {
                currencies.map((currency: Currency) => <CurrencyRow currCoin={currency}/>)
            }
        </table>
    );
}

export default ExchangeTable;