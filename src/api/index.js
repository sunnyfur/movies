import axios from "axios";
const api = axios.create({
  baseURL: "https://kinopoiskapiunofficial.tech/",
  headers: {
    "X-API-KEY": "0b143bae-3b84-4c07-8f03-1a3703964c9a", // "0a669211-69b4-4b18-a5cd-23cea3492187", // "0b143bae-3b84-4c07-8f03-1a3703964c9a" ,
    accept: "application/json",
  },
});

export default api;
