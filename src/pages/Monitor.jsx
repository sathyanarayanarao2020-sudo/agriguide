import { useEffect, useState } from "react";

function Monitor() {

  const [crop, setCrop] = useState(() => {
    if (typeof window === "undefined") {
      return "";
    }

    const savedData = localStorage.getItem("cropData");
    return savedData ? JSON.parse(savedData).crop : "";
  });

  const [soilType, setSoilType] = useState(() => {
    if (typeof window === "undefined") {
      return "";
    }

    const savedData = localStorage.getItem("cropData");
    return savedData ? JSON.parse(savedData).soilType : "";
  });

  const [irrigation, setIrrigation] = useState(() => {
    if (typeof window === "undefined") {
      return "";
    }

    const savedData = localStorage.getItem("cropData");
    return savedData ? JSON.parse(savedData).irrigation : "";
  });

  const [location, setLocation] = useState(() => {
    if (typeof window === "undefined") {
      return "";
    }

    const savedData = localStorage.getItem("cropData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      if (parsed.location) return parsed.location;
    }

    const farmerData = localStorage.getItem("farmerData");
    if (farmerData) {
      const parsedFarmer = JSON.parse(farmerData);
      return parsedFarmer?.location ?? "";
    }

    return "";
  });

  const [started, setStarted] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return Boolean(localStorage.getItem("cropData"));
  });

  const [moisture, setMoisture] =
    useState(65);

  const [temperature, setTemperature] =
    useState(28);

  const [humidity, setHumidity] =
    useState(70);

  const [health, setHealth] =
    useState(85);

  const [weatherCondition, setWeatherCondition] =
    useState("Cloudy");

  const [weatherLoading, setWeatherLoading] =
    useState(false);

  const [alerts, setAlerts] =
    useState([]);

  const cropDiseaseMap = {
    Rice: [
      "Rice Blast",
      "Sheath Blight",
      "Bacterial Leaf Blight"
    ],
    Wheat: [
      "Stem Rust",
      "Powdery Mildew",
      "Fusarium Head Blight"
    ],
    Maize: [
      "Northern Corn Leaf Blight",
      "Common Rust",
      "Gray Leaf Spot"
    ],
    Cotton: [
      "Bacterial Blight",
      "Verticillium Wilt",
      "Root Rot"
    ],
    Tomato: [
      "Late Blight",
      "Early Blight",
      "Fusarium Wilt"
    ],
    Potato: [
      "Late Blight",
      "Early Blight",
      "Blackleg"
    ],
    Onion: [
      "Downy Mildew",
      "Purple Blotch",
      "White Rot"
    ],
    Mango: [
      "Anthracnose",
      "Powdery Mildew",
      "Bacterial Black Spot"
    ],
    Apple: [
      "Apple Scab",
      "Fire Blight",
      "Powdery Mildew"
    ],
    default: [
      "Leaf Spot",
      "Fungal Infection",
      "Bacterial Wilt"
    ]
  };

  const assessDiseaseRisk = (
    cropType,
    temp,
    humidityValue,
    moistureValue,
    healthValue
  ) => {
    if (!cropType) return [];

    const diseases = cropDiseaseMap[cropType] ?? cropDiseaseMap.default;
    const risk = [];
    const isFungal = humidityValue >= 75 && moistureValue >= 65;
    const isBacterial = humidityValue >= 70 && temp >= 25;
    const isHeatStress = temp > 32;
    const isLowHealth = healthValue < 80;

    if (isFungal) {
      risk.push(`Fungal risk: ${diseases[0]}`);
    }

    if (isBacterial) {
      risk.push(`Bacterial risk: ${diseases[1] ?? diseases[0]}`);
    }

    if (isHeatStress) {
      risk.push(`Heat stress may trigger ${diseases[2] ?? diseases[0]}`);
    }

    if (isLowHealth && risk.length === 0) {
      risk.push(`Elevated disease risk: ${diseases[0]}`);
    }

    if (risk.length === 0) {
      risk.push("Low disease risk at current conditions");
    }

    return risk;
  };

  const mapWeatherCode = (code) => {
    if (code === 0) return "Clear";
    if ([1, 2, 3].includes(code)) return "Partly Cloudy";
    if ([45, 48].includes(code)) return "Foggy";
    if ([51, 53, 55].includes(code)) return "Drizzle";
    if ([56, 57].includes(code)) return "Freezing Drizzle";
    if ([61, 63, 65].includes(code)) return "Rainy";
    if ([66, 67].includes(code)) return "Freezing Rain";
    if ([71, 73, 75, 77].includes(code)) return "Snowy";
    if ([80, 81, 82].includes(code)) return "Rain Showers";
    if ([85, 86].includes(code)) return "Snow Showers";
    if ([95, 96, 99].includes(code)) return "Thunderstorm";
    return "Unknown";
  };

  useEffect(() => {
    if (!started || !location) return;

    let active = true;

    const fetchWeather = async () => {
      setWeatherLoading(true);

      try {
        const geoResponse = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`
        );
        const geoData = await geoResponse.json();
        const place = geoData.results?.[0];
        if (!place) {
          setWeatherCondition("Location not found");
          return;
        }

        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current_weather=true&hourly=relativehumidity_2m`
        );
        const weatherData = await weatherResponse.json();
        const current = weatherData.current_weather;
        if (!current) return;

        const humidityIndex =
          weatherData.hourly?.time?.indexOf(current.time);
        const apiHumidity =
          humidityIndex >= 0
            ? weatherData.hourly.relativehumidity_2m?.[humidityIndex]
            : null;

        if (!active) return;

        setTemperature(current.temperature ?? 28);
        if (apiHumidity != null) setHumidity(apiHumidity);
        setWeatherCondition(mapWeatherCode(current.weathercode));
      } catch {
        setWeatherCondition("Weather unavailable");
      } finally {
        if (active) setWeatherLoading(false);
      }
    };

    fetchWeather();
    return () => {
      active = false;
    };
  }, [started, location]);


  useEffect(() => {

    if (!started) return;

    const interval = setInterval(() => {

      let newMoisture =
        Math.floor(
          Math.random() * 30
        ) + 50;

      let newTemperature =
        Math.floor(
          Math.random() * 10
        ) + 24;

      let newHumidity =
        Math.floor(
          Math.random() * 20
        ) + 60;

      let newHealth =
        Math.floor(
          Math.random() * 20
        ) + 75;

      if (crop === "Rice") {

        newMoisture = 80;

        newHumidity = 85;

      }

      if (crop === "Tomato") {

        newMoisture = 60;

        newHumidity = 65;

      }

      setMoisture(
        newMoisture
      );

      setTemperature(
        newTemperature
      );

      setHumidity(
        newHumidity
      );

      setHealth(
        newHealth
      );

      const newAlerts = [];

      if (newMoisture < 55) {

        newAlerts.push(
          "⚠ Low Soil Moisture"
        );

      }

      if (newTemperature > 32) {

        newAlerts.push(
          "🌡 High Temperature"
        );

      }

      if (newHealth < 75) {

        newAlerts.push(
          "🍂 Crop Health Risk"
        );

      }

      setAlerts(newAlerts);

    }, 900000);

    return () =>
      clearInterval(interval);

  }, [started, crop]);

  const diseaseRisks = started
    ? assessDiseaseRisk(crop, temperature, humidity, moisture, health)
    : [];

  const startMonitoring = () => {

    if (
      crop === "" ||
      soilType === "" ||
      irrigation === "" ||
      location === ""
    ) {

      alert(
        "Please fill all details"
      );

      return;

    }

    localStorage.setItem(

      "cropData",

      JSON.stringify({

        crop,
        soilType,
        irrigation,
        location

      })

    );

    localStorage.setItem(
      "farmerData",
      JSON.stringify({ location })
    );

    setStarted(true);

  };

  const resetMonitoring = () => {

    localStorage.removeItem(
      "cropData"
    );
    localStorage.removeItem(
      "farmerData"
    );

    setStarted(false);

    setCrop("");

    setSoilType("");

    setIrrigation("");

    setLocation("");

  };

  if (!started) {

    return (

      <div className="container">

        <div className="crop-monitor-form">

          <h1>

            Crop Monitoring

          </h1>

          {/* LOCATION */}

          <label>

            Location

          </label>

          <input
            type="text"
            placeholder="Enter Location"
            value={location}
            onChange={(e) =>
              setLocation(
                e.target.value
              )
            }
          />

          {/* CROP */}

          <label>

            Select Crop

          </label>

          <select
            value={crop}
            onChange={(e) =>
              setCrop(
                e.target.value
              )
            }
          >

            <option value="">
              Select Crop
            </option>

            <option value="Rice">
              Rice
            </option>

            <option value="Wheat">
              Wheat
            </option>

            <option value="Maize">
              Maize
            </option>

            <option value="Cotton">
              Cotton
            </option>

            <option value="Sugarcane">
              Sugarcane
            </option>

            <option value="Groundnut">
              Groundnut
            </option>

            <option value="Soybean">
              Soybean
            </option>

            <option value="Sunflower">
              Sunflower
            </option>

            <option value="Mustard">
              Mustard
            </option>

            <option value="Barley">
              Barley
            </option>

            <option value="Millets">
              Millets
            </option>

            <option value="Sorghum">
              Sorghum
            </option>

            <option value="Pulses">
              Pulses
            </option>

            <option value="Tomato">
              Tomato
            </option>

            <option value="Potato">
              Potato
            </option>

            <option value="Onion">
              Onion
            </option>

            <option value="Chilli">
              Chilli
            </option>

            <option value="Brinjal">
              Brinjal
            </option>

            <option value="Carrot">
              Carrot
            </option>

            <option value="Cabbage">
              Cabbage
            </option>

            <option value="Cauliflower">
              Cauliflower
            </option>

            <option value="Beans">
              Beans
            </option>

            <option value="Peas">
              Peas
            </option>

            <option value="Cucumber">
              Cucumber
            </option>

            <option value="Pumpkin">
              Pumpkin
            </option>

            <option value="Bottle Gourd">
              Bottle Gourd
            </option>

            <option value="Bitter Gourd">
              Bitter Gourd
            </option>

            <option value="Spinach">
              Spinach
            </option>

            <option value="Mango">
              Mango
            </option>

            <option value="Banana">
              Banana
            </option>

            <option value="Apple">
              Apple
            </option>

            <option value="Orange">
              Orange
            </option>

            <option value="Papaya">
              Papaya
            </option>

            <option value="Grapes">
              Grapes
            </option>

            <option value="Pomegranate">
              Pomegranate
            </option>

            <option value="Coconut">
              Coconut
            </option>

            <option value="Coffee">
              Coffee
            </option>

            <option value="Tea">
              Tea
            </option>

            <option value="Rubber">
              Rubber
            </option>

            <option value="Tobacco">
              Tobacco
            </option>

            <option value="Jute">
              Jute
            </option>

          </select>

          {/* SOIL */}

          <label>

            Soil Type

          </label>

          <select
            value={soilType}
            onChange={(e) =>
              setSoilType(
                e.target.value
              )
            }
          >

            <option value="">
              Select Soil
            </option>

            <option value="Sandy">
              Sandy
            </option>

            <option value="Clay">
              Clay
            </option>

            <option value="Loamy">
              Loamy
            </option>

            <option value="Black Soil">
              Black Soil
            </option>

            <option value="Red Soil">
              Red Soil
            </option>

            <option value="Alluvial Soil">
              Alluvial Soil
            </option>

            <option value="Silty Soil">
              Silty Soil
            </option>

            <option value="Peaty Soil">
              Peaty Soil
            </option>

            <option value="Chalky Soil">
              Chalky Soil
            </option>

          </select>

          {/* IRRIGATION */}

          <label>

            Irrigation

          </label>

          <select
            value={irrigation}
            onChange={(e) =>
              setIrrigation(
                e.target.value
              )
            }
          >

            <option value="">
              Select Irrigation
            </option>

            <option value="Drip">
              Drip Irrigation
            </option>

            <option value="Sprinkler">
              Sprinkler Irrigation
            </option>

            <option value="Surface">
              Surface Irrigation
            </option>

            <option value="Furrow">
              Furrow Irrigation
            </option>

            <option value="Basin">
              Basin Irrigation
            </option>

            <option value="Manual">
              Manual Irrigation
            </option>

            <option value="Subsurface">
              Subsurface Irrigation
            </option>

            <option value="Center Pivot">
              Center Pivot Irrigation
            </option>

          </select>

          <button
            className="report-btn"
            onClick={
              startMonitoring
            }
          >

            Start Monitoring

          </button>

        </div>

      </div>

    );

  }

  return (

    <div className="container">

      <h1 className="page-title">

        Smart Crop Monitoring

      </h1>

      <div className="crop-monitor-report">

        <h2>

          Crop Analysis

        </h2>

        <p>

          <strong>
            Location:
          </strong>

          {" "}

          {location}

        </p>

        <p>

          <strong>
            Weather:
          </strong>

          {" "}

          {weatherLoading ? "Loading..." : weatherCondition}

        </p>

        <p>

          <strong>
            Soil Type:
          </strong>

          {" "}

          {soilType}

        </p>

        <p>

          <strong>
            Irrigation:
          </strong>

          {" "}

          {irrigation}

        </p>

        <p>

          <strong>
            Status:
          </strong>

          {" "}

          {health > 80
            ? "Healthy"
            : "Moderate Risk"}

        </p>

      </div>

      <div className="weather-grid">

        <div className="weather-box">

          <h3>
            Crop
          </h3>

          <p>
            {crop}
          </p>

        </div>

        <div className="weather-box">

          <h3>
            Moisture
          </h3>

          <p>
            {moisture}%
          </p>

        </div>

        <div className="weather-box">

          <h3>
            Temperature
          </h3>

          <p>
            {temperature}°C
          </p>

        </div>

        <div className="weather-box">

          <h3>
            Humidity
          </h3>

          <p>
            {humidity}%
          </p>

        </div>

        <div className="weather-box">

          <h3>
            Crop Health
          </h3>

          <p>
            {health}%
          </p>

        </div>

      </div>

      {alerts.length > 0 && (

        <div className="alerts-box">

          <h2>

            Alerts

          </h2>

          {alerts.map(
            (alert, index) => (

              <div
                className="alert-card"
                key={index}
              >

                {alert}

              </div>

            )
          )}

        </div>

      )}

      {diseaseRisks.length > 0 && (

        <div className="alerts-box">

          <h2>

            Crop Disease Risk

          </h2>

          {diseaseRisks.map(
            (risk, index) => (

              <div
                className="alert-card"
                key={index}
              >

                {risk}

              </div>

            )
          )}

        </div>

      )}

      <button
        className="report-btn"
        onClick={resetMonitoring}
      >

        Reset Monitoring

      </button>

    </div>

  );

}

export default Monitor;