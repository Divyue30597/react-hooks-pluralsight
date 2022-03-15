import React, { useContext } from "react";
import { FavoriteClickCountContext } from "./FavoriteClickCountContext";
import ImageToggleOnScroll from "./ImageToggleOnScroll";

const SpeakerDetail = ({ speakerRec, onHeartFavoriteHandler }) => {
  const { id, firstName, lastName, bio, favorite } = speakerRec;

  console.log(`Speaker details: ${id} ${firstName} ${lastName} ${favorite}`);

  const { incrementFavoriteClickCount } = useContext(FavoriteClickCountContext);

  return (
    <div className="card col-4 cardmin">
      <ImageToggleOnScroll
        className="card-img-top"
        primaryImg={`/static/speakers/bw/Speaker-${id}.jpg`}
        secondaryImg={`/static/speakers/Speaker-${id}.jpg`}
        alt={`${firstName} ${lastName}`}
      />
      <div className="card-body">
        <h4 className="card-title">
          <button
            className={favorite ? "heartredbutton" : "heartdarkbutton"}
            onClick={(event) => {
              onHeartFavoriteHandler(event, speakerRec);
              incrementFavoriteClickCount();
            }}
          />
          <span>
            {firstName} {lastName}
          </span>
        </h4>
        {/* <h5>Click Count: {favoriteClickCount}</h5> */}
        <span>{bio}</span>
      </div>
    </div>
  );
};

export default React.memo(SpeakerDetail);
