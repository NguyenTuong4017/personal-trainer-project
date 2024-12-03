import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import { editCustomer } from "../../../hooks/post";

export default function EditCustomerDialog({
  openEditDialog,
  handleClose,
  //the customer prop get from CustomerList component
  customer,
  customerId,
  handleFetch,
}) {
  const [data, setData] = useState(customer);
  // set the customer to data for inputting data from <TextField />
  useEffect(() => {
    setData(customer);
  }, [customer]);

  //set the data to post to the server
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData({ ...data, [name]: value });
  };

  // post the id and new to the server to edit the customer
  const handleEdit = (id) => {
    console.log(customer);
    console.log(data);
    editCustomer(id, data)
      .then((response) => {
        if (response.ok) {
          handleFetch();
          handleClose();
          console.log("Edit success");
        } else {
          console.log("Edit failed");
        }
      })
      .catch((error) => console.error(error));
  };
  return (
    <>
      <Dialog open={openEditDialog} onClose={handleClose}>
        <DialogTitle>Edit customer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can edit the customer's information here
          </DialogContentText>
          {/* first name */}
          <TextField
            autoFocus
            required
            margin="dense"
            name="firstname"
            value={data.firstname}
            onChange={(e) => handleChange(e)}
            label="First name"
            fullWidth
            variant="standard"
          />
          {/* last name */}
          <TextField
            autoFocus
            required
            margin="dense"
            name="lastname"
            value={data.lastname}
            onChange={(e) => handleChange(e)}
            label="Last Name"
            fullWidth
            variant="standard"
          />
          {/* streetaddress */}
          <TextField
            autoFocus
            required
            margin="dense"
            name="streetaddress"
            value={data.streetaddress}
            onChange={(e) => handleChange(e)}
            label="Address"
            fullWidth
            variant="standard"
          />
          {/* postcode */}
          <TextField
            autoFocus
            required
            margin="dense"
            name="postcode"
            value={data.postcode}
            onChange={(e) => handleChange(e)}
            label="Post code"
            fullWidth
            variant="standard"
          />
          {/* city */}
          <TextField
            autoFocus
            required
            margin="dense"
            name="city"
            value={data.city}
            onChange={(e) => handleChange(e)}
            label="City"
            fullWidth
            variant="standard"
          />
          {/* email */}
          <TextField
            autoFocus
            required
            margin="dense"
            name="email"
            value={data.email}
            onChange={(e) => handleChange(e)}
            label="email"
            fullWidth
            variant="standard"
          />
          {/* phone */}
          <TextField
            autoFocus
            required
            margin="dense"
            name="phone"
            value={data.phone}
            onChange={(e) => handleChange(e)}
            label="Phone"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button autoFocus onClick={() => handleEdit(customerId)}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
