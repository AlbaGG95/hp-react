export default function CharacterCard({ character }) {
  return (
    <article>
      <h3>{character.name}</h3>
      <p>House: {character.house || "Unknown"}</p>
      <p>Actor: {character.actor || "Unknown"}</p>
      {character.image ? (
        <img src={character.image} alt={character.name} width="120" />
      ) : null}
    </article>
  );
}
