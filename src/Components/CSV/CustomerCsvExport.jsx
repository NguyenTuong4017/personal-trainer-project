import { CSVLink } from "react-csv";
//create csv headers
const csvHeader = [
  { label: "Id", key: "id" },
  { label: "Customer's name", key: "fullName" },
  { label: "Address", key: "address" },
  { label: "Email", key: "email" },
  { label: "Phone", key: "phone" },
];
export default function CustomerCsvExport({ data }) {
  return (
    <>
      <CSVLink
        headers={csvHeader}
        data={data}
        filename="customer_data.csv"
        className="btn btn-primary"
      >
        Download customer data
      </CSVLink>
    </>
  );
}
