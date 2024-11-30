const CUSTOMERS_API = import.meta.env.VITE_CUSTOMERS_API
const TRAININGS_API = import.meta.env.VITE_TRAININGS_API


export function fetchCustomers() {
    console.log('Fetching from:', CUSTOMERS_API); // Debug log
    return fetch(CUSTOMERS_API)
        .then(response => {
            if (!response.ok) {
                throw new Error("Fetch error: " + response.statusText);
            }
                  
            return response.json();
        });
}

export function fetchTrainings() {
    console.log("Fetching from: ", TRAININGS_API);
    return fetch(TRAININGS_API)
            .then(response => {
                if(!response.ok) {
                    throw new Error("Fetch error: " + response.statusText)
                }

                return response.json()
            })
}
