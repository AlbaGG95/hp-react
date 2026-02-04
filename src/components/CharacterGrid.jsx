import CharacterCard from "./CharacterCard";

export default function CharacterGrid({ characters }) {
  if (!characters || characters.length === 0) {
    return <div>No characters found</div>;
  }

  return (
    <section>
      {characters.map((character) => (
        <CharacterCard
          key={character.id ?? character.name}
          character={character}
        />
      ))}
    </section>
  );
}
