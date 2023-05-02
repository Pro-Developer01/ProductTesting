import React from "react";
import "./LoginPage.css";
import { Link } from "react-router-dom";

const LoginPage = ({ content }) => {
  const { heading, page, alternate } = content;
  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic here
  };

  return (
    <div className="login-page">
      <div className="logo-section">
        <img src={require("../../../Assets/LogoHalf.png")} alt="Logo" />
        <h1>DeepRead.com</h1>
        <h2>Leverage your reading</h2>
      </div>
      <div className="login-form-section">
        <div className="login-form">
          <div className="container-login">
            <span className="Sub-heading">{heading}</span>
            <span className="xtra-small">
              <Link to={`${page === "signUp" ? "/login" : "/register"}`}>
                {alternate}
              </Link>{" "}
              Instead
            </span>
          </div>
          <div>
            <form onSubmit={handleLogin}>
              <div className="form-inputs">
                <label>
                  {" "}
                  <span className="bold">Email</span> or{" "}
                  <span className="bold">Username</span>
                </label>
                <input type="text" placeholder="Enter your email" required />
                {page === "signUp" && (
                  <>
                    <label>
                      <span className="bold">Username</span>
                    </label>
                    <input type="text" placeholder="Enter username" required />
                  </>
                )}

                <label
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span className="bold">Password</span>{" "}
                  <span className="xtra-small">show</span>{" "}
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="form-footer">
                <div className="stay-signed-in">
                  <div>
                    <input type="checkbox" id="stay-signed-in" />
                    <label htmlFor="stay-signed-in">Stay signed in</label>
                  </div>
                  <p className="forgot-password xtra-small">
                    <a href="/ForgotPassword">Forgot your Password ? </a>
                  </p>
                </div>

                <button type="submit">
                  {" "}
                  <strong>Sign In</strong>{" "}
                </button>
                <p className="small-text">
                  By continuing, you agree to DeepRead’s{" "}
                  <a href="https://app.websitepolicies.com/policies/view/AhYljQDq">
                    Conditions of Use
                  </a>{" "}
                  and{" "}
                  <a href="https://www.freeprivacypolicy.com/live/0d4d6979-267f-4f0e-9806-b2901ea39f65">
                    Privacy Notice
                  </a>
                  .
                </p>
              </div>
            </form>
            <div
              style={{ marginTop: page !== "signUp" ? "80px" : "25px" }}
              className="form-buttons"
            >
              <button className="create-account-button">
                <strong>Go to Demo App</strong> (no Sign in required)
              </button>

              <div className="login-seperator">
                <hr />
                <span style={{ margin: "0 10px" }}> or </span>
                <hr />
              </div>

              <div className="third-party-login">
                <button className="google-login-button">
                  <strong>Sign in with Google </strong>
                </button>
                <button className="amazon-login-button">
                  <strong>Sign in with Amazon</strong>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
