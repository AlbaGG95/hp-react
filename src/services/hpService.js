import axios from "axios";

const hpClient = axios.create({
  baseURL: "https://hp-api.onrender.com",
  timeout: 10000,
  headers: { Accept: "application/json" },
});

export async function getCharacters() {
  try {
    const response = await hpClient.get("/api/characters");
    return response.data;
  } catch (error) {
    const reason = error.response?.status
      ? `${error.response.status} ${error.response.statusText}`
      : error.message;
    throw new Error(`getCharacters: failed to fetch characters (${reason})`);
  }
}
