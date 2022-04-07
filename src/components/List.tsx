import React from "react";

interface IProps {
  hourly: {
    temperature_2m: Array<number>;
    time: Array<number>;
    weathercode: Array<number>;
  };
}

const List: React.FC<IProps> = ({ hourly }) => {
  const dysplayTable = () => {
    let forecast: number[][] = [];
    let hourlyArray = Object.values(hourly);

    hourlyArray.forEach((item, key) => {
      for (let i = 0; i < item.length; i++) {
        if (!forecast[i]) {
          forecast[i] = [];
        }
        forecast[i][key] = item[i];
      }
      return forecast;
    });

    return (
      <table className="table-auto mx-auto text-center">
        <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {Object.keys(hourly).map((item, key) => (
              <th key={key} className="p-4">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {forecast.map((item, key) => {
            return (
              <tr
                key={key}
                className="dark:bg-gray-800 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700"
              >
                {item.map((item, key) => (
                  <td key={key}>{item}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return <div>{hourly ? dysplayTable() : <p>Loading data...</p>}</div>;
};

export default List;
