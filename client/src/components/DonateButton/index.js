import React, { useState, useEffect } from 'react';
import { PayPalButton } from "react-paypal-button-v2";
import { TextField } from "@material-ui/core";
import InputAdornment from '@material-ui/core/InputAdornment';
import DefaultPopup from "../../components/DefaultPopup";

const DonateButton = (props) => {
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState(false);
  const [amountHelperText, setAmountHelperText] = useState('');
  const [snackbarDisplay, setSnackbarDisplay] = useState(false);
  const [message, setMessage] = useState('');
  const pattern = new RegExp(/^[0-9]*$/g)

  useEffect(() => {
    if (pattern.test(amount)) {
      setAmountError(false);
      setAmountHelperText('');
    } else {
      setAmount("10.00");
      setAmountError(true);
      setAmountHelperText('Please make sure to only use numbers.');
    }
  }, [amount]);
  return (
    <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
      <TextField
        id="amountInput"
        label="Donation amount"
        variant="outlined"
        error={amountError}
        helperText={amountHelperText}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        onChange={event => setAmount(event.target.value)}
        style={{ width: "30%", alignSelf: "center", margin: "20px" }}
      />
      {process.env.NODE_ENV === "production" && (
        <PayPalButton
          amount={amount || 10.00}
          shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
          style={{
            layout: 'horizontal'
          }}
          disableFunding={['venmo']}
          onSuccess={(details, data) => {
            setSnackbarDisplay(true)
            setMessage(`Donation made by ${details.payer.name.given_name}. Thank you for your support! :)`)
          }}
          options={{
            clientId: process.env.REACT_APP_CLIENT_ID
          }}
        />
      )}
      {process.env.NODE_ENV === "development" && (
        <PayPalButton
          amount={amount || 10.00}
          shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
          style={{
            layout: 'horizontal'
          }}
          disableFunding={['venmo']}
          onSuccess={(details, data) => {
            setSnackbarDisplay(true)
            setMessage(`Donation made by ${details.payer.name.given_name}. Thank you for your support! :)`)
          }}

        />
      )}

      <DefaultPopup
        display={snackbarDisplay}
        message={message}
        setDisplay={setSnackbarDisplay}
        destination=""
      />
    </div>
  );
};

export default DonateButton;