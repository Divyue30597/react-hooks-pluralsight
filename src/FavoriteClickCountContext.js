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

  return (
    <FavoriteClickCountContext.Provider value={provider}>
      {children}
    </FavoriteClickCountContext.Provider>
  );
};
