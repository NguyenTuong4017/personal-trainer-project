import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { fetchCustomers } from "../../hooks/fetch";
import { deleteCustomer } from "../../hooks/post";
import { Button } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function CustomersList() {
  const [customers, setCustomers] = useState([]);
  const [rows, setRows] = useState([]);
  const [idToDelete, setDeleteId] = useState();
  const [openDialog, setOpenDialog] = useState(false);

  const showWarning = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const getId = (url) => {
    const parts = url.split("/");
    const id = parts[parts.length - 1];
    return id;
  };

  const handleFetch = () => {
    fetchCustomers()
      .then((data) => setCustomers(data._embedded.customers))
      .catch((error) => console.error("Fetching error: ", error));
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const handleDelete = (id) => {
    deleteCustomer(id)
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

  const columns = [
    { field: "fullName", headerName: "Customer's name", width: 300 },
    { field: "address", headerName: "Address", width: 300 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone Number", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => showWarning(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const transformedData = customers.map((item) => ({
      id: getId(item._links.self.href),
      fullName: `${item.firstname} ${item.lastname}`,
      address: `${item.streetaddress}, ${item.city}, ${item.postcode}`,
      email: item.email,
      phone: item.phone,
    }));
    setRows(transformedData);
  }, [customers]);

  return (
    <>
      <DataGrid columns={columns} rows={rows}></DataGrid>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>{"Warning!"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to delete this customer?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDelete(idToDelete)} autoFocus>
            Yes
          </Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
