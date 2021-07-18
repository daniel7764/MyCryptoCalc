import React, { useState, useRef, useCallback } from 'react';
import { Table, TableBody, TableContainer, Paper, Typography } from '@material-ui/core';

import useExchangeTable from './useExchangeTable';
import useStyles from './ExchangeTableStyles';
import CurrencyRow from './CurrencyRow/CurrencyRow';
import CurrencyHeader from './CurrencyHeader/CurrencyHeader';

const ExchangeTable: React.FC = () => {
    const observer = useRef<IntersectionObserver>();
    const classes = useStyles();
    const [page, setPage] = useState<number>(0);
    const { hasMore, isLoading, currencies, coinProperties } = useExchangeTable({ page });

    const lastCoinElementRef = useCallback((node) => {
        if(isLoading) return;
        observer.current &&
            observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        })
        node &&
            observer.current.observe(node);
    }, [isLoading, hasMore]);

    return (
        <div className={classes.tableContainer}>
            <TableContainer component={Paper} className={classes.allCoinsTable}>
                <Table>
                    <CurrencyHeader coinProperties={coinProperties}/>
                    <TableBody>
                        {
                            currencies.map((coin, index) => {
                                return currencies.length === index + 1 ? 
                                    <CurrencyRow currCoin={coin} key={coin.id} forwardedRef={lastCoinElementRef}/> :
                                    <CurrencyRow currCoin={coin} key={coin.id}/>
                            })
                        }
                    </TableBody>
                </Table>
                {
                    isLoading &&
                        <Typography>Loading</Typography>
                }
            </TableContainer>
        </div>
    );
}

export default ExchangeTable;