import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCustomerToDatabase } from "../../hooks/post";

export function CustomerAddingForm() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    streetaddress: "",
    postcode: "",
    city: "",
  });
  //pass the inputted value to the data
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
    console.log(data);
  };

  //post the new data to server to create a new customer
  const handleSubmit = (e) => {
    e.preventDefault();
    addCustomerToDatabase(data)
      .then((response) => {
        if (response.ok) {
          console.log("Post success");
          navigate("/customers");
        } else {
          console.log("Post failed");
        }
      })
      .catch((error) => console.error("Error: ", error));
  };

  return (
    <form className="row g-3" onSubmit={(e) => handleSubmit(e)}>
      {/* first name input */}
      <div className="col-md-6">
        <label className="form-label">First Name</label>
        <input
          type="text"
          className="form-control"
          name="firstname"
          value={data.firstname}
          onChange={(e) => handleChange(e)}
          required
        />
      </div>

      {/* last name input */}
      <div className="col-md-6">
        <label className="form-label">Last Name</label>
        <input
          type="text"
          className="form-control"
          name="lastname"
          value={data.lastname}
          onChange={(e) => handleChange(e)}
          required
        />
      </div>
      {/* email input */}
      <div className="col-md-6 ">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={data.email}
          onChange={(e) => handleChange(e)}
          required
        />
      </div>
      {/* phone input */}
      <div className="col-md-6 ">
        <label className="form-label">Phone number</label>
        <input
          type="text"
          className="form-control"
          name="phone"
          value={data.phone}
          onChange={(e) => handleChange(e)}
          required
        />
      </div>
      {/* street address input */}
      <div className="col-12">
        <label className="form-label">Street Address</label>
        <input
          type="text"
          className="form-control"
          name="streetaddress"
          value={data.streetaddress}
          onChange={(e) => handleChange(e)}
          required
        />
      </div>
      {/* city input */}
      <div className="col-md-6">
        <label className="form-label">City</label>
        <input
          type="text"
          className="form-control"
          name="city"
          value={data.city}
          onChange={(e) => handleChange(e)}
          required
        />
      </div>
      {/* postcode input */}
      <div className="col-md-6">
        <label className="form-label">Postcode</label>
        <input
          type="text"
          className="form-control"
          name="postcode"
          value={data.postcode}
          onChange={(e) => handleChange(e)}
          required
        />
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
