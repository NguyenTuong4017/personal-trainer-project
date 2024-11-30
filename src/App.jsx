import { useState, useEffect } from "react";
import { fetchCustomers } from "./hooks/fetch";
import "./App.css";
import Header from "./Components/Navbar/Header";
import CustomersList from "./Components/Content/CustomersList";
import { TrainingsList } from "./Components/Content/TrainingsList";
import PageList from "./Components/Navbar/PageList";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header />
          <Outlet />
        </>
      ),
      children: [
        { path: "customers", element: <CustomersList /> },
        { path: "trainings", element: <TrainingsList /> },
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
