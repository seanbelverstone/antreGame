import * as React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';

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
const ProfileModal = () => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

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
						<Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
						</Typography>
						<Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
						</Typography>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};

export default ProfileModal;
