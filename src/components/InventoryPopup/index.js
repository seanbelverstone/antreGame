import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Alert } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { camelToTitle } from '../../utils/functions';

const InventoryPopup = (props) => {
	const {
		display,
		setDisplay,
		items
	} = props;
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		if (!display) {
			setMessages([]);
		}
	}, [display]);

	useEffect(() => {
		checkItems();
	}, [items]);

	const addIfUnique = (note) => {
		if (messages.indexOf(note) === -1) {
			messages.push(note);
		} else {
			return;
		}

		setTimeout(() => {
			setMessages([]);
			setDisplay(false);
		}, 6000);
	};

	const checkItems = () => {
		if (items !== []) {
			let note;
			items.forEach((item) => {
				const itemName = Object.keys(item);
				const quantity = Object.values(item)[0];
				const armorPiece = Object.values(item)[0];
				if (item.none || item.fight || item.luckCheck || item.torchCheck || item.end || item.death) {
					// if no modifier is present, just return.
					setDisplay(false);
					return;
				} else if (item.head || item.chest || item.hands || item.legs || item.feet) {
					note = `You equipped the ${armorPiece}.\n `;
					return addIfUnique(note);
				} else if (item.torch === 0) {
					note = 'You lost your torch.';
					return addIfUnique(note);
				} else if (Math.sign(item.health) === 1) {
					note = `You restored ${item.health} health.\n `;
					return addIfUnique(note);
				} else if (quantity >= 1) {
					// if the modifier returns as positive, user gains an item
					note = `You gained ${quantity} ${camelToTitle(itemName[0])}.\n `;
					if (itemName[0] === 'healthPotions' && quantity > 1) {
						note = `You gained ${quantity} Health Potions.\n `;
					}
					return addIfUnique(note);
				} else if (item.weapon && Object.values(item.weapon)[1] > 1) {
					// if the weapon has more than 1 damage (not no weapon)
					note = `You gained the ${item.weapon.name}, which does ${item.weapon.dmg} damage.\n `;
					return addIfUnique(note);
				} else if (Math.sign(quantity) === -1) {
					// if the modifier is negative, set the note to say you lost an item
					note = `You lost ${quantity} ${itemName}.\n `;
					return addIfUnique(note);
				} else if (Object.values(item.weapon)[1] <= 1) {
					note = 'You lost your weapon. Your damage has been reduced to 1.\n ';
					return addIfUnique(note);
				} else {
					// if the item is neither negative nor positive (0), just say that they lost the item. This relates to things like the torch
					note = `You lost your ${armorPiece}.\n `;
					return addIfUnique(note);
				}
			});
		}
	};

	const handleClose = () => {
		setMessages([]);
		setDisplay(false);
	};

	return (
		<div id="inventoryPopup" style={{

		}}>
			<Collapse
				in={display}>
				<Alert
					severity="info"
					variant="filled"
					action={
						<IconButton
							aria-label="close"
							color="inherit"
							size="small"
							onClick={() => {
								handleClose(false);
							}}
						>
							<CloseIcon fontSize="inherit" />
						</IconButton>
					}
					sx={{ mb: 2 }}
				>
					{messages}
				</Alert>
			</Collapse>
		</div>
	);
};

InventoryPopup.propTypes = {
	display: PropTypes.bool,
	setDisplay: PropTypes.func,
	items: PropTypes.oneOfType([PropTypes.array])
};

InventoryPopup.defaultProps = {
	display: false,
	setDisplay: () => {},
	items: []
};

export default InventoryPopup;