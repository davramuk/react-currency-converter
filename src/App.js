import { useEffect, useState } from 'react';
import { Box, Typography }  from "@mui/material";
import Header from './components/Header.js';
import CurrencyRow from './components/CurrencyRow.js';
import './components/Converter.css';

function App() {

  const [currencyOption, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = (amount * exchangeRate).toFixed(3);
  } else {
    toAmount = amount;
    fromAmount = (amount / exchangeRate).toFixed(3);
  }

  let myHeaders = new Headers();
  myHeaders.append("apikey", "wyf7b9L6j5jfdXJwbzyoLicKITv4xSvZ");

  const requestoptions = {  
    method: "GET",
    redirect: "follow",
    headers: myHeaders
  };

  useEffect(() => {
    fetch("https://api.apilayer.com/fixer/latest", requestoptions)
    .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[0];
        let currencies = Object.keys(data.rates);
        setCurrencyOptions(currencies.filter(currency => ['USD', 'EUR', 'UAH'].includes(currency)), [currencyOption]);
        setFromCurrency(data.base);
        setToCurrency();
        setExchangeRate(data.rates[firstCurrency]);
        console.log(currencyOption)
      })
      .catch(error => console.log(error));
  }, []);

  const handleFromAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  const handleToAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }
  
  useEffect(() => {
    if (fromCurrency !== undefined && toCurrency !== undefined) {
      fetch(`https://api.apilayer.com/fixer/latest?symbols=${toCurrency}&base=${fromCurrency}`, requestoptions)
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  return (
    <>
    <Header />
      <Box className="wrapper" sx={{ 
        display: "flex",
        height: "400px", 
        width: "700px", 
        mx: "auto",
        boxShadow: 8 
      }}>
        <div className="container">
          <Typography variant="h3" sx={{ mb: "40px" }}>
            Convert Currency
          </Typography>
          <CurrencyRow 
          currencyOption={currencyOption}
          selectCurrency={fromCurrency}
          onChangeCurrency={(e) => setFromCurrency(e.target.value)}
          onChangeAmount={handleFromAmountChange}
          amount={fromAmount}
          defaultCurrency="UAH"
          currencyLabel="From"
          />
          <CurrencyRow 
          currencyOption={currencyOption}
          selectCurrency={toCurrency}
          onChangeCurrency={(e) => setToCurrency(e.target.value)}
          onChangeAmount={handleToAmountChange}
          amount={toAmount}
          defaultCurrency="USD"
          currencyLabel="To"
          />
        </div>
      </Box>
      </>
  );
}

export default App;
