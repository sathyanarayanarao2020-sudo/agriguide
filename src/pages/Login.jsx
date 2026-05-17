import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] =
    useState(() => {
      if (typeof window === "undefined") {
        return "";
      }
      return (
        localStorage.getItem("rememberedEmail") || ""
      );
    });

  const [password, setPassword] =
    useState("");

  const [rememberMe, setRememberMe] =
    useState(() => {
      if (typeof window === "undefined") {
        return false;
      }
      return Boolean(
        localStorage.getItem("rememberedEmail")
      );
    });

  const [showPassword, setShowPassword] =
    useState(false);

  const [emailError, setEmailError] =
    useState("");
  const [passwordError, setPasswordError] =
    useState("");
  const [loginError, setLoginError] =
    useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setLoginError("");

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setEmailError(
        "Please enter a valid email address."
      );
      return;
    }

    if (password.length < 6) {
      setPasswordError(
        "Password must be at least 6 characters."
      );
      return;
    }

    const storedUser = localStorage.getItem(
      "registerUser"
    );

    if (!storedUser) {
      setLoginError(
        "No account found. Please register first."
      );
      return;
    }

    const user = JSON.parse(storedUser);

    if (email !== user.email || password !== user.password) {
      setLoginError(
        "Invalid email or password."
      );
      return;
    }

    if (rememberMe) {
      localStorage.setItem(
        "rememberedEmail",
        email
      );
    } else {
      localStorage.removeItem(
        "rememberedEmail"
      );
    }

    localStorage.setItem(
      "userEmail",
      email
    );

    navigate("/farmer-details");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>AGRI GUIDE Login</h1>

        <form onSubmit={handleLogin}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />
          {emailError && (
            <span className="field-error">
              {emailError}
            </span>
          )}

          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />
          {passwordError && (
            <span className="field-error">
              {passwordError}
            </span>
          )}

          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() =>
                  setRememberMe(
                    (prev) => !prev
                  )
                }
              />
              Remember me
            </label>
            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowPassword(
                  (prev) => !prev
                )
              }
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button type="submit">Login</button>

          {loginError && (
            <span className="field-error">
              {loginError}
            </span>
          )}
        </form>

        <p className="meta-text">
          Don't have an account? <Link to="/register">Register here</Link>.
        </p>
      </div>
    </div>
  );
}

export default Login;