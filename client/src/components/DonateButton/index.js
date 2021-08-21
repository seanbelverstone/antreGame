import React, { useState } from 'react';
import { PayPalButton } from "react-paypal-button-v2";
import DefaultPopup from "../../components/DefaultPopup";

const DonateButton = (props) => {
  const [amount, setAmount] = useState('');
  const [snackbarDisplay, setSnackbarDisplay] = useState(false);
  const [message, setMessage] = useState('');
  return (
    <>
      {process.env.NODE_ENV === "production" && (
        <PayPalButton
          amount="0.01"
          shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
          style={{
            layout: 'horizontal'
          }}
          disableFunding={['venmo']}
          onSuccess={(details, data) => {
            setSnackbarDisplay(true)
            setMessage(`Transaction completed by ${details.payer.name.given_name}. Thank you for your support! :)`)
          }}
          options={{
            clientId: process.env.REACT_CLIENT_ID
          }}
        />
      )}
      {process.env.NODE_ENV === "development" && (
        <PayPalButton
          amount="0.01"
          shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
          style={{
            layout: 'horizontal'
          }}
          disableFunding={['venmo']}
          onSuccess={(details, data) => {
            setSnackbarDisplay(true)
            setMessage(`Transaction completed by ${details.payer.name.given_name}. Thank you for your support! :)`)
          }}

        />
      )}

      <DefaultPopup
        display={snackbarDisplay}
        message={message}
        setDisplay={setSnackbarDisplay}
        destination=""
      />
    </>
  );
};

export default DonateButton;