import { useState, useEffect } from "react";
import { fetchCustomers } from "./hooks/fetch";
import "./App.css";
import Navbar from "./Components/Navbar";
import CustomersList from "./Components/Content/CustomersList";
import { TrainingsList } from "./Components/Content/TrainingsList";

function App() {
  return (
    <div>
      {Navbar()}

      {TrainingsList()}
    </div>
  );
}
export default App;
