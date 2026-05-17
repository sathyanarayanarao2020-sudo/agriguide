import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

function IrrigationDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [method, setMethod] = useState(null);

  useEffect(() => {

    fetch("/irrigationData.json")

      .then((res) => res.json())

      .then((data) => {

        const selectedMethod = data.find(

          (item) =>

            String(item.id) === String(id)

        );

        setMethod(selectedMethod);

      })

      .catch((error) => {

        console.log(error);

      });

  }, [id]);

  if (!method) {

    return (

      <div className="container">

        <h1>
          Loading...
        </h1>

      </div>

    );

  }

  const advantages = Array.isArray(method.advantages)
    ? method.advantages
    : String(method.advantages || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

  const disadvantages = Array.isArray(method.disadvantages)
    ? method.disadvantages
    : String(method.disadvantages || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

  const suitableCrops = Array.isArray(method.suitableCrops)
    ? method.suitableCrops
    : String(method.suitable || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

  return (

    <div className="container">

      <div className="irrigation-details">

        <button
          className="back-btn"
          onClick={() => navigate("/irrigation")}
        >

          ← Back

        </button>

        <img
          src={method.image}
          alt={method.title}
        />

        <h1>
          {method.title}
        </h1>

        <p>

          <strong>

            What is {method.title}?

          </strong>

        </p>

        <p>
          {method.meaning}
        </p>

        <h2>
          Description
        </h2>

        <p>
          {method.description}
        </p>

        <h2>
          Advantages
        </h2>

        <ul>

          {advantages.map((item, index) => (

            <li key={index}>
              {item}
            </li>

          ))}

        </ul>

        <h2>
          Disadvantages
        </h2>

        <ul>

          {disadvantages.map((item, index) => (

            <li key={index}>
              {item}
            </li>

          ))}

        </ul>

        <h2>
          Suitable Crops
        </h2>

        <p>

          {suitableCrops.join(", ")}

        </p>

      </div>

    </div>

  );

}

export default IrrigationDetails;