import axios from "axios";

const api = axios.create({
  baseURL: "https://breezetravel-backend.onrender.com/api",
  withCredentials: true,
});

export { api };
