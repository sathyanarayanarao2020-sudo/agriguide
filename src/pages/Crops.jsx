import { useEffect, useState } from "react";

import CropCard from "../components/CropCard";

function Crops() {

  const [crops, setCrops] = useState([]);

  const [soil, setSoil] = useState("");

  const [farmType, setFarmType] = useState("");

  const [irrigation, setIrrigation] = useState("");

  useEffect(() => {

    fetch(import.meta.env.BASE_URL + "cropData.json")

      .then((res) => res.json())

      .then((data) => setCrops(data));

  }, []);

  const filteredCrops = crops.filter((crop) => {

    let score = 0;

    if (
      crop.soil.includes(soil)
    ) {
      score++;
    }

    if (
      crop.irrigation.includes(irrigation)
    ) {
      score++;
    }

    if (
      crop.farmType.includes(farmType)
    ) {
      score++;
    }

    return score >= 2;

  });

  const showRecommendations =

    soil !== "" &&
    irrigation !== "" &&
    farmType !== "";

  return (

    <div className="container">

      <h1 className="page-title">
        Smart Crop Recommendation
      </h1>

      <div className="filter-box">

        <div className="filter-group">

          <label>
            Farm Type
          </label>

          <select
            value={farmType}
            onChange={(e) =>
              setFarmType(e.target.value)
            }
          >

            <option value="">
              Select Farm Type
            </option>

            <option>
              Small Scale Farming
            </option>

            <option>
              Large Scale Farming
            </option>

          </select>

        </div>

        <div className="filter-group">

          <label>
            Soil Type
          </label>

          <select
            value={soil}
            onChange={(e) =>
              setSoil(e.target.value)
            }
          >

            <option value="">
              Select Soil Type
            </option>

            <option>
              Clay Soil
            </option>

            <option>
              Loamy Soil
            </option>

            <option>
              Black Soil
            </option>

            <option>
              Sandy Soil
            </option>

            <option>
              Rich Soil
            </option>

            <option>
              Dry Soil
            </option>

            <option>
              Acidic Soil
            </option>

          </select>

        </div>

        <div className="filter-group">

          <label>
            Irrigation Method
          </label>

          <select
            value={irrigation}
            onChange={(e) =>
              setIrrigation(e.target.value)
            }
          >

            <option value="">
              Select Irrigation Method
            </option>

            <option>
              Drip Irrigation
            </option>

            <option>
              Sprinkler Irrigation
            </option>

            <option>
              Flood Irrigation
            </option>

            <option>
              Canal Irrigation
            </option>

            <option>
              Furrow Irrigation
            </option>

            <option>
              Basin Irrigation
            </option>

            <option>
              Center Pivot Irrigation
            </option>

            <option>
              Manual Irrigation
            </option>

            <option>
              Subsurface Irrigation
            </option>

            <option>
              Surface Irrigation
            </option>

          </select>

        </div>

      </div>

      {showRecommendations && (

        <div className="grid">

          {filteredCrops.length > 0 ? (

            filteredCrops.map((crop) => (

              <CropCard
                key={crop.id}
                crop={crop}
              />

            ))

          ) : (

            crops
              .slice(0, 4)
              .map((crop) => (

                <CropCard
                  key={crop.id}
                  crop={crop}
                />

              ))

          )}

        </div>

      )}

    </div>

  );
}

export default Crops;