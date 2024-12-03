import { AgCharts } from "ag-charts-react";
import { fetchTrainings } from "../../hooks/fetch";
import { useState, useEffect } from "react";
import { data } from "react-router-dom";

export default function TrainingChart() {
  const [trainings, setTrainings] = useState([]);
  const [chartOptions, setChartOtions] = useState({
    data: [],
    series: [{ type: "bar", xKey: "activity", yKey: "duration" }],
  });

  const sum = [];

  //group the trainings and caculate their durations
  function groupAndSum(data, groupByKey, sumKey) {
    return data.reduce((result, item) => {
      const group = result.find((r) => r[groupByKey] === item[groupByKey]);
      if (group) {
        group[sumKey] += item[sumKey];
      } else {
        result.push({ [groupByKey]: item[groupByKey], [sumKey]: item[sumKey] });
      }
      return result;
    }, []);
  }
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

  useEffect(() => {
    const chartData = groupAndSum(trainings, "activity", "duration");
    setChartOtions({
      data: chartData,
      series: [{ type: "bar", xKey: "activity", yKey: "duration" }],
      height: 1000,
      title: {
        text: "Training Chart",
      },
      axes: [
        {
          type: "category",
          position: "bottom",
          title: { text: "Activity" }, // Optional X-axis title
        },
        {
          type: "number",
          position: "left",
          title: {
            text: "Duration (min)",
            enable: true,
          },
        },
      ],
    });
  }, [trainings]);

  return (
    <div>
      <AgCharts options={chartOptions} />

      {console.log(chartOptions)}
    </div>
  );
}
