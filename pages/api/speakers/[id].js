import path from "path";
import fs from "fs";

const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function handler(req, res) {
  // res.status(200).send(JSON.stringify(speakerData, null, 2));
  const method = req?.method;
  const id = parseInt(req?.query.id);
  const recordFromBody = req?.body;

  if (method != "PUT") {
    res.send(501).send(`Method ${method} not implemented`);
  } else {
    const jsonData = path.resolve("./", "db.json");
    try {
      const readFileData = await readFile(jsonData);
      await delay(1000);
      const speakers = JSON.parse(readFileData).speakers;
      if (!speakers) {
        res.status(404).send("Error: Request failed with status code 404");
      } else {
        const newSpeakersArray = speakers.map((rec) => {
          return rec.id === id ? recordFromBody : rec;
        });
        writeFile(
          jsonData,
          JSON.stringify({ speakers: newSpeakersArray }, null, 2)
        );
        res.status(200).json(recordFromBody);
        console.log(`PUT /api/speakers/${id} status: 200`);
      }
    } catch (error) {
      console.log("/api/speakers error:", error);
    }
  }
}
