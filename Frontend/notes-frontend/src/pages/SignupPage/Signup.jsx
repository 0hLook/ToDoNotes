import React, { useState } from "react";
import LSheader from "../../components/LoginSignUpHeader";
import UserPasswordInput from "../../components/Inputs/UserPasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../other/Helper";
import axiosInstance from "../../other/axiosInstance";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [signUpError, setSignUpError] = useState(null);

  const navigate = useNavigate();

  const signUpHandler = async (e) => {
    e.preventDefault();

    if (!username) {
      setSignUpError("Please enter your username.");
      return;
    }

    if (!validateEmail(userEmail)) {
      setSignUpError("Please enter a valid email address.");
      return;
    }

    if (!userPassword) {
      setSignUpError("Please enter a password");
      return;
    }

    setSignUpError("")

    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: username,
        email: userEmail,
        password: userPassword,
      });

      if (response.data && response.data.error) {
        setSignUpError(response.data.message)
        return
      }

      if(response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken)
        navigate('/dashboard')
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setSignUpError(error.response.data.message);
      } else {
        setSignUpError("An unexpected error has occured.");
      }
    }


  };

  return (
    <>
      <LSheader/>

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={signUpHandler}>
            <h4 className="text-2xl mb-7 font-bold text-center">Sign Up</h4>

            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

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

            {signUpError && <p className="text-red-500 font-bold text-xs pb-1">{signUpError}</p>} 

            <button type="submit" className="btn-primary">
              Create Account
            </button>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/" className="font-medium text-primary underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;