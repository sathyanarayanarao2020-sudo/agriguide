import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

function Irrigation() {

  const [methods, setMethods] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    fetch("/irrigationData.json")

      .then((res) => res.json())

      .then((data) => setMethods(data));

  }, []);

  return (

    <div className="container">

      <h1 className="page-title">
        Irrigation Methods
      </h1>

      <div className="grid">

        {methods.map((item) => (

          <div
            className="card"
            key={item.id}
          >

            <img
              src={item.image}
              alt={item.title}
            />

            <h2>
              {item.title}
            </h2>

            <p>
              {item.description}
            </p>

            <button

              onClick={() =>

                navigate(`/irrigation/${item.id}`)

              }

            >

              View Details

            </button>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Irrigation;