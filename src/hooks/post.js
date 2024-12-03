const CUSTOMERS_API = import.meta.env.VITE_CUSTOMERS_API
const TRAININGS_API = import.meta.env.VITE_TRAININGS_API
import { useNavigate } from "react-router-dom"

export function addCustomerToDatabase(data) {
    return fetch(CUSTOMERS_API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
}


export function deleteCustomer(id) {
    return fetch(CUSTOMERS_API+`/${id}`, {
        method: "DELETE",
    })
        
}
  