import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { verify } from "../services/api";
axios.defaults.withCredentials = true;

const Verify = () => {
  const [formData, setFormData] = useState({
    verificationCode: '' 
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await verify(formData.verificationCode);
    setSuccessMessage(response.data.message);
    navigate('/login');
  } catch (error) {
    setError('Invalid verification code or username');
  }
};

  return (
    <div className="auth-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-4xl font-extrabold text-white mb-2">
          Verify Your Account
        </h1>
        <p className="text-center text-gray-200 text-lg">
          Enter the verification code sent to your email
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="glass-effect py-8 px-4 sm:rounded-2xl sm:px-10">
          {error && <p className="text-red-500 text-center">{error}</p>}
          {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-1">
                Verification Code
              </label>
              <input
                id="verificationCode"
                name="verificationCode"
                type="text"
                value={formData.verificationCode}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter your verification code"
                required
              />
            </div>

            <div>
              <button type="submit" className="btn-primary">
                Verify Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Verify;
