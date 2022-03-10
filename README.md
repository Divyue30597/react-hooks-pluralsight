# React Hooks Pluralsight

## What are React Hooks?

React Hooks adds the ability to manage React state and interface with React lifecycle events in React functional components.

Basically, it's React's way of allowing you to attach reusable logic to an existing component. Before Hooks, the most common way to attach logic externally to a component was to use the render props or higher‑order components pattern. Often, that led to awkward restructuring of your code that made it both cumbersome and harder to follow. React Hooks solves this problem by creating a mechanism for you to extract code that you can reuse between components. It does it without introducing any unnecessary nesting in your component tree.

React Hooks are JavaScript functions that allow developers to use state and lifecycle methods inside React functional components. With React Hooks, you can now build 100% of your application without using JavaScript classes at all. You never have to worry about the keyword "this" again.

## useState

The idea is, basically, every time the users see something new on the screen, it's tracked as a new state. The simplest example of this is what happens when a browser user types into an input field. Each character the user types fires an event, and that event replaces the current value of what is currently stored in state with a new value. Both the old state and the new state values are maintained, making development and debugging easy.

```javascript
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
```

## useRef

It is primmarily used to allow direct access to an element in the DOM.

```javascript
// Both files are considered to be react component.

// ImageChangeOnMouseHover.js file

import React from "react";
import ImageToggleOnMouseHover from "../src/ImageToggleOnMouseHover";
const ImageChangeOnMouseHover = () => {
  return (
    <div>
      <ImageToggleOnMouseHover
        primaryImg="/static/speakers/bw/Speaker-187.jpg"
        secondaryImg="/static/speakers/Speaker-187.jpg"
        alt=""
      />
      &nbsp;&nbsp;&nbsp;
      <ImageToggleOnMouseHover
        primaryImg="/static/speakers/bw/Speaker-1124.jpg"
        secondaryImg="/static/speakers/Speaker-1124.jpg"
        alt=""
      />
    </div>
  );
};

export default ImageChangeOnMouseHover;


// ImageToggleOnMouseHover.js file

import React, { useRef } from "react";

const ImageToggleOnMouseHover = ({ primaryImg, secondaryImg }) => {
  const imageRef = useRef(null);


  return (
    <img
      onMouseOver={() => {
        imageRef.current.src = secondaryImg;
      }}
      onMouseOut={() => {
        imageRef.current.src = primaryImg;
      }}
      src={primaryImg}
      alt=""
      ref={imageRef}
    />
  );
};

export default ImageToggleOnMouseHover;
```

## useEffect

![useEffect-hook-1](./img/react-useEffect-hook-1.jpg)

![useEffect-hook-2](./img/reacr-useEffect-hook-2.jpg)

# Refer react hooks further repo
 npm i eslint-plugin-react-hooks eslint-plugin-react eslint