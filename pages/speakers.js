import React from "react";
import App from "../src/App";
import path from "path";
import fs from "fs";

export const InitialSpeakerDataContext = React.createContext();

export async function getServerSideProps() {
  // Ultimately, what's returned from this method that's running on the Next.js server is a JavaScript object with a props property. Typically, the first thing that happens when the server method is called is that all external dependencies for this user's web page need to be fulfilled. Typically, those are things like database call s, calls to external services, like REST calls, or any other request dependency. Then the results of those external calls are returned as prop objects.

  const { promisify } = require("util");
  const readFile = promisify(fs.readFile);
  const jsonData = path.resolve("./", "db.json");
  let initialSpeakerData;
  try {
    const readFileData = await readFile(jsonData);
    initialSpeakerData = JSON.parse(readFileData).speakers;
  } catch (error) {
    console.log("/api/speakers error:", error);
  }

  return { props: { initialSpeakerData } };
}

function speakers({ initialSpeakerData }) {
  return (
    <InitialSpeakerDataContext.Provider value={initialSpeakerData}>
      <App pageName="Speakers" />
    </InitialSpeakerDataContext.Provider>
  );
}

export default speakers;
