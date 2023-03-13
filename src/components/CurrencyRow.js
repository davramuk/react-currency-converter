import React from 'react'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import './Converter.css';

export default function CurrencyRow({
  currencyOption,
  selectCurrency,
  onChangeCurrency,
  onChangeAmount,
  amount,
  defaultCurrency,
  currencyLabel, 
}) {

  console.log(currencyOption)

  return (
    <div className="currencyRow">
      <div className="inputContainer">
        <TextField label="Amount" type="number" value={amount || ''} onChange={onChangeAmount} sx={{
            width: "300px",
            marginRight: "10px"
        }} />
        <FormControl sx={{ minWidth: "100px" }}>
          <InputLabel id="currency-label">{currencyLabel}</InputLabel>
          <Select labelId="from-currency-label" label="From Currency" value={selectCurrency || defaultCurrency} onChange={onChangeCurrency}>
            {currencyOption?.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
