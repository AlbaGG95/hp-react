import { useEffect, useState } from "react";
import CharacterGrid from "../components/CharacterGrid";
import Filters from "../components/Filters";
import {
  getCharacters,
  getCharactersByHouse,
  getStaff,
  getStudents,
} from "../services/hpService";

export default function Home() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedHouse, setSelectedHouse] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [search, setSearch] = useState("");
  const [onlyWithImage, setOnlyWithImage] = useState(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);
      try {
        let data = [];
        if (selectedGroup === "students") {
          data = await getStudents();
        } else if (selectedGroup === "staff") {
          data = await getStaff();
        } else if (selectedHouse) {
          data = await getCharactersByHouse(selectedHouse);
        } else {
          data = await getCharacters();
        }
        setCharacters(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [selectedGroup, selectedHouse]);

  const normalizedSearch = search.trim().toLowerCase();
  const filteredCharacters = characters
    .filter((character) => {
      const name = character?.name ?? "";
      if (!normalizedSearch) {
        return true;
      }
      return name.toLowerCase().includes(normalizedSearch);
    })
    .filter((character) => {
      if (!onlyWithImage) {
        return true;
      }
      return (
        typeof character?.image === "string" &&
        character.image.trim().length > 0
      );
    });

  const showEmptyState =
    !loading && !error && filteredCharacters.length === 0;

  return (
    <div>
      <Filters
        selectedHouse={selectedHouse}
        onHouseChange={setSelectedHouse}
        selectedGroup={selectedGroup}
        onGroupChange={setSelectedGroup}
        search={search}
        onSearchChange={setSearch}
        onlyWithImage={onlyWithImage}
        onOnlyWithImageChange={setOnlyWithImage}
      />

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div>
          <h1>Harry Potter Characters</h1>
          <p>Total: {filteredCharacters.length}</p>
          {showEmptyState ? (
            <p>No results found</p>
          ) : (
            <CharacterGrid characters={filteredCharacters} />
          )}
        </div>
      )}
    </div>
  );
}
