import ImageToggleOnScroll from "./ImageToggleOnScroll";

const SpeakerDetail = ({
  id,
  firstName,
  lastName,
  bio,
  favorite,
  onHeartFavoriteHandler,
}) => {
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
            data-sessionId={id}
            className={favorite ? "heartredbutton" : "heartdarkbutton"}
            onClick={(event) => {
              onHeartFavoriteHandler(event, !favorite);
            }}
          />
          <span>
            {firstName} {lastName}
          </span>
        </h4>
        <span>{bio}</span>
      </div>
    </div>
  );
};

export default SpeakerDetail;
