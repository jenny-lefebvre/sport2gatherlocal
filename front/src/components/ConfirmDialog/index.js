import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

export default function ConfirmDialog({ handleDeletePost }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseYes = () => {
    setOpen(false);
    handleDeletePost();
  };

  return (
    <>
      <div onClick={handleClickOpen} className="button post-button delete"><DeleteOutlineOutlinedIcon /></div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Etes vous sûr de vouloir supprimer cette annonce ?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Non
          </Button>
          <Button onClick={handleCloseYes} color="primary">
            Oui
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
