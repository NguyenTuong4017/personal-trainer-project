import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { fetchTrainings } from "../../hooks/fetch";
import dayjs from "dayjs";
export function TrainingsList() {
  const [trainings, setTrainings] = useState([]);
  const [rows, setRows] = useState([]);

  const columns = [
    { field: "date", headerName: "Date", width: 300 },
    { field: "duration", headerName: "Duration", width: 150 },
    { field: "activity", headerName: "Activity", width: 200 },
    { field: "customer", headerName: "Customer", width: 250 },
  ];

  const handleFetch = () => {
    fetchTrainings()
      .then((data) => setTrainings(data))
      .catch((error) => console.error("Fetch error: ", error));
  };

  useEffect(() => {
    handleFetch();
  }, []);

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
      {<DataGrid columns={columns} rows={rows}></DataGrid>}
      {console.log(rows)}
    </>
  );
}
