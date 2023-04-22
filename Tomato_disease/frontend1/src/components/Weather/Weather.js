import React, { useState, useEffect } from "react";
import "./weather.css";
import { HiLocationMarker } from "react-icons/hi";
import { WiHumidity, WiDayCloudyGusts, WiBarometer } from "react-icons/wi";
function WeatherApp() {
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = "21e0b9b9ec4cdb260dc1cab0c4eeccda";

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setWeatherData(data);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }
  const temperature = weatherData?.main?.temp
    ? Math.round(weatherData.main.temp - 273.15)
    : "";
  const humidity = weatherData?.main?.humidity || "";
  const windSpeed = weatherData?.wind?.speed || "";
  const pressure = weatherData?.main?.pressure || "";
  const { name, weather } = weatherData;

  return (
    <div className="main_div">
      <div className="container">
        <div className="location_div">
          <HiLocationMarker size={20} />
          <h2>{name}</h2>
        </div>
        <div className="temp_div">
          <p className="des">{weather[0].description}</p>
          <p className="temp">{temperature ? `${temperature}°C` : "N/A"}</p>
        </div>
        <div>
          <div className="attributes">
            <div>
              <p>
                <WiHumidity size={25} />
              </p>
              <p>{humidity ? `${humidity}%` : "N/A"}</p>
              <p>Humidity</p>
            </div>
            <div>
              <p>
                <WiDayCloudyGusts size={25} />
              </p>
              <p>{windSpeed ? `${windSpeed} m/s` : "N/A"}</p>
              <p>Wind Speed</p>
            </div>
            <div>
              <p>
                <WiBarometer size={30} />
              </p>
              <p>{pressure ? `${pressure} hPa` : "N/A"}</p>
              <p>Pressure</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
