import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { fetchCustomers } from "../../hooks/fetch";
import { getId } from "../../JavaScript-Function/jsFunction";
import { Button } from "@mui/material";
import DeleteDialog from "./Dialog/DeleteDialog";
import EditCustomerDialog from "./Dialog/EditCustomerDialog";
import CustomerCsvExport from "../CSV/CustomerCsvExport";

export default function CustomersList() {
  const [customers, setCustomers] = useState([]);
  const [customerToEdit, setCustomerToEdit] = useState({});
  const [rows, setRows] = useState([]);
  const [customerId, setCustomerId] = useState();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  //show the delete warning dialog
  const showDeleteWarning = (id) => {
    setCustomerId(id);
    setOpenDeleteDialog(true);
  };

  //show the form to edit the customer and create a new customer props to pass to the CusomterAddingForm component
  const showEditForm = (id) => {
    const ref = customers.filter(
      (customer) => getId(customer._links.self.href) == id
    );
    setCustomerToEdit(ref[0]);
    setCustomerId(id);
    setOpenEditDialog(true);
  };

  //close the both edit dialog and delete warning dialog
  const handleClose = () => {
    setOpenEditDialog(false);
    setOpenDeleteDialog(false);
  };

  //fetch the data to retrieve all customers
  const handleFetch = () => {
    fetchCustomers()
      .then((data) => setCustomers(data._embedded.customers))
      .catch((error) => console.error("Fetching error: ", error));
  };

  //fetch the data immediately when the application opened
  useEffect(() => {
    handleFetch();
  }, []);

  //create columns for the data grid table
  const columns = [
    { field: "fullName", headerName: "Customer's name", width: 300 },
    { field: "address", headerName: "Address", width: 300 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone Number", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 300,
      //show the delete and edit buttons
      renderCell: (params) => (
        <>
          {/* edit button */}
          <Button
            variant="contained"
            color="success"
            sx={{ mr: 2, width: 100 }}
            onClick={() => showEditForm(params.row.id)}
          >
            Edit
          </Button>

          {/* delete button */}
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

  //create a new object to hold fullname, full address of customer. create less columns. create rows for the data grid table
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
      {/* data grid table */}
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
      {/* Export button */}
      <CustomerCsvExport data={rows} />

      {/* delete warning dialog */}
      <DeleteDialog
        handleClose={handleClose}
        handleFetch={handleFetch}
        idToDelete={customerId}
        openDeleteDialog={openDeleteDialog}
        typeOfDeletion="customer"
      />
      {/* edit dialog */}
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
