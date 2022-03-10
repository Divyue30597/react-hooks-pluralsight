import React, { useState, useRef, useEffect } from "react";

const ImageToggleOnScroll = ({ primaryImg, secondaryImg }) => {
  const imageRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);

  const isInView = () => {
    const rect = imageRef.current.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
  };

  const [inView, setInView] = useState(false);

  // We are mounting the events with the useEffects when the components first mounts. Then, we are passing a function as first parameter, which will get executed when the component mounts. We need to remove this event listener before the component unmounts so we are returning another function that will remove the listener.
  // useEffect, knowing that the first parameter we pass into useEffect is a function that gets executed after the component has completely rendered the first time. By putting in an empty array as the second parameter of useEffect, we are telling it to only run the function passed in as the first parameter after the component renders and not on subsequent updates.
  useEffect(() => {
    setIsLoading(false);
    setInView(isInView());
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
    // We can add the dependency array since we don't need to add and remove the scroll listeners on every component update, let's pass in an empty array, which tells useEffect to only run when the component is first rendered.
  }, []);

  const scrollHandler = () => {
    setInView(isInView());
  };

  return (
    <img
      src={
        isLoading
          ? "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
          : inView
          ? secondaryImg
          : primaryImg
      }
      alt=""
      width="200"
      height="200"
      ref={imageRef}
    />
  );
};

export default ImageToggleOnScroll;
