function WeatherCard({ weather }) {

  return (

    <div className="weather-card">

      <h2>Weather Information</h2>

      <p>🌡 Temperature : {weather.temperature_2m}°C</p>

      <p>💧 Humidity : {weather.relative_humidity_2m}%</p>

      <p>🌬 Wind Speed : {weather.wind_speed_10m} km/h</p>

    </div>

  );
}

export default WeatherCard;