const CUSTOMERS_API = import.meta.env.VITE_CUSTOMERS_API
const VITE_POST_TRAININGS_API = import.meta.env.VITE_POST_TRAININGS_API
import { useNavigate } from "react-router-dom"
//post the data of new customer
export function addCustomerToDatabase(data) {
    return fetch(CUSTOMERS_API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
}

//delete the customer with id
export function deleteCustomer(id) {
    return fetch(CUSTOMERS_API+`/${id}`, {
        method: "DELETE",
    })
        
}
//edit customer by new data with id
export function editCustomer(id, data) {
    return fetch(CUSTOMERS_API+`/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });


}
//add a new training to database and associate it with a customer
export function addTrainingToDatabase(data) {
    return fetch(VITE_POST_TRAININGS_API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
        
}

//delete the training with id
export function deleteTraining(id) {
    return fetch(VITE_POST_TRAININGS_API+`/${id}` , {
        method: "DELETE"
    })
}