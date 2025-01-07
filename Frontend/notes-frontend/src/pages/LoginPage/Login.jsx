import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import { Link } from "react-router-dom";
import UserPasswordInput from "../../components/Inputs/UserPasswordInput";
import { validateEmail } from "../../other/Helper";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = "This email is invalid.";
    }

    if (!formData.password) {
      newErrors.password = "This password is invalid.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Proceed with login logic
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <NavBar />

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={loginHandler}>
            <h4 className="text-2xl mb-7 font-bold text-center">Login</h4>

            {/* Email Input */}
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="input-box"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 font-bold text-xs pb-3 -mt-3.5">
                {errors.email}
              </p>
            )}

            {/* Password Input */}
            <UserPasswordInput
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 font-bold text-xs pb-3 -mt-2.5">
                {errors.password}
              </p>
            )}

            {/* Submit Button */}
            <button type="submit" className="btn-primary">
              Login
            </button>

            {/* Signup Link */}
            <p className="text-sm text-center mt-4">
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
