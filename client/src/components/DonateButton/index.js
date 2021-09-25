import React, { useState, useEffect } from 'react';
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
      {/* donate button */}
      <form style={{ marginTop: '20px' }} action="https://www.paypal.com/donate" method="post" target="_blank">
        <input type="hidden" name="hosted_button_id" value="65G9KZUKC95RW" />
        <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
        <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
      </form>
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