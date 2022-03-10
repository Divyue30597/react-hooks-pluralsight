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

## useContext

A new Context API whose purpose is to make accessing data and functions anyplace in your app very simple and straightforward.

The new React Hook useContext makes it trivial to access context in any of your functional components without any unnatural acts, that is, creating wrapping tags in your render events that literally have nothing to do with the UI become obsolete.

**Issues Solved**:

1. Passed properties around your component up and down complex component trees. It was ugly.
2. It led to the design pattern commonly used known as prop drilling and also to HOC, higher‑order components, to basically use class inheritance as a way to pass data around, equally ugly and troublesome.

```javascript
// Initially our code looks like this

const App = ({ pageName }) => {
  if (pageName === "Home") return <Home />;
  if (pageName === "Speakers") return <Speakers />;
  return <div>Not Found</div>;
};

export default App;

// After refactoring and adding context
import React from "react";
import Home from "./Home";
import Speakers from "./speakers";

// 1. create a context and export it. That way, other components can just import the context to use it
export const ConfigContext = React.createContext();

const pageToShow = (pageName) => {
  if (pageName === "Home") return <Home />;
  if (pageName === "Speakers") return <Speakers />;
  return <div>Not Found</div>;
};

const configValue = {
  showSpeakerSpeakingDays: true,
};

const App = ({ pageName }) => {
  return (
    // 2. next is in our return of our app component, we wrap our page to show with ConfigContext.Provider. Then we pass the attributes value to the provider, which can be any JavaScript object. We'll assign that to the value attribute of the ConfigContext.Provider.
    <ConfigContext.Provider value={configValue}>
      <div>{pageToShow(pageName)}</div>
    </ConfigContext.Provider>
  );
};

export default App;

// Theoretically, we plan on being able to access that value from any component that's below this component app.
```

## useReducer

![reducer](./img/reducer.png)

Reducer is simply a function that takes in a previous state as the first parameter, an action as the second parameter, and returns a new state.

useState is built on useReducer.

```javascript
// useState is build on useReducer -> Proof

const [speakerList, setSpeakerList] = useState([]);
                  |
                  v
const [speakerList, setSpeakerList] = useReducer(
  (state, action) => action,
  []
);
```

### More briefly explained

```javascript
function speakersReducer(state, action) {
  switch (action.type) {
    case "setSpeakerList": {
      return action.data;
    }
    default:
      return state;
  }
}
// 1.  useReducer does for us here is that when we call dispatch,
// the useReducer code calls speakersReducer on our behalf.
// You could think of calling dispatch as the same thing as calling the function speakersReducer in this case.
const [speakerList, dispatch] = useReducer(speakersReducer, []);

// 4. think of this as useState is just useReducer with only a default action type

const [isLoading, setIsLoading] = useState(true);
const [speakingSat, setSpeakingSat] = useState(true);
const [speakingSun, setSpeakingSun] = useState(true);

// Usinf useContext get a reference to our ConfigContext
const context = useContext(ConfigContext);

useEffect(() => {
  setIsLoading(true);
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  }).then(() => {
    setIsLoading(false);
  });
  // setSpeakerList(SpeakerData);
  // 2. we need to update the function call to setSpeakerList with the call to
  // dispatch with the first parameter being an object with the attribute type
  // set to setSpeakerList and the data set to our array that contains all the
  // speakers. This matches with our reducer. So when the reducer gets called
  // by the dispatch method, the new state is returned.
  dispatch(
    // 3. This is an action object which we are refering above in switch statement
    {
      type: "setSpeakerList",
      data: SpeakerData,
    }
  );
  return () => {
    console.log("clean up");
  };
}, []);
```

**reducer with further more actions**

