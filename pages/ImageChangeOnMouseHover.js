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
