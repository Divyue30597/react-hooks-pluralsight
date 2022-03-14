//  import speakerData from "../../../src/SpeakerData";

import path from "path";
import fs from "fs";

const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function handler(req, res) {
  // res.status(200).send(JSON.stringify(speakerData, null, 2));

  const jsonData = path.resolve("./", "db.json");
  try {
    const readFileData = await readFile(jsonData);
    await delay(1000);
    const speakers = JSON.parse(readFileData).speakers;
    if (!speakers) {
      res.status(404).send("Error: Request failed with status code 404");
    } else {
      res.setHeader("Content-type", "application/json");
      res.status(200).send(JSON.stringify(speakers, null, 2));
      console.log("GET /api/speakers status: 200");
    }
  } catch (error) {
    console.log("/api/speakers error:", error);
  }
}
