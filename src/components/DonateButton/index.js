import React from 'react';

const DonateButton = () => {
	return (
		<div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
			{/* donate button */}
			<form style={{ marginTop: '20px' }} action="https://www.paypal.com/donate" method="post" target="_blank">
				<input type="hidden" name="hosted_button_id" value="65G9KZUKC95RW" />
				<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
				<img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
			</form>
		</div>
	);
};

export default DonateButton;