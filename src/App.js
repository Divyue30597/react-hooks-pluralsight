import React from "react";
import Home from "./Home";
import Speakers from "./Speakers";

const App = ({ pageName }) => {
  if (pageName === "Home") return <Home></Home>;
  if (pageName === "speakers") return <Speakers></Speakers>;
  return <div>Not Found</div>;
};

export default App;
