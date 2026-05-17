import { useState } from "react";

function FarmerDetails() {

  const [name, setName] =
    useState("");

  const [age, setAge] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [farmerType, setFarmerType] =
    useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    if (

      name === "" ||

      age === "" ||

      location === "" ||

      farmerType === ""

    ) {

      alert(
        "Please fill all details"
      );

      return;

    }

    localStorage.setItem(

      "farmerInfo",

      JSON.stringify({

        name,
        age,
        location,
        farmerType

      })

    );

    window.location.href = "/";

  };

  return (

    <div className="login-container">

      <div className="login-box">

        <h1>

          Farmer Details

        </h1>

        <form onSubmit={handleSubmit}>

          <label>

            Farmer Name

          </label>

          <input
            type="text"
            placeholder="Enter Farmer Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />

          <label>

            Age

          </label>

          <input
            type="number"
            placeholder="Enter Age"
            value={age}
            onChange={(e) =>
              setAge(
                e.target.value
              )
            }
          />

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

          <label>

            Farmer Type

          </label>

          <select
            value={farmerType}
            onChange={(e) =>
              setFarmerType(
                e.target.value
              )
            }
          >

            <option value="">
              Select Farmer Type
            </option>

            <option value="Part Time Farmer">
              Part Time Farmer
            </option>

            <option value="Full Time Farmer">
              Full Time Farmer
            </option>

          </select>

          <button type="submit">

            Continue

          </button>

        </form>

      </div>

    </div>

  );

}

export default FarmerDetails;