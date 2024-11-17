import { useState } from "react";
import DEVELOPER_IMAGE from "../assets/images/developer_image.jpg";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post(
        BASE_URL + "login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(result.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!");
    }
  };

  return (
    <div className="flex items-start justify-center h-0 bg-gray-900">
      <div className="flex flex-wrap w-full max-w-4xl bg-transparent rounded-lg shadow-md relative top-28">
        {/* Left Section */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-indigo-600 rounded-l-lg">
          <img
            src={DEVELOPER_IMAGE}
            alt="Developer"
            className="w-full h-full object-full rounded-l-lg"
          />
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-8 space-y-8  border border-gray-600 rounded-r-lg">
          <h2 className="text-3xl font-bold text-center text-white">
            Welcome Back, Developer!
          </h2>
          <p className="text-center text-white">
            Log in to connect and grow together
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="border border-gray-300 relative h-12 rounded-lg">
              <input
                className="text-white bg-transparent outline-none border-none w-full px-4 py-4 focus:border-blue-500 transition-all peer"
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder=" "
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label
                htmlFor="email"
                className="block text-sm font-medium absolute left-4 top-2 transition-all transform -translate-y-1/2 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
              >
                Email ID
              </label>
            </div>
            <div className="border border-gray-300 relative h-12 rounded-lg">
              <input
                className="text-white bg-transparent outline-none border-none w-full px-4 py-4 focus:border-blue-500 transition-all peer"
                type="password"
                id="password"
                name="password"
                value={password}
                placeholder=" "
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label
                htmlFor="password"
                className="block text-sm font-medium absolute left-4 top-2 transition-all transform -translate-y-1/2 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
              >
                Password
              </label>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="text-indigo-500 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-white">Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
            <p className="text-red-600">{error}</p>
            <button
              type="submit"
              className="w-full px-4 py-3 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign in
            </button>
          </form>

          <p className="text-sm text-center text-white">
            Don't have an account?
            <Link
              to="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {" "}
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
