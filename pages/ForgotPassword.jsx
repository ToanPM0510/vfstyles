import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await forgotPassword(email);
      navigate("/login");
    } catch (error) {
      let newErrors = {};
      if (error.response?.data) {
        if (typeof error.response.data === "string") {
          newErrors.general = error.response.data;
        } else if (error.response.data.errors) {
          const backendErrors = error.response.data.errors;
          newErrors.general = Object.values(backendErrors).flat()[0];
        }
      } else {
        newErrors.general = "Failed to send reset email.";
      }
      setErrors(newErrors);
    }
  };

  return (
    <div className="auth-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-4xl font-extrabold text-white mb-2">
          Forgot Password?
        </h1>
        <p className="text-center text-gray-200 text-lg">
          Enter your email to reset your password
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="glass-effect py-8 px-4 sm:rounded-2xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {errors.general && (
              <p className="text-red-500 text-center mt-2">{errors.general}</p>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <button type="submit" className="btn-primary">
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
