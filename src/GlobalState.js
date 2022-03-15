import React, { use } from "react";
import useSpeakerDataManager from "./useSpeakerDataManager";

export const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  // Now we refer our customHook useSpeakerDataManager to refer these state and function on global level. We need to provide the context i.e. isLoading, speakerList, toggleSpeakerFavorite to the child component which is Speakers.
  const {
    isLoading,
    speakerList,
    favoriteClickCount,
    toggleSpeakerFavorite,
    incrementFavoriteClickCount,
    hasErrored,
    error,
  } = useSpeakerDataManager();

  const provider = {
    isLoading,
    speakerList,
    favoriteClickCount,
    hasErrored,
    error,
    toggleSpeakerFavorite,
    incrementFavoriteClickCount,
  };

  return (
    <GlobalContext.Provider value={provider}>{children}</GlobalContext.Provider>
  );
};
