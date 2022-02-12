import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actionCreators from '../../redux/actions/actionCreators';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import invImages from '../../assets/images/invIcons';
import Info from '../Info';
import './style.css';

const mapStateToProps = (state) => {
	return {
		inventory: state.updateCharacter.inventory,
		stats: state.updateCharacter.stats
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(actionCreators, dispatch);
};

const BoundInventory = (props) => {
	const { 
		inventory, 
		stats,
		health,
		maxHealth,
		userHealthWidth
	} = props;
	const { name, race, charClass, strength, defense, wisdom, luck } = stats;
	const { weapon, weaponDamage, head, chest, legs, hands, feet, torch, amulet, healthPotions, gold } = inventory;

	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const statInfo = {
		title: 'Stats',
		main: [
			{
				header: 'Strength',
				body: 'Strength determines how much power an attack has. Normal attacks do 1-6 multiplied by your weapon damage, added to double your strength value. With special attacks, your strength value and weapon damage is tripled.'
			},
			{
				header: 'Defense',
				body: 'The higher your defense value, the less damage recieved. All attacks are divided by the receiver\'s defense value. Critical hits bypass defense checks.'
			},
			{
				header: 'Wisdom',
				body: 'When you use a class specific skill, the amount of time you\'ll need to wait before using it again is calculated by your wisdom. The more wisdom you have, the less time between uses.'
			},
			{
				header: 'Luck',
				body: 'Every attack goes through a luck check. If your luck reaches a certain value, the attack will bypass a defense check dealing huge damage. Enemies also have the ability to critically hit.'
			}
		]
	};

	return (
		<div>
			<Button
				className="primaryButton"
				type="button"
				variant="contained"
				id="inventory"
				onClick={handleOpen}
			>
                Inventory
			</Button>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
				style={{ margin: '2% auto' }}
			>
				<Fade in={open}>
					<div id="inventoryModal">
						<h2 className="fullTitle">{name}, the {race} {charClass}.</h2>
						<section id="left">
							<section id="statsBlock">
								<div style={{ textAlign: 'center' }}>HP</div>
								<div className="healthArea" id="userHealthArea">
									<div className="healthText">
										{health}/{maxHealth}
									</div>
									<div id="userBar" style={{ width: `${userHealthWidth}%` }}></div>
								</div>
								<div className="topStat">
									<section id="strength">
										<div>Strength: {strength}</div>
									</section>
									<section id="defense">
										<div>Defense: {defense}</div>
									</section>
								</div>
								<div className="center">
									<Info infoProps={statInfo} />
								</div>
								<div className="bottomStat">
									<section id="wisdom">
										<div>Wisdom: {wisdom}</div>
									</section>
									<section id="luck">
										<div>Luck: {luck}</div>
									</section>
								</div>
							</section>
							<Divider />
							<section id="misc">
								<section id="topMisc">
									<div id="torch">
										<img className="icon" src={invImages.torch} />
										<div className="iconText">Torch: {torch}</div>
									</div>

									<div id="amulet">
										<img className="icon" src={invImages.amulet} />
										<div className="iconText">Amulet: {amulet}</div>
									</div>
								</section>
								<section id="bottomMisc">
									<div id="healthPotion">
										<img className="icon" src={invImages.healthPotion} />
										<div className="iconText">Health Potions: {healthPotions}</div>
									</div>

									<div id="gold">
										<img className="icon" src={invImages.gold} />
										<div className="iconText">Gold: {gold}</div>
									</div>
								</section>
							</section>
						</section>
						<Divider orientation="vertical" />
						<section id="right">
							<div id="weapon">
								<img className="equipmentIcon" src={invImages.sword} />
								<div className="invText">
									<div className="key">Weapon</div>
									<div>{weapon}</div>
									<div>{weaponDamage} dmg</div>
								</div>
							</div>
							<div id="head">
								<img className="equipmentIcon" src={invImages.head} />
								<div className="invText">
									<div className="key">Head</div>
									<div>{head}</div>
								</div>
							</div>
							<div id="chest">
								<img className="equipmentIcon" src={invImages.chest} />
								<div className="invText">
									<div className="key">Chest</div>
									<div>{chest}</div>
								</div>
							</div>
							<div id="hands">
								<img className="equipmentIcon" src={invImages.hands} />
								<div className="invText">
									<div className="key">Hands</div>
									<div>{hands}</div>
								</div>
							</div>
							<div id="legs">
								<img className="equipmentIcon" src={invImages.legs} />
								<div className="invText">
									<div className="key">Legs</div>
									<div>{legs}</div>
								</div>
							</div>
							<div id="feet">
								<img className="equipmentIcon" src={invImages.feet} />
								<div className="invText">
									<div className="key">Feet</div>
									<div>{feet}</div>
								</div>
							</div>
						</section>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};

BoundInventory.propTypes = {
	inventory: PropTypes.object,
	stats: PropTypes.object,
	health: PropTypes.number,
	maxHealth: PropTypes.number,
	userHealthWidth: PropTypes.number
};

BoundInventory.defaultProps = {
	inventory: {},
	stats: {},
	health: 0,
	maxHealth: 0,
	userHealthWidth: 0
};

const Inventory = connect(mapStateToProps, mapDispatchToProps)(BoundInventory);

export default Inventory;