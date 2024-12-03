import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { fetchTrainings } from "../../hooks/fetch";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import DeleteDialog from "./Dialog/DeleteDialog";
import CustomerCalendar from "./CustomerCalander";
export function TrainingsList() {
  const [trainings, setTrainings] = useState([]);
  const [rows, setRows] = useState([]);
  const [trainingId, setTrainingId] = useState();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [hide, setHide] = useState(true);

  //show the delete warning dialog
  const showDeleteWarning = (id) => {
    setTrainingId(id);
    setOpenDeleteDialog(true);
  };

  //close the both edit dialog and delete warning dialog
  const handleClose = () => {
    setOpenDeleteDialog(false);
  };

  //create columns for the data grid of training table
  const columns = [
    { field: "date", headerName: "Date", width: 300 },
    { field: "duration", headerName: "Duration", width: 150 },
    { field: "activity", headerName: "Activity", width: 200 },
    { field: "customer", headerName: "Customer", width: 250 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <>
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

  //retrieve all tranings from server
  const handleFetch = () => {
    fetchTrainings()
      .then((data) => setTrainings(data))
      .catch((error) => console.error("Fetch error: ", error));
  };

  //retrieve all the trainings immediately when the application opend
  useEffect(() => {
    handleFetch();
  }, []);

  //create a new object to handle formatted date and hold the full name of customer. create rows for data grid
  useEffect(() => {
    const transformedData = trainings.map((training) => ({
      id: training.id,
      date: dayjs(training.date).format("MMMM D, YYYY h:mm A"),
      duration: `${training.duration} minutes`,
      activity: training.activity,
      customer: `${training.customer.firstname} ${training.customer.lastname}`,
    }));
    setRows(transformedData);
  }, [trainings]);

  return (
    <>
      {
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
      }
      <DeleteDialog
        handleClose={handleClose}
        handleFetch={handleFetch}
        idToDelete={trainingId}
        openDeleteDialog={openDeleteDialog}
        typeOfDeletion="training"
      />
    </>
  );
}
