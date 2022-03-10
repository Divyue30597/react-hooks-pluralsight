import React, {
  useEffect,
  useState,
  useContext,
  useReducer,
  useCallback,
  useMemo,
} from "react";
import { Header } from "./Header";
import { Menu } from "./Menu";
import SpeakerData from "./SpeakerData";
import SpeakerDetail from "./SpeakerDetail";
import { ConfigContext } from "./App";
import speakersReducer from "./speakerReducer";

const Speakers = () => {
  // const [speakerList, setSpeakerList] = useState([]);

  const [speakerList, dispatch] = useReducer(speakersReducer, []);

  const [isLoading, setIsLoading] = useState(true);
  const [speakingSat, setSpeakingSat] = useState(true);
  const [speakingSun, setSpeakingSun] = useState(true);

  // Usinf useContext get a reference to our ConfigContext
  const context = useContext(ConfigContext);

  useEffect(() => {
    setIsLoading(true);
    new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    }).then(() => {
      setIsLoading(false);
    });
    // setSpeakerList(SpeakerData);
    dispatch({
      type: "setSpeakerList",
      data: SpeakerData,
    });
    return () => {
      console.log("clean up");
    };
  }, []);

  const handleChangeSaturday = () => {
    setSpeakingSat(!speakingSat);
  };

  const handleChangeSunday = () => {
    setSpeakingSun(!speakingSun);
  };

  const newSpeakerList = useMemo(
    speakerList
      .filter(({ sat, sun }) => (speakingSat && sat) || (speakingSun && sun))
      .sort((a, b) => {
        if (a.firstName < b.firstName) {
          return -1;
        }
        if (a.firstName > b.firstName) {
          return 1;
        }
        return 0;
      }),
    [speakingSun, speakingSat, speakerList]
  );

  const speakerListFiltered = isLoading ? [] : newSpeakerList;

  const heartFavoriteHandler = useCallback((event, favoriteValue) => {
    event.preventDefault();
    const sessionId = parseInt(event.target.attributes["data-sessionId"].value);
    dispatch({
      type: favoriteValue === true ? "favorite" : "unfavorite",
      sessionId: sessionId,
    });
    // setSpeakerList(
    //   speakerList.map((item) => {
    //     if (item.id === sessionId) {
    //       return { ...item, favorite: favoriteValue };
    //     }
    //     return item;
    //   })
    // );
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <Menu />
      <div className="container">
        <div className="btn-toolbar margintopbottom5 checkbox-bigger">
          {/* This will display / not display depending on the context mentioned in the app file. */}
          {context.showSpeakerSpeakingDays === false ? null : (
            <div className="hide">
              <div className="form-check-inline">
                <label className="form-check-label">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={handleChangeSaturday}
                    checked={speakingSat}
                  />
                  Saturday Speaker
                </label>
              </div>
              <div className="form-check-inline">
                <label className="form-check-label">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={handleChangeSunday}
                    checked={speakingSun}
                  />
                  Sunday Speaker
                </label>
              </div>
            </div>
          )}
        </div>
        <div className="row">
          <div className="card-deck">
            {speakerListFiltered.map(
              ({ id, firstName, lastName, bio, favorite }) => {
                return (
                  <SpeakerDetail
                    key={id}
                    id={id}
                    favorite={favorite}
                    firstName={firstName}
                    lastName={lastName}
                    bio={bio}
                    onHeartFavoriteHandler={heartFavoriteHandler}
                  />
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Speakers;
