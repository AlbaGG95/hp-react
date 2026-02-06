import { useEffect } from "react";
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

  useEffect(() => {
    if (window.__hpImageDebugged) {
      return;
    }
    window.__hpImageDebugged = true;

    const frames = Array.from(
      document.querySelectorAll('[data-debug="card-image"]')
    ).slice(0, 3);

    frames.forEach((frame, index) => {
      const img = frame.querySelector('[data-debug="card-image-img"]');
      const frameRect = frame.getBoundingClientRect();
      const frameStyle = getComputedStyle(frame);
      const imgRect = img ? img.getBoundingClientRect() : null;
      const imgStyle = img ? getComputedStyle(img) : null;

      console.log("[card-image debug]", {
        index,
        frameRect: {
          width: frameRect.width,
          height: frameRect.height,
        },
        frameStyle: {
          position: frameStyle.position,
          width: frameStyle.width,
          height: frameStyle.height,
          aspectRatio: frameStyle.aspectRatio,
          overflow: frameStyle.overflow,
        },
        imgRect: imgRect
          ? { width: imgRect.width, height: imgRect.height }
          : null,
        imgStyle: imgStyle
          ? {
              position: imgStyle.position,
              width: imgStyle.width,
              height: imgStyle.height,
              objectFit: imgStyle.objectFit,
              maxWidth: imgStyle.maxWidth,
              maxHeight: imgStyle.maxHeight,
            }
          : null,
      });
    });
  }, []);

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
      <h3 className="character-name">{character.name}</h3>
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
      <div className="card-image" data-debug="card-image">
        {hasImage ? (
          <img
            src={character.image}
            alt={character.name}
            className="card-image__img"
            data-debug="card-image-img"
          />
        ) : (
          <div className="img-placeholder">
            <div className="placeholder-emoji" aria-hidden="true">
              ✨
            </div>
            <div className="placeholder-text">No image available</div>
          </div>
        )}
      </div>
    </article>
  );
}
