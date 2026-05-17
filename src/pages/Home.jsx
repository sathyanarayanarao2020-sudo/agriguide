import { useNavigate } from "react-router-dom";
import SoilCard from "../components/SoilCard";
import Footer from "../components/Footer";

function Home() {
  const navigate = useNavigate();

  return (

    <div>

      <div className="hero">

        <div className="hero-content">

          <h1>
            AGRI GUIDE
          </h1>

          <p>
            Smart Agriculture Guidance System
            for Farmers
          </p>

          <button onClick={() => navigate('/crops')}>
            Smart Farming Dashboard
          </button>

        </div>

      </div>

      <div className="container">

        <h1 className="page-title">
          Smart Farming Dashboard
        </h1>

        <div className="grid">

          <div className="card">

            <h2>
              🌾 Crop Recommendation
            </h2>

            <p>

              Get suitable crop suggestions
              based on soil and irrigation methods.

            </p>

          </div>

          <div className="card">

            <h2>
              💧 Irrigation Methods
            </h2>

            <p>

              Learn smart irrigation techniques
              for better farming.

            </p>

          </div>

          <div className="card">

            <h2>
              🌱 Crop Monitoring
            </h2>

            <p>

              Monitor crop growth and identify
              crop diseases early.

            </p>

          </div>

        </div>

        <SoilCard />

        <div className="crop-monitor-section">

          <h1 className="page-title">
            Crop Monitoring
          </h1>

          <div className="grid">

            <div className="card">

              <h2>
                🌿 Crop Health
              </h2>

              <p>

                Monitor crop conditions and detect
                diseases early for better productivity.

              </p>

            </div>

            <div className="card">

              <h2>
                💧 Soil Moisture
              </h2>

              <p>

                Analyze soil moisture levels
                for better irrigation planning.

              </p>

            </div>

            <div className="card">

              <h2>
                🌾 Growth Monitoring
              </h2>

              <p>

                Track crop growth and improve
                agricultural productivity.

              </p>

            </div>

          </div>

          <div className="crop-monitor-report">

            <h2>
              Smart Crop Monitoring Report
            </h2>

            <p>

              Our monitoring system helps farmers
              detect crop diseases, improve soil quality
              and increase crop productivity using
              modern agriculture techniques.

            </p>

          </div>

        </div>

      </div>

      <Footer />

    </div>

  );
}

export default Home;