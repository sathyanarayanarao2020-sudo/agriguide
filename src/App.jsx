import {

  BrowserRouter,

  Routes,

  Route,

  Navigate

} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";

import Crops from "./pages/Crops";

import Irrigation from "./pages/Irrigation";

import IrrigationDetails from "./pages/IrrigationDetails";

import Monitor from "./pages/Monitor";

import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FarmerDetails from "./pages/FarmerDetails";

function ProtectedRoute({

  children

}) {

  const user =

    localStorage.getItem(
      "userEmail"
    );

  return user

    ? children

    : <Navigate to="/login" />;

}

function App() {

  return (

    <BrowserRouter>

      {/* NAVBAR */}

      <Navbar />

      <Routes>

        {/* LOGIN */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* FARMER DETAILS */}

        <Route
          path="/farmer-details"
          element={

            <ProtectedRoute>

              <FarmerDetails />

            </ProtectedRoute>

          }
        />

        {/* REGISTER */}

        <Route
          path="/register"
          element={<Register />}
        />

        {/* HOME */}

        <Route
          path="/"
          element={

            <ProtectedRoute>

              <Home />

            </ProtectedRoute>

          }
        />

        {/* CROPS */}

        <Route
          path="/crops"
          element={

            <ProtectedRoute>

              <Crops />

            </ProtectedRoute>

          }
        />

        {/* IRRIGATION */}

        <Route
          path="/irrigation"
          element={

            <ProtectedRoute>

              <Irrigation />

            </ProtectedRoute>

          }
        />

        <Route
          path="/irrigation/:id"
          element={

            <ProtectedRoute>

              <IrrigationDetails />

            </ProtectedRoute>

          }
        />

        {/* MONITOR */}

        <Route
          path="/monitor"
          element={

            <ProtectedRoute>

              <Monitor />

            </ProtectedRoute>

          }
        />

        {/* ABOUT */}

        <Route
          path="/about"
          element={

            <ProtectedRoute>

              <About />

            </ProtectedRoute>

          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;