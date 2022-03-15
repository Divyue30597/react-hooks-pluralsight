import React, { useState, useContext, useCallback, useMemo } from "react";
import { Header } from "./Header";
import { Menu } from "./Menu";
import SpeakerDetail from "./SpeakerDetail";
import { ConfigContext } from "./App";
import { GlobalContext } from "./GlobalState";

const Speakers = () => {
  // const [isLoading, setIsLoading] = useState(true);
  const [speakingSat, setSpeakingSat] = useState(true);
  const [speakingSun, setSpeakingSun] = useState(true);

  // Using useContext get a reference to our ConfigContext
  const context = useContext(ConfigContext);

  // We will comment out here since we are creating global context. Next what we do is copy the same code in the GlobalState.js file. And we will provide the Global State context here.
  // We've taken the return from our custom Hook that we called in GlobalState, and we've gotten a reference to that now in our Speakers component.
  const { isLoading, speakerList, toggleSpeakerFavorite, hasErrored, error } =
    useContext(GlobalContext);

  // const { isLoading, speakerList, toggleSpeakerFavorite } =
  //   useSpeakerDataManager();

  const handleChangeSaturday = () => {
    setSpeakingSat(!speakingSat);
  };

  const handleChangeSunday = () => {
    setSpeakingSun(!speakingSun);
  };

  const newSpeakerList = useMemo(
    () =>
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

  // Looking at our heartFavoriteHandler, this is basically unchanged since it just calls dispatch and doesn't update either our isLoading or speakerList state directly. We did rename sessionId to id.
  // const heartFavoriteHandler = useCallback((event, favoriteValue) => {
  //   event.preventDefault();
  //   const sessionId = parseInt(event.target.attributes["data-sessionId"].value);
  //   toggleSpeakerFavorite();

  // --- after dispatch ---
  // dispatch({
  //   type: favoriteValue === true ? "favorite" : "unfavorite",
  //   id: sessionId,
  // });

  // --- before dispatch ---
  // setSpeakerList(
  //   speakerList.map((item) => {
  //     if (item.id === sessionId) {
  //       return { ...item, favorite: favoriteValue };
  //     }
  //     return item;
  //   })
  // );
  // }, []);

  // refactoring
  const heartFavoriteHandler = useCallback((event, speakerRec) => {
    event.preventDefault();
    toggleSpeakerFavorite(speakerRec);
  }, []);

  if (hasErrored === true) return <div>Error: {error.message}</div>;
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
            {speakerListFiltered.map((speakerRec) => {
              return (
                <SpeakerDetail
                  key={speakerRec.id}
                  speakerRec={speakerRec}
                  onHeartFavoriteHandler={heartFavoriteHandler}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Speakers;
