import axios from "axios";

const API = axios.create({
  baseURL: "https://interview-management-system-server.vercel.app",
});

export default API;
