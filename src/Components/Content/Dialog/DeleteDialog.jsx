import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Button } from "@mui/material";
import { deleteCustomer } from "../../../hooks/post";
export default function DeleteDialog({
  openDeleteDialog,
  handleClose,
  handleFetch,
  idToDelete,
}) {
  //post the customer id to delete
  const handleDelete = (idToDelete) => {
    deleteCustomer(idToDelete)
      .then((response) => {
        if (response.ok) {
          handleFetch();
          handleClose();
          console.log("Delete success");
        } else {
          console.log("Delete failed");
        }
      })
      .catch((error) => console.error(error));
  };
  return (
    <>
      <Dialog open={openDeleteDialog} onClose={handleClose}>
        <DialogTitle>Warning!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to delete this customer?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={() => handleDelete(idToDelete)} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
