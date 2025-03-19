import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { login, loginGoogle } from "../services/api";

const GOOGLE_CLIENT_ID =
  "405668006274-ivm51v61il5pu2iu7rkitss3psh625lk.apps.googleusercontent.com";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
    const rememberMe = localStorage.getItem("rememberMe") === "true";

    if (rememberMe) {
      setFormData({
        username: storedUsername || "",
        password: storedPassword || "",
        rememberMe: true,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(
        {
          username: formData.username,
          password: formData.password,
        }
      );

      if (formData.rememberMe) {
        localStorage.setItem("username", formData.username);
        localStorage.setItem("password", formData.password);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        localStorage.setItem("rememberMe", "false");
        sessionStorage.setItem("token", response.data.token);
      }
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.account.role);
      const decodedToken = JSON.parse(atob(response.data.token.split(".")[1]));
      const userRole = decodedToken.Role;

      if (userRole === "Customer") {
        navigate("/");
      } else if (userRole === "Admin") {
        navigate("/");
      } else {
        navigate("/");
      }
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
          newErrors.general = "Login failed. Please try again.";
        }
        setErrors(newErrors);
      }
    }
  };

  const handleGoogleSuccess = async (response) => {
    const googleToken = response.credential;

    try {
      const res = await loginGoogle({ token: googleToken });
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
            Chào mừng bạn đã trở lại
          </h1>
          <p className="text-center text-gray-200 text-lg">
          Đăng nhập để tiếp tục hành trình của bạn
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
                  Tên người dùng
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter your username"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">{errors.username}</p>
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
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded transition duration-150 ease-in-out"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Nhớ mật khẩu
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-purple-600 hover:text-purple-500 transition duration-150 ease-in-out"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
              </div>

              <div>
                <button type="submit" className="btn-primary">
                  Đăng nhập
                </button>
              </div>
            </form>

            <div className="auth-divider">
              <span className="auth-divider-text">Hoặc tiếp tục với</span>
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError("Google login failed")}
              />
            </div>

            <p className="mt-8 text-center text-sm text-gray-600">
              Bạn chưa có tài khoản{" "}
              <Link
                to="/register"
                className="font-medium text-purple-600 hover:text-purple-500 transition duration-150 ease-in-out"
              >
                Đăng ký tài khoản
              </Link>
            </p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