```javascript
function speakersReducer(state, action) {
  function updateFavorite(favoriteValue) {
    return state.map((item) => {
      if (item.id === action.sessionId) {
        return { ...item, favorite: favoriteValue };
      }
      return item;
    });
  }

  switch (action.type) {
    case "setSpeakerList": {
      return action.data;
    }
    case "favorite": {
      return updateFavorite(true);
      // return state.map((item) => {
      //   if (item.id === action.sessionId) {
      //     item.favorite = true;
      //   }
      //   return item;
      // })
    }
    case "unfavorite": {
      return updateFavorite(false);
    }
    default:
      return state;
  }
}

const [speakerList, dispatch] = useReducer(speakersReducer, []);

const [isLoading, setIsLoading] = useState(true);
const [speakingSat, setSpeakingSat] = useState(true);
const [speakingSun, setSpeakingSun] = useState(true);

// Usinf useContext get a reference to our ConfigContext
const context = useContext(ConfigContext);

useEffect(() => {
  setIsLoading(true);
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  }).then(() => {
    setIsLoading(false);
  });
  // setSpeakerList(SpeakerData);
  dispatch({
    type: "setSpeakerList",
    data: SpeakerData,
  });
  return () => {
    console.log("clean up");
  };
}, []);

const handleChangeSaturday = () => {
  setSpeakingSat(!speakingSat);
};

const handleChangeSunday = () => {
  setSpeakingSun(!speakingSun);
};

const speakerListFiltered = isLoading
  ? []
  : speakerList
      .filter(({ sat, sun }) => (speakingSat && sat) || (speakingSun && sun))
      .sort((a, b) => {
        if (a.firstName < b.firstName) {
          return -1;
        }
        if (a.firstName > b.firstName) {
          return 1;
        }
        return 0;
      });

const heartFavoriteHandler = (event, favoriteValue) => {
  event.preventDefault();
  const sessionId = parseInt(event.target.attributes["data-sessionId"].value);
  // setSpeakerList(
  //   speakerList.map((item) => {
  //     if (item.id === sessionId) {
  //       return { ...item, favorite: favoriteValue };
  //     }
  //     return item;
  //   })
  // );

  dispatch({
    type: favoriteValue === true ? "favorite" : "unfavorite",
    sessionId: sessionId,
  });
};
```

Refer theory above

## useCallback and useMemo

**Memoizing**

Wiki - In computing, memoization or memoisation is an optimization technique used primarily to speed up  
computer programs by storing the results of expensive function calls and returning the cached result when  
the same inputs occur again.

useCallback - caches a function

useMemo - caches a value

### useCallback

```javascript
// Speakers.js file where we are handling the event heartFavoriteHandler

//  If we look how we call the heartFavoriteHandler, notice that every time the page renders,
// we pass the handler to the SpeakerDetail page. React doesn't know that that function is
// not changing, so it re‑renders that component again just in case. The good news is we can
// add the useCallback Hook to the React import, then we wrap our function with useCallback,
// and the return of useCallback essentially caches that function value.

const heartFavoriteHandler = useCallback((event, favoriteValue) => {
  event.preventDefault();
  const sessionId = parseInt(event.target.attributes["data-sessionId"].value);
  // setSpeakerList(
  //   speakerList.map((item) => {
  //     if (item.id === sessionId) {
  //       return { ...item, favorite: favoriteValue };
  //     }
  //     return item;
  //   })
  // );

  dispatch({
    type: favoriteValue === true ? "favorite" : "unfavorite",
    sessionId: sessionId,
  });
}, []);

// SpeakerDetail.js file where the above event Handler is called.
<button
  data-sessionId={id}
  className={favorite ? "heartredbutton" : "heartdarkbutton"}
  onClick={(event) => {
    onHeartFavoriteHandler(event, !favorite);
  }}
/>;
```

# Takeaways

**UseState** - lets us track state really easily with very little ceremony.

**UseEffect** - gives us a clean way to set things, typically state, when components start and finish.

**useRef** - gives us the control we need to get to DOM elements when other means are not quite so straightforward.

**useContext** - That gave us the ability to pass data, config data in our example, down the component tree without prop drilling.

**useReducer** - gave us a nice way to organize our state management.

**useCallback** - gave us a nice performance gain by not having all our speaker detail pages have to re‑render on every button click of any speaker.

**useMemo** - to cache some data on our client, saving some compute time on our app, and hopefully making it more responsive in the process.
