// Axios instance for backend communication
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000"
});
