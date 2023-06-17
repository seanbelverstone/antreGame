import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Backdrop, IconButton, Modal } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { camelToTitle, snakeToTitle } from '../../utils/functions';
import './style.css';
import { fire } from '../Confetti';

const SuccessScreen = (props) => {
	const {
		display,
		setDisplay,
		items,
		enemyName
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

	const addIfUnique = (note) => (messages.indexOf(note) === -1 && messages.push(note));

	const checkItems = () => {
		if (items !== []) {
			let note;
			items.forEach((item) => {
				const itemName = Object.keys(item);
				const [quantity] = Object.values(item);
				const [armorPiece] = Object.values(item);
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

	const setColor = (message) => {
		const messageArray = message.split(' ');
		// eslint-disable-next-line prefer-destructuring
		const item = messageArray[messageArray.length -2].toLowerCase().split('.\n')[0];
		console.log('running');
		if (messageArray[1] === 'equipped') return { color: 'var(--primary' };
		return { color: `var(--${item})` };
	};

	return (
		<div style={{ display: 'flex' }}>
			<Collapse
				in={display}>
				<Modal
					aria-labelledby="transition-modal-title"
					aria-describedby="transition-modal-description"
					open={display && messages.length > 0}
					onClose={handleClose}
					closeAfterTransition
					BackdropComponent={Backdrop}
				>
					<div id="successScreen">
						<div id="successScreenTitle">
							<IconButton onClick={handleClose}>
								<CloseIcon />
							</IconButton>
						</div>
						{fire()}
						{enemyName ? (<h1>You defeated {snakeToTitle(enemyName) || 'enemyName'}!</h1>)
							: (<h2>Player Update:</h2>)}
						<div>
							{messages.map((message, index) => {
								return (<p style={setColor(message)} key={index}>{message}</p>);
							}
							)}
						</div>
					</div>
				</Modal>
			</Collapse>
		</div>
	);
};

SuccessScreen.propTypes = {
	display: PropTypes.bool,
	setDisplay: PropTypes.func,
	items: PropTypes.oneOfType([PropTypes.array]),
	enemyName: PropTypes.string,
	setEnemyName: PropTypes.func
};

SuccessScreen.defaultProps = {
	display: false,
	setDisplay: () => {},
	items: [],
	enemyName: '',
	setEnemyName: () => {}
};

export default SuccessScreen;