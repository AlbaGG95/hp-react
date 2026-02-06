import { useEffect, useState } from "react";
import CharacterGrid from "../components/CharacterGrid";
import Filters from "../components/Filters";
import { getCharacters } from "../services/hpService";

export default function Home() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedHouse, setSelectedHouse] = useState("all");
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCharacters();
        setCharacters(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const normalizedSearch = search.trim().toLowerCase();
  const normalizedSelectedHouse = selectedHouse.trim().toLowerCase();
  const filteredCharacters = characters
    .filter((character) => {
      if (selectedGroup === "students") {
        return character?.hogwartsStudent === true;
      }
      if (selectedGroup === "staff") {
        return character?.hogwartsStaff === true;
      }
      return true;
    })
    .filter((character) => {
      if (selectedGroup !== "all" || normalizedSelectedHouse === "all") {
        return true;
      }
      const characterHouseKey = (character?.houseKey ?? "none")
        .trim()
        .toLowerCase();
      return characterHouseKey === normalizedSelectedHouse;
    })
    .filter((character) => {
      const name = character?.name ?? "";
      if (!normalizedSearch) {
        return true;
      }
      return name.toLowerCase().includes(normalizedSearch);
    })
    .filter(
      (character) =>
        typeof character?.image === "string" &&
        character.image.trim().length > 0
    );

  const showEmptyState =
    !loading && !error && filteredCharacters.length === 0;
  const normalizedSearchValue = search.trim();
  const selectedGroupLabel =
    selectedGroup === "all"
      ? "All"
      : selectedGroup === "students"
        ? "Students"
        : "Staff";
  const selectedHouseLabelMap = {
    all: "All houses",
    gryffindor: "Gryffindor",
    slytherin: "Slytherin",
    ravenclaw: "Ravenclaw",
    hufflepuff: "Hufflepuff",
    none: "No house",
  };
  const selectedHouseLabel =
    selectedHouseLabelMap[normalizedSelectedHouse] || "All houses";

  const handleClear = () => {
    setSelectedHouse("all");
    setSelectedGroup("all");
    setSearch("");
  };

  return (
    <div className="container">
      <Filters
        selectedHouse={selectedHouse}
        onHouseChange={setSelectedHouse}
        selectedGroup={selectedGroup}
        onGroupChange={setSelectedGroup}
        search={search}
        onSearchChange={setSearch}
      />

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div>
          <header className="page-header">
            <h1 className="page-title">Harry Potter Characters</h1>
            <div className="statusbar">
              <div className="chips">
                <span className="chip">Total: {filteredCharacters.length}</span>
                <span className="chip">
                  House: {selectedHouseLabel}
                </span>
                <span className="chip">Group: {selectedGroupLabel}</span>
                {normalizedSearchValue ? (
                  <span className="chip">
                    Search: {normalizedSearchValue}
                  </span>
                ) : null}
              </div>
              <button className="btn btn-ghost" onClick={handleClear}>
                Clear filters
              </button>
            </div>
          </header>
          {showEmptyState ? (
            <div className="empty">
              <p>No results found</p>
              <small>Try clearing filters.</small>
            </div>
          ) : (
            <CharacterGrid characters={filteredCharacters} />
          )}
        </div>
      )}
    </div>
  );
}
