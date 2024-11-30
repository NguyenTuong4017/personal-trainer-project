import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { fetchCustomers } from "../../hooks/fetch";

export default function CustomersList() {
  const [customers, setCustomers] = useState([]);
  const [rows, setRows] = useState([]);

  const columns = [
    { field: "fullName", headerName: "Customer's name", width: 300 },
    { field: "address", headerName: "Address", width: 300 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone Number", width: 150 },
  ];

  const handleFetch = () => {
    fetchCustomers()
      .then((data) => setCustomers(data._embedded.customers))
      .catch((error) => console.error("Fetching error: ", error));
  };

  useEffect(() => {
    handleFetch();
  }, []);

  useEffect(() => {
    const transformedData = customers.map((item, index) => ({
      id: index,
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
    </>
  );
}
