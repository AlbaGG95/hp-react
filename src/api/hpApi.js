import axios from "axios";

const hpApi = axios.create({
  baseURL: "https://hp-api.onrender.com",
  timeout: 10000,
  headers: { Accept: "application/json" },
});

export default hpApi;
