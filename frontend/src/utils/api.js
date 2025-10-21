import axios from "axios";

const API_BASE = "https://chatterbox-9tlu.onrender.com/api";

const getConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json", // <-- ensure JSON is parsed
  },
});

export const getUsers = async (token) => {
  if (!token) {
    console.error("No token provided to getUsers!");
    return [];
  }
  try {
    const res = await axios.get(`${API_BASE}/auth/users`, getConfig(token));
    return res.data || [];
  } catch (err) {
    console.error("getUsers error:", err.response?.data || err.message);
    return [];
  }
};

export const getMessages = async (roomId, token) => {
  if (!token) {
    console.error("No token provided to getMessages!");
    return [];
  }
  try {
    const res = await axios.get(`${API_BASE}/messages/${roomId}`, getConfig(token));
    return res.data || [];
  } catch (err) {
    console.error("getMessages error:", err.response?.data || err.message);
    return [];
  }
};

export const sendMessage = async (msgData, token) => {
  if (!token) {
    console.error("No token provided to sendMessage!");
    return null;
  }
  try {
    const res = await axios.post(`${API_BASE}/messages`, msgData, getConfig(token));
    return res.data || null;
  } catch (err) {
    console.error("sendMessage error:", err.response?.data || err.message);
    return null;
  }
};
