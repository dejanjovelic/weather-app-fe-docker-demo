import React, { useEffect, useState } from "react";
import { fetchWeatherForecast } from "./Config/weatherService";
import "./global.scss";

const Home = () => {
    const [weatherData, setWeatherData] = useState([]);

    const getWeatherForecasteFromDb = async () => {
        try {
            const weatherForecastData = await fetchWeatherForecast();
            setWeatherData(weatherForecastData);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getWeatherForecasteFromDb();
    }, [])

    const formatDate = (date) => {
        return `${date.substring(8, 10)}.${date.substring(5, 7)}.${date.substring(0, 4)}.`;
    }

    return (
        <div className="weather-data-table-container">
            <div className="header-wrapper">
                <h1>Waether Data</h1>
            </div>

            <table className="weather-data-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temperature C</th>
                        <th>Temperature F</th>
                        <th>Weather summary</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {weatherData?.length > 0 && (
                        weatherData.map(oneDayWweather => (
                            <tr key={oneDayWweather.date}>
                                <td>{formatDate(oneDayWweather.date)}</td>
                                <td>{oneDayWweather.temperatureC}</td>
                                <td>{oneDayWweather.temperatureF}</td>
                                <td>{oneDayWweather.summary}</td>
                                <td>
                                    <button
                                        className="weather-data-table-delete-btn"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )))}
                </tbody>
            </table>
        </div>
    )
}
export default Home;