import CharacterCard from "./CharacterCard";

export default function CharacterGrid({ characters }) {
  if (!characters || characters.length === 0) {
    return <div>No characters found</div>;
  }

  return (
    <section className="grid">
      {characters.map((character) => (
        <CharacterCard
          key={character.id ?? character.name}
          character={character}
        />
      ))}
      {characters.length > 0 ? (
        <div className="castle-card" aria-hidden="true">
          <img
            src="/academy-castle.png"
            alt=""
            className="castle-card__img"
          />
          <div className="castle-card__overlay">
            <div className="castle-card__title">Magical Academy</div>
            <div className="castle-card__subtitle">
              Castle of Hogwarts
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
