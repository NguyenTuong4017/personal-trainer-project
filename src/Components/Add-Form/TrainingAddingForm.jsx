import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { fetchCustomers } from "../../hooks/fetch";
import { addTrainingToDatabase } from "../../hooks/post";
import "react-datepicker/dist/react-datepicker.css";
import { getId } from "../../JavaScript-Function/jsFunction";
import dayjs from "dayjs";

export default function TrainingAddingForm() {
  const navigate = useNavigate();
  const [date, setDate] = useState();
  const [customers, setCustomers] = useState([]);
  //reference data to hold the fullname of customer
  const [ref, setRef] = useState([]);

  //Create data to post to the server
  const [data, setData] = useState({
    date: "",
    activity: "",
    duration: "",
    customer: "",
  });

  //fetch the data to get customer name, url and id
  const handleFetch = () => {
    fetchCustomers()
      .then((data) => setCustomers(data._embedded.customers))
      .catch((error) => console.error("Fetching error: ", error));
  };
  //set and convert the date to data
  const handleDateInput = (date) => {
    setDate(date);
    const isoDate = dayjs(date).toISOString();
    console.log(isoDate);
    console.log(date);
    setData({
      ...data,
      date: isoDate,
    });
    console.log(data);
  };

  //set the activity, duration, customer url to data
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData({
      ...data,
      [name]: value,
    });
    console.log(data);
  };

  //submit then post the data to server
  const handleSubmit = (e) => {
    e.preventDefault();
    addTrainingToDatabase(data)
      .then((response) => {
        if (response.ok) {
          console.log("Post success");
          navigate("/trainings");
        } else {
          console.log("Post failed");
        }
      })
      .catch((error) => console.error("Error: ", error));
  };

  useEffect(() => {
    handleFetch();
  }, []);

  //create a new array of object to handle the fullname of customer
  useEffect(() => {
    const transformedData = customers.map((item) => ({
      id: String(getId(item._links.self.href)),
      fullName: `${item.firstname} ${item.lastname}`,
      url: item._links.self.href,
    }));
    setRef(transformedData);
  }, [customers]);

  return (
    <form className="row g-3" onSubmit={(e) => handleSubmit(e)}>
      {/* date input */}
      <div className="col-md-6">
        <label className="form-label">Date</label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            selected={date}
            onChange={(date) => handleDateInput(date)}
            value={date}
            dateFormat={"dd/MM/YYYY"}
            className="form-control"
          />
        </LocalizationProvider>
      </div>

      {/* activity input */}
      <div className="col-md-6">
        <label className="form-label">Activity</label>
        <input
          type="text"
          className="form-control"
          name="activity"
          required
          value={data.activity}
          onChange={(e) => handleChange(e)}
        />
      </div>
      {/* duration input */}
      <div className="col-md-6 ">
        <label className="form-label">Duration</label>
        <input
          type="number"
          className="form-control"
          name="duration"
          required
          value={data.duration}
          onChange={(e) => handleChange(e)}
        />
      </div>
      {/* customer input */}
      <div className="col-md-6 ">
        <label className="form-label">Customer</label>
        <select
          className="form-control"
          name="customer"
          onChange={(e) => handleChange(e)}
        >
          <option>Select Customer</option>
          {ref.map((item) => (
            <option value={item.url} key={item.id}>
              {item.fullName}
            </option>
          ))}
        </select>
      </div>

      {/* submit button */}
      <div className="col-12">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
}
