import React, { useContext, useMemo } from "react";
import { GlobalContext } from "./GlobalState";

export const FavoriteClickCountContext = React.createContext();

export const FavoriteClickCountProvider = ({ children }) => {
  const { incrementFavoriteClickCount } = useContext(GlobalContext);

  // Notice the provider we're passing in we got by creating a new object every time this component renders. Well, that's the problem. React sees this new object and assumes it needs to re‑render the component.

  // let provider = {
  //   incrementFavoriteClickCount,
  // };

  // To fix this, we just need the useMemo React Hook

  let provider = useMemo(() => {
    return { incrementFavoriteClickCount };
  }, []);

  // The technique used here is very extensible. It gives you the flexibility to create a true global state that can cover a significant amount of functionality and, at the same time, let you optimize performance around specific tasks. I put both contexts around the full app just for demonstration. But in your apps, which I expect will be much more complex than this, I expect that you'd wrap the context just around the component trees where it makes sense.
  
  return (
    <FavoriteClickCountContext.Provider value={provider}>
      {children}
    </FavoriteClickCountContext.Provider>
  );
};
