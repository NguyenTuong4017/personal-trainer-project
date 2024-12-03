const CUSTOMERS_API = import.meta.env.VITE_CUSTOMERS_API
const TRAININGS_API = import.meta.env.VITE_TRAININGS_API


export async function fetchCustomers() {
    console.log('Fetching from:', CUSTOMERS_API); // Debug log
    const response = await fetch(CUSTOMERS_API);
    if (!response.ok) {
        throw new Error("Fetch error: " + response.statusText);
    }
    return await response.json();
}

export async function fetchTrainings() {
    console.log("Fetching from: ", TRAININGS_API);
    const response = await fetch(TRAININGS_API);
    if (!response.ok) {
        throw new Error("Fetch error: " + response.statusText);
    }
    return await response.json();
}
