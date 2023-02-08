import axios from "axios";
const api = axios.create({
  baseURL: "https://kinopoiskapiunofficial.tech/api/v2.2/",
  headers: {
    "X-API-KEY": "0a669211-69b4-4b18-a5cd-23cea3492187",
    "Content-Type": "application/json",
  },
});
export default api;
