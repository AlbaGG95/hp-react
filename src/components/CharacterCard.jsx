export default function CharacterCard({ character }) {
  const hasImage =
    typeof character.image === "string" && character.image.trim().length > 0;

  return (
    <article className="card">
      <h3>{character.name}</h3>
      <p>House: {character.house || "Not assigned"}</p>
      <p>Actor: {character.actor || "Unknown"}</p>
      {hasImage ? (
        <img src={character.image} alt={character.name} width="120" />
      ) : (
        <div
          style={{
            width: "120px",
            height: "160px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #ccc",
            borderRadius: "4px",
            color: "#666",
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          No image available
        </div>
      )}
    </article>
  );
}
