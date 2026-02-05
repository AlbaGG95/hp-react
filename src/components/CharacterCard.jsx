import gryffindorIcon from "../assets/houses/gryffindor.png";
import slytherinIcon from "../assets/houses/slytherin.png";
import ravenclawIcon from "../assets/houses/ravenclaw.png";
import hufflepuffIcon from "../assets/houses/hufflepuff.png";

const houseIcons = {
  gryffindor: gryffindorIcon,
  slytherin: slytherinIcon,
  ravenclaw: ravenclawIcon,
  hufflepuff: hufflepuffIcon,
};

export default function CharacterCard({ character }) {
  const house = (character.house || "").trim();
  const normalizedHouse = house.toLowerCase();
  const hasHouse = normalizedHouse && normalizedHouse !== "not assigned";
  const houseKey = hasHouse ? normalizedHouse : "none";
  const houseIcon = hasHouse ? houseIcons[normalizedHouse] : null;
  const actorName = character.actor || "Unknown";
  const hasImage =
    typeof character.image === "string" && character.image.trim().length > 0;

  return (
    <article className={`card house-${houseKey}`}>
      {houseIcon ? (
        <img
          className="house-icon"
          src={houseIcon}
          alt={`${house} crest`}
        />
      ) : null}
      <h3>{character.name}</h3>
      <p className="meta">
        <span className="meta-label">Actor</span>
        {" "}
        {actorName}
      </p>
      {hasImage ? (
        <img
          src={character.image}
          alt={character.name}
          width="120"
          className="card-img"
        />
      ) : (
        <div className="img-placeholder">
          <div className="placeholder-text">No image available</div>
        </div>
      )}
    </article>
  );
}
