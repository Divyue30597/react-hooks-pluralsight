import React, { useState } from "react";

const inputElement = () => {
  // const results = useState("");
  // const inputText = results[0];
  // const setInputText = results[1];

  const [inputText, setInputText] = useState("");
  const [historyList, setHistoryList] = useState([]);

  return (
    <div>
      <input
        onChange={(e) => {
          setInputText(e.target.value);
          setHistoryList([...historyList, e.target.value]);
        }}
        placeholder="Enter some text"
      />
      <p>{inputText}</p>
      <hr />
      <p>
        {historyList.map((historyWord) => {
          return <div>{historyWord}</div>;
        })}
      </p>
    </div>
  );
};

export default inputElement;
