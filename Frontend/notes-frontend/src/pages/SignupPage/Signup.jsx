import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import UserPasswordInput from "../../components/Inputs/UserPasswordInput";
import { Link } from "react-router-dom";
import { validateEmail } from "../../other/Helper";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
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

    if (!formData.username) {
      newErrors.username = "Please enter your username.";
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Please enter a password.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const signUpHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // For testing later
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <NavBar />

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={signUpHandler}>
            <h4 className="text-2xl mb-7 font-bold text-center">Sign Up</h4>

            {/* Username Input */}
            <input
              type="text"
              name="username"
              placeholder="Name"
              className="input-box"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && (
              <p className="text-red-500 font-bold text-xs pb-3 -mt-3.5">
                {errors.username}
              </p>
            )}

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
              Create Account
            </button>

            {/* Login Link */}
            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary underline">
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
