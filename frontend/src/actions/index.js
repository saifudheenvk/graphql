import axios from "axios";
import { baseUrl } from "../constants";
export default axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: {
      toString() {
        return localStorage.getItem("userCredentials");
      },
    },
  },
  baseURL: baseUrl,
});
