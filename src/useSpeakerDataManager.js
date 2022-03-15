import React, { useReducer, useEffect, useContext } from "react";
import speakersReducer from "./speakersReducer";
import SpeakerData from "./SpeakerData";
import axios from "axios";
// import { InitialSpeakerDataContext } from "../pages/speakers";

function useSpeakerDataManager() {
  // const [speakerList, setSpeakerList] = useState([]);
  // 1. SpeakerList(array of speakers) and isLoading(tracks speakerList is loaded or not) are related.
  // What we need? ->  Our plan here is to replace the state useReducer isTracking to be an object containing multiple properties rather than what it is now, which is just one property, speakerList.
  // The below code will be updated to code on line 23 and comment out isLoading state. After making these changes we need to update our useReducer as well since now we are passing an object to our action
  // const [speakerList, dispatch] = useReducer(speakersReducer, []);

  // const initialSpeakerData = useContext(InitialSpeakerDataContext);

  const [{ isLoading, speakerList, favoriteClickCount }, dispatch] = useReducer(
    speakersReducer,
    // change our useReducer initialization to initialize our stateObject instead of just the speakerList, so that becomes an object notation, isLoading set to true and speakerList set to an empty array.
    {
      isLoading: true,
      speakerList: [],
      favoriteClickCount: 0,
    }
  );

  function incrementFavoriteClickCount() {
    dispatch({ type: "incrementFavoriteClickCount" });
  }

  // This is for Server Side rendering.
  // const [{ isLoading, speakerList }, dispatch] = useReducer(
  //   speakersReducer,
  // change our useReducer initialization to initialize our stateObject instead of just the speakerList, so that becomes an object notation, isLoading set to true and speakerList set to an empty array.
  //   {
  //     isLoading: false,
  //     speakerList: initialSpeakerData,
  //   }
  // );

  function toggleSpeakerFavorite(speakerRec) {
    (async () => {
      axios.put(`api/speakers/${speakerRec.id}`, {
        ...speakerRec,
        favorite: !speakerRec.favorite,
      });
      speakerRec.favorite === true
        ? dispatch({ type: "unfavorite", id: speakerRec.id })
        : dispatch({ type: "favorite", id: speakerRec.id });
    })();
  }

  useEffect(() => {
    // new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve();
    //   }, 1000);
    // }).then(() => {
    //   dispatch({
    //     type: "setSpeakerList",
    //     data: SpeakerData,
    //   });
    // });

    (async () => {
      let result = await axios.get("/api/speakers");
      dispatch({ type: "setSpeakerList", data: result.data });
    })();

    return () => {
      console.log("clean up");
    };
  }, []);

  return {
    isLoading,
    speakerList,
    favoriteClickCount,
    incrementFavoriteClickCount,
    toggleSpeakerFavorite,
  };
}

export default useSpeakerDataManager;
