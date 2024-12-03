import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { fetchCustomers } from "../../hooks/fetch";

import { Button } from "@mui/material";
import DeleteDialog from "./Dialog/DeleteDialog";
import EditCustomerDialog from "./Dialog/EditCustomerDialog";

export default function CustomersList() {
  const [customers, setCustomers] = useState([]);
  const [customerToEdit, setCustomerToEdit] = useState({});
  const [rows, setRows] = useState([]);
  const [customerId, setCustomerId] = useState();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  //extract the id from the href
  const getId = (url) => {
    const parts = url.split("/");
    const id = parts[parts.length - 1];
    return id;
  };

  const showDeleteWarning = (id) => {
    setCustomerId(id);
    setOpenDeleteDialog(true);
  };

  const showEditForm = (id) => {
    const ref = customers.filter(
      (customer) => getId(customer._links.self.href) == id
    );
    setCustomerToEdit(ref[0]);
    setCustomerId(id);
    setOpenEditDialog(true);
  };

  const handleClose = () => {
    setOpenEditDialog(false);
    setOpenDeleteDialog(false);
  };

  const handleFetch = () => {
    fetchCustomers()
      .then((data) => setCustomers(data._embedded.customers))
      .catch((error) => console.error("Fetching error: ", error));
  };

  useEffect(() => {
    handleFetch();
  }, []);

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
        <>
          <Button
            variant="contained"
            color="success"
            sx={{ mr: 2, width: 100 }}
            onClick={() => showEditForm(params.row.id)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ width: 100 }}
            onClick={() => showDeleteWarning(params.row.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    const transformedData = customers.map((item) => ({
      id: String(getId(item._links.self.href)),
      fullName: `${item.firstname} ${item.lastname}`,
      address: `${item.streetaddress}, ${item.city}, ${item.postcode}`,
      email: item.email,
      phone: item.phone,
    }));
    setRows(transformedData);
  }, [customers]);

  return (
    <>
      <DataGrid
        columns={columns}
        rows={rows}
        sx={{
          "& .MuiDataGrid-cell:focus": {
            outline: "none", // Suppress cell focus outline
          },
          "& .MuiDataGrid-cell:focus-within": {
            outline: "none", // Suppress focus-within state
          },
        }}
      ></DataGrid>

      <DeleteDialog
        handleClose={handleClose}
        handleFetch={handleFetch}
        idToDelete={customerId}
        openDeleteDialog={openDeleteDialog}
      />
      <EditCustomerDialog
        handleClose={handleClose}
        openEditDialog={openEditDialog}
        customer={customerToEdit}
        handleFetch={handleFetch}
        customerId={customerId}
      />
    </>
  );
}
