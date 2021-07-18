import React, { useState } from 'react';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons'
import { Collapse, IconButton, TableCell, TableRow } from '@material-ui/core';

import useStyles from './CurrencyRowStyles'
import useCurrencyRow from './useCurrencyRow';
import Currency from '../../../Types/Currency';
import CurrencyMoreInfo from '../CurrencyMoreInfo/CurrencyMoreInfo';

const CurrencyRow: React.FC<Props> = (props: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const { symbol } = props.currCoin;
    const { moreCoinData } = useCurrencyRow({symbol, open});
    const classes = useStyles();

    return (
        <>
            <TableRow ref={props.forwardedRef}>
                <TableCell>
                    <IconButton size='small' onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                {
                    Object.values(props.currCoin).map((coinProp: string) => {
                        return <TableCell>{coinProp}</TableCell>
                    })
                }
            </TableRow>
            <TableRow>
                <TableCell className={classes.moreInfo} colSpan={7}>
                    <Collapse in={open}>
                        <CurrencyMoreInfo coinData={moreCoinData} />
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

interface Props {
    currCoin: Currency;
    forwardedRef?: any,
}

export default CurrencyRow;