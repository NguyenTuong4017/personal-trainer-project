import { Calendar, momentLocalizer } from "react-big-calendar";
import { fetchTrainings } from "../../hooks/fetch";
import { useState, useEffect } from "react";
import moment from "moment";
import dayjs from "dayjs";
const localizer = momentLocalizer(moment);
export default function CustomerCalendar() {
  const [trainings, setTrainings] = useState([]);
  //retrieve all tranings from server
  const handleFetch = () => {
    fetchTrainings()
      .then((data) => setTrainings(data))
      .catch((error) => console.error("Fetch error: ", error));
  };

  //retrieve all the trainings immediately when the application opend
  useEffect(() => {
    handleFetch();
  }, []);

  const events = trainings.map((item) => ({
    id: item.id,
    title: `${item.activity} / ${item.customer.firstname} ${item.customer.lastname}`,
    start: dayjs(item.date).toDate(),
    end: dayjs(item.date).add(item.duration, "minute").toDate(),
  }));

  return (
    <div style={{ height: "80vh", padding: "20px" }}>
      {console.log(events)}
      <Calendar
        localizer={localizer}
        events={events}
        defaultView="week"
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
}
