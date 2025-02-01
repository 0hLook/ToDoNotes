import React, { useState } from "react";
import LSheader from "../../components/LoginSignUpHeader";
import { Link, useNavigate } from "react-router-dom";
import UserPasswordInput from "../../components/Inputs/UserPasswordInput";
import { validateEmail } from "../../other/Helper";
import axiosInstance from "../../other/axiosInstance";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!validateEmail(userEmail)) {
      setLoginError("This email is invalid.");
      return;
    }

    if (!userPassword) {
      setLoginError("This password is invalid.");
      return;
    }

    setLoginError("");

    try {
      const response = await axiosInstance.post("/login", {
        email: userEmail,
        password: userPassword,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setLoginError(error.response.data.message);
      } else {
        setLoginError("An unexpected error has occured.");
      }
    }
  };

  return (
    <>
    <LSheader/>

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={loginHandler}>
            <h4 className="text-2xl mb-7 font-bold text-center">Login</h4>
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />

            <UserPasswordInput
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />

            {loginError && (
              <p className="text-red-500 font-bold text-xs pb-1">
                {loginError}
              </p>
            )}

            <button type="submit" className="btn-primary">
              Login
            </button>

            <p className="text-sm text-centre mt-4">
              Not registered yet?{" "}
              <Link to="/signup" className="font-medium text-primary underline">
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
