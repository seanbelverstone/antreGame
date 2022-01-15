import React from 'react';
import PropTypes from 'prop-types';
import enemies from '../../assets/images/enemyIcons';

const Enemy = (props) => {

	const {
		imageDisplay,
		enemyBlockFade,
		currentEnemy,
		currentEnemyHealth,
		enemyHealthWidth,
		enemyImage,
		characterName,
		currentUserHealth,
		maxHealth,
		userHealthWidth,
		optionFade,
		attackDisplay,
		attackText
	} = props;

	return (
		<>
			<div style={{ display: imageDisplay }} className={enemyBlockFade} id="enemyBlock">
				<div>{currentEnemy.name}</div>
				<div className="healthArea">
					<div className="healthText">
						{currentEnemyHealth}/{currentEnemy.health}
					</div>
					<div id="enemyBar" style={{ width: enemyHealthWidth }}></div>
				</div>

				<img src={enemies[enemyImage.toUpperCase()]} id="enemyImage" />

				<div id="charName">{characterName}</div>
				<div className="healthArea" id="userHealthArea">
					<div className="healthText">
						{currentUserHealth}/{maxHealth}
					</div>
					<div id="userBar" style={{ width: userHealthWidth }}></div>
				</div>
			</div>

			<div id="attackText" className={optionFade} style={{ display: attackDisplay }}>
				{attackText}
			</div>
		</>
	);
};

Enemy.propTypes = {
	imageDisplay: PropTypes.string,
	enemyBlockFade: PropTypes.string,
	currentEnemy: PropTypes.object,
	currentEnemyHealth: PropTypes.number,
	enemyHealthWidth: PropTypes.number,
	enemyImage: PropTypes.string,
	characterName: PropTypes.string,
	currentUserHealth: PropTypes.number,
	maxHealth: PropTypes.number,
	userHealthWidth: PropTypes.number,
	optionFade: PropTypes.string,
	attackDisplay: PropTypes.string,
	attackText: PropTypes.string
};

Enemy.defaultProps = {
	imageDisplay: '',
	enemyBlockFade: '',
	currentEnemy: {},
	currentEnemyHealth: 0,
	enemyHealthWidth: 0,
	enemyImage: '',
	characterName: '',
	currentUserHealth: 0,
	maxHealth: 0,
	userHealthWidth: 0,
	optionFade: '',
	attackDisplay: '',
	attackText: ''
};

export default Enemy;