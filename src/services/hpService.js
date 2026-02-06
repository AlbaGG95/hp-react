import axios from "axios";

const hpClient = axios.create({
  baseURL: "https://hp-api.onrender.com",
  timeout: 10000,
  headers: { Accept: "application/json" },
});

function normalizeCharacter(rawCharacter) {
  const houseRaw = (
    rawCharacter.house ||
    rawCharacter.hogwartsHouse ||
    rawCharacter.houseName ||
    ""
  ).trim();
  const houseKey = houseRaw ? houseRaw.toLowerCase().trim() : "none";
  const houseLabel = houseRaw || "No house";

  return {
    ...rawCharacter,
    house: houseLabel,
    houseKey,
  };
}

export async function getCharacters() {
  try {
    const response = await hpClient.get("/api/characters");
    if (!Array.isArray(response.data)) {
      return [];
    }
    return response.data.map(normalizeCharacter);
  } catch (error) {
    const reason = error.response?.status
      ? `${error.response.status} ${error.response.statusText}`
      : error.message;
    throw new Error(`getCharacters: failed to fetch characters (${reason})`);
  }
}
