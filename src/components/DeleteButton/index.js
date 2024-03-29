import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import './style.css';

function SimpleDialog(props) {
	// eslint-disable-next-line react/prop-types
	const { onClose, selectedValue, open, customText } = props;

	const handleClose = () => {
		onClose(selectedValue);
	};

	const handleListItemClick = (value) => {
		onClose(value);
	};

	return (
		<Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
			<h2 id="warning">WARNING</h2>
			<DialogTitle id="simple-dialog-title">{customText}</DialogTitle>
			<h3 id="warning">THIS ACTION CANNOT BE REVERSED</h3>
			<List className="yesNoList">
				<ListItem className="yesWrapper" autoFocus button onClick={() => handleListItemClick(true)}>
					<ListItemAvatar>
						<Avatar>
							<CheckIcon id="yes"/>
						</Avatar>
					</ListItemAvatar>
					<ListItemText id="yesText" primary="YES" />
				</ListItem>
				<ListItem className="noWrapper" autoFocus button onClick={() => handleListItemClick(false)}>
					<ListItemAvatar>
						<Avatar>
							<ClearIcon id="no"/>
						</Avatar>
					</ListItemAvatar>
					<ListItemText id="noText" primary="NO" />
				</ListItem>
			</List>
		</Dialog>
	);
}

SimpleDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	selectedValue: PropTypes.bool.isRequired,
};

export default function DeleteButton(props) {
  
	const [open, setOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState(false);
	const { text, customText, callback } = props;

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (value) => {
		setOpen(false);
		setSelectedValue(value);
		callback && callback(value);
	};

	return (
		<div id={props.id}>
			<Button variant="contained" className="secondaryButton" id="delete" onClick={handleClickOpen}>
				{text ? text : 'DELETE'}
			</Button>
			<SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} customText={customText} />
		</div>
	);
}

DeleteButton.propTypes = {
	id: PropTypes.string,
	text: PropTypes.string,
	customText: PropTypes.string,
	callback: PropTypes.func
};

DeleteButton.defaultProps = {
	id: '',
	text: '',
	customText: '',
	callback: () => {}
};