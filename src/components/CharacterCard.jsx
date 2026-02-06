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

const knownHouseKeys = new Set(Object.keys(houseIcons));

export default function CharacterCard({ character }) {
  const house = (character.house || "No house").trim() || "No house";
  const rawHouseKey = (character.houseKey || "none").trim().toLowerCase();
  const isKnownHouse = knownHouseKeys.has(rawHouseKey);
  const houseKey = isKnownHouse ? rawHouseKey : "none";
  const houseIcon = isKnownHouse ? houseIcons[rawHouseKey] : null;
  const isNoHouse = rawHouseKey === "none";
  const actorName = character.actor || "Unknown";
  const genderLabel = character.gender || "Unknown";
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
      {isNoHouse ? <span className="house-tag">No house</span> : null}
      <h3>{character.name}</h3>
      <p className="meta">
        <span className="meta-label">House</span>{" "}
        {house}
      </p>
      <p className="meta">
        <span className="meta-label">Actor</span>{" "}
        {actorName}
      </p>
      <p className="meta">
        <span className="meta-label">Gender</span>{" "}
        {genderLabel}
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
          <div className="placeholder-emoji" aria-hidden="true">
            ✨
          </div>
          <div className="placeholder-text">No image available</div>
        </div>
      )}
    </article>
  );
}
