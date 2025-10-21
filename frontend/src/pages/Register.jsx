import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [data, setData] = useState({ username: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username: data.username,
        password: data.password,
      });
      login(res.data, res.data.token); // ✅ pass res.data as user
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Username already exists.");
    }
  };

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-8 w-full max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-indigo-600 mb-6">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="👤 Enter your username"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none text-gray-800 placeholder-gray-500"
            required
          />
          <input
            type="password"
            placeholder="🔒 Create password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none text-gray-800 placeholder-gray-500"
            required
          />
          <input
            type="password"
            placeholder="🔒 Confirm password"
            value={data.confirmPassword}
            onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none text-gray-800 placeholder-gray-500"
            required
          />
          <button className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition">
            Sign Up
          </button>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
