import React, { useState, useEffect } from "react";
import "./App.css";
import List from "./components/List";

interface ForecastList {
  elevation: number;
  generationtime_ms: number;
  hourly: {
    temperature_2m: Array<number>;
    time: Array<number>;
    weathercode: Array<number>;
  };
  hourly_units: {
    temperature_2m: string;
    time: string;
    weathercode: string;
  };
  latitude: number;
  longitude: number;
  utc_offset_seconds: number;
}

function App() {
  const [forecast, setTemperature] = useState<ForecastList>();

  useEffect(() => {
    getForecast();
  }, []);

  const getForecast = async () => {
    const listResp = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=52.2297&longitude=21.0122&hourly=temperature_2m,weathercode&timeformat=unixtime&timezone=Europe%2FBerlin"
    );
    const forecast: ForecastList = await listResp.json();
    setTemperature(forecast);
  };

  return (
    <div className="container mx-auto pt-6 pb-6">
      <h1 className="text-3xl font-bold mb-3">Forecast</h1>
      <div className="flex items-start">
        <div className="flex-none">
          {forecast ? (
            <List hourly={forecast.hourly} />
          ) : (
            <p>Loading results...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
