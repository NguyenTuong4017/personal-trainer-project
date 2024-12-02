import { useState, useEffect } from "react";
import { fetchCustomers } from "./hooks/fetch";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Navbar/Header";
import CustomersList from "./Components/Content/CustomersList";
import { CustomerAddingForm } from "./Components/Add-Form/CustomerAddingForm";
import { TrainingsList } from "./Components/Content/TrainingsList";
import TrainingAddingForm from "./Components/Add-Form/TrainingAddingForm";
import PageList from "./Components/Navbar/PageList";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header />
          {/* all pages show here */}
          <Outlet />
        </>
      ),
      children: [
        { path: "customers", element: <CustomersList /> },
        { path: "trainings", element: <TrainingsList /> },
        { path: "add-customer", element: <CustomerAddingForm /> },
        { path: "add-training", element: <TrainingAddingForm /> },
        { index: true, element: <CustomersList /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
export default App;
