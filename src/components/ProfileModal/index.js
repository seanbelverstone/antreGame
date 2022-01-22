import React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import DeleteButton from '../DeleteButton';

// PSUEDOCODE
// When modal is open, if the prop `formInProgress` = true then disable clickout
// modal closure.
// if nothing edited, disable submit button.
// api call to change username/password/email/delete account?

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		minWidth: '40vh'
	},
}));
const ProfileModal = (props) => {
	const { user } = props;
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		// if formInProgress, add a nested modal - if click ok then continue 
		setOpen(false);
	};

	return (
		<div>
			<IconButton variant="contained" color="primary" onClick={handleOpen} style={{ float: 'right' }}>
				<ManageAccountsIcon />
			</IconButton>
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
				className={classes.modal}
			>
				<Fade in={open}>
					<div className={classes.paper} id="profileModal">
						<h2 className="title">Edit Account</h2>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							Username: {user.username} <a>Edit</a>
						</div>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							Password: ******* <a>Edit</a>
						</div>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<DeleteButton id={user.id} jwtToken={user.jwtToken} text="DELETE ACCOUNT"/>
						</div>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};

ProfileModal.propTypes = {
	user: PropTypes.object,
};

ProfileModal.defaultProps = {
	user: {},
};

export default ProfileModal;
