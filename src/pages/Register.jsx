import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { register } from "../services/api";
axios.defaults.withCredentials = true;

const GOOGLE_CLIENT_ID =
  "405668006274-ivm51v61il5pu2iu7rkitss3psh625lk.apps.googleusercontent.com";
const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/verify");
    } catch (error) {
      if (error.response?.data?.errors) {
        const backendErrors = error.response.data.errors;
        let newErrors = {};

        Object.keys(backendErrors).forEach((key) => {
          newErrors[key.charAt(0).toLowerCase() + key.slice(1)] = (
            <ul className="list-disc pl-5 text-red-500">
              {backendErrors[key].map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </ul>
          );
        });
        
        setErrors(newErrors);
      } else {
        let newErrors = {};
        if (error.response?.data) {
          if (typeof error.response.data === "string") {
            newErrors.general = error.response.data;
          } else if (error.response.data.errors) {
            const backendErrors = error.response.data.errors;
            newErrors.general = Object.values(backendErrors).flat()[0];
          }
        } else {
          newErrors.general = "Registration failed. Please try again";
        }
        setErrors(newErrors);
      }
    }
  };

  const handleGoogleSuccess = async (response) => {
    const googleToken = response.credential;

    try {
      const res = await axios.post(
        "vfstyle-fcb8d4e2b9b9g9hy.southeastasia-01.azurewebsites.net/api/auth/register/google",
        { token: googleToken }
      );

      localStorage.setItem("token", res.data.token);
      const decodedToken = JSON.parse(atob(res.data.token.split(".")[1]));
      const userRole = decodedToken.Role;

      if (userRole === "Customer") {
        navigate("/profile");
      } else if (userRole === "Admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
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
        newErrors.general = "Google registration failed. Please try again.";
      }
      setErrors(newErrors);
    }
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="auth-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h1 className="text-center text-4xl font-extrabold text-white mb-2">
            Đăng ký tài khoản
          </h1>
          <p className="text-center text-gray-200 text-lg">
          Hãy tham gia cùng chúng tôi và bắt đầu hành trình của bạn
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="glass-effect py-8 px-4 sm:rounded-2xl sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {errors.general && (
                <p className="text-red-500 text-center mt-2">
                  {errors.general}
                </p>
              )}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Tên đăng nhập
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  autoComplete="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Nhập tên người dùng của bạn"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">{errors.username}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Họ và tên
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Họ và tên của bạn"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Địa chỉ email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Nhập email của bạn"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mật khẩu
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  minLength={8}
                  className="input-field"
                  placeholder="Nhập mật khẩu"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Xác nhận mật khẩu
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Nhập xác nhận mật khẩu"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div>
                <button type="submit" className="btn-primary">
                  Tạo tài khoản
                </button>
              </div>
            </form>

            <div className="auth-divider">
              <span className="auth-divider-text">Hoặc tiếp tục với</span>
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                text="signup_with"
                onSuccess={handleGoogleSuccess}
                onError={() => setError("Google registration failed.")}
              />
            </div>

            <p className="mt-8 text-center text-sm text-gray-600">
              Bạn đã có tài khoản?{" "}
              <Link
                to="/login"
                className="font-medium text-purple-600 hover:text-purple-500 transition duration-150 ease-in-out"
              >
                Đăng nhập tại đây
              </Link>
            </p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Register;
