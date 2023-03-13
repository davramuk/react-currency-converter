import * as React from 'react';
import { useState, useEffect }  from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Header() {

  const [usd, setUsd] = useState(0);
  const [eur, setEur] = useState(0);

  let myHeaders = new Headers();
  myHeaders.append("apikey", "wyf7b9L6j5jfdXJwbzyoLicKITv4xSvZ");
  
  useEffect(() => {
    const requestoptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders
    };
    
    //USD TO UAH
    fetch(
      'https://api.apilayer.com/exchangerates_data/latest?base=USD&symbols=UAH', requestoptions
    )
    .then((response) => response.json())
    .then((result) => setUsd(result.rates.UAH))
    .catch((error) => console.log(error));
    
    //EUR TO UAH
    fetch(
      'https://api.apilayer.com/exchangerates_data/latest?base=EUR&symbols=UAH', requestoptions
    )
    .then((response) => response.json())
    .then((result) => setEur(result.rates.UAH))
    .catch((error) => console.log(error));
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor: "#37306B"}}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, textAlign: "left", marginLeft: "50px"}}>
            Currency Converter
          </Typography>
          <Typography  sx={{ textAlign: "right", marginRight: "30px" }}>
            <b>USD:</b> {usd}  
          </Typography>
          <Typography sx={{ marginRight: "50px" }}>
           <b>EUR:</b> {eur} 
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

