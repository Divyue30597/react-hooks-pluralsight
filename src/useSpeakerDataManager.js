import React, { useReducer, useEffect } from "react";
import speakersReducer from "./speakersReducer";
import SpeakerData from "./SpeakerData";

function useSpeakerDataManager() {
  // const [speakerList, setSpeakerList] = useState([]);
  // 1. SpeakerList(array of speakers) and isLoading(tracks speakerList is loaded or not) are related.
  // What we need? ->  Our plan here is to replace the state useReducer isTracking to be an object containing multiple properties rather than what it is now, which is just one property, speakerList.
  // The below code will be updated to code on line 23 and comment out isLoading state. After making these changes we need to update our useReducer as well since now we are passing an object to our action
  // const [speakerList, dispatch] = useReducer(speakersReducer, []);

  const [{ isLoading, speakerList }, dispatch] = useReducer(
    speakersReducer,
    // change our useReducer initialization to initialize our stateObject instead of just the speakerList, so that becomes an object notation, isLoading set to true and speakerList set to an empty array.
    {
      isLoading: true,
      speakerList: [],
    }
  );

  function toggleSpeakerFavorite(speakerRec) {
    speakerRec.favorite === true
      ? dispatch({ type: "unfavorite", id: speakerRec.id })
      : dispatch({ type: "favorite", id: speakerRec.id });
  }

  useEffect(() => {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    }).then(() => {
      dispatch({
        type: "setSpeakerList",
        data: SpeakerData,
      });
    });
    return () => {
      console.log("clean up");
    };
  }, []);

  return { isLoading, speakerList, toggleSpeakerFavorite };
}

export default useSpeakerDataManager;
