import hpApi from "../api/hpApi";

export async function getCharacters() {
  try {
    const response = await hpApi.get("/api/characters");
    return response.data;
  } catch (error) {
    throw new Error("getCharacters: failed to fetch characters");
  }
}

export async function getCharactersByHouse(house) {
  try {
    const encodedHouse = encodeURIComponent(house);
    const response = await hpApi.get(`/api/characters/house/${encodedHouse}`);
    return response.data;
  } catch (error) {
    throw new Error("getCharactersByHouse: failed to fetch characters by house");
  }
}

export async function getStudents() {
  try {
    const response = await hpApi.get("/api/characters/students");
    return response.data;
  } catch (error) {
    throw new Error("getStudents: failed to fetch students");
  }
}

export async function getStaff() {
  try {
    const response = await hpApi.get("/api/characters/staff");
    return response.data;
  } catch (error) {
    throw new Error("getStaff: failed to fetch staff");
  }
}
