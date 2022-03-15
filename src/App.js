import React from "react";
import Home from "./Home";
import Speakers from "./speakers";
import { GlobalProvider } from "./GlobalState";
import { FavoriteClickCountProvider } from "./FavoriteClickCountContext";

export const ConfigContext = React.createContext();

const pageToShow = (pageName) => {
  if (pageName === "Home") return <Home />;
  if (pageName === "Speakers") return <Speakers />;
  return <div>Not Found</div>;
};

const configValue = {
  showSignMeUp: true,
  showSpeakerSpeakingDays: true,
};

const App = ({ pageName }) => {
  return (
    <ConfigContext.Provider value={configValue}>
      {/* 
      Above the context is stored at the app level. So we will need ConfigContext.Provider.

      We have a full GlobalState context wrapping our app. In the next clip, we'll bring our custom Hook into our GlobalState and assign it to the context value. Then we'll consume that in our Speakers component, effectively decoupling our state management from our Speakers component. 
      
      Here the state is stored at component level. Which is for our components Speaker -> SpeakerDetail -- This is for GlobalProvider.
      */}
      <GlobalProvider>
        <FavoriteClickCountProvider>
          <div>{pageToShow(pageName)}</div>
        </FavoriteClickCountProvider>
      </GlobalProvider>
    </ConfigContext.Provider>
  );
};

export default App;
