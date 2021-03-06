import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import API from "../../utils/API";
import "./style.css";

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Are you sure you want to delete this character?</DialogTitle>
      <List>
        <ListItem autoFocus button onClick={() => handleListItemClick(true)}>
          <ListItemAvatar>
            <Avatar>
              <CheckIcon id="yes"/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Yes" />
        </ListItem>
        <ListItem autoFocus button onClick={() => handleListItemClick(false)}>
          <ListItemAvatar>
            <Avatar>
              <ClearIcon id="no"/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="No" />
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

export default function DeleteButton(id) {
  
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(false);
  const [charId, setCharId] = useState(id)


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
    handleDelete(value);
  };

  const handleDelete = (value) => {
      const userId = parseInt(window.sessionStorage.getItem("id"));
    if (value) {
       API.deleteCharacter(charId.id)
            .then(() => 
            location.reload());
    }
  }

  return (
    <div>
        <Button variant="contained" color="secondary" id="delete" onClick={handleClickOpen}>
            DELETE
        </Button>
        <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
    </div>
  );
}