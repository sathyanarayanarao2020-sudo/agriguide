import { useEffect, useState } from "react";

function SoilCard() {

  const [soil, setSoil] = useState(null);

  useEffect(() => {

    fetch(
      "http://api.agromonitoring.com/agro/1.0/soil?lat=17.3850&lon=78.4867&appid=0d0255712b3f8ccd256e57dcf97371d0"
    )
      .then((res) => res.json())
      .then((data) => setSoil(data))
      .catch(() => {
        setSoil({
          t0: 293.15,
          moisture: "N/A",
          error: true,
        });
      });

  }, []);

  return (

    <div className="soil-card">

      <h2>
        Soil Information
      </h2>

      {soil && (

        <div className="soil-details">

          {soil.error ? (
            <p>
              Soil information is not available at the moment.
            </p>
          ) : (
            <>
              <p>
                🌡 Soil Temperature :
                {(soil.t0 - 273.15).toFixed(2)} °C
              </p>

              <p>
                💧 Moisture :
                {soil.moisture}
              </p>
            </>
          )}

        </div>

      )}

    </div>

  );
}

export default SoilCard;