import React from "react";
import { Header } from "./Header";
import { Menu } from "./Menu";

function Home() {
  return (
    <div>
      <Header />
      <Menu />

      <div className="container">
        <div className="row">
          <div className="col margintopbottom">
            <h2>Home</h2>
            <h6 className="marginropbottom28">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </h6>
            <h6>
              Ad elit voluptate duis excepteur. Adipisicing incididunt duis
              magna commodo laborum et tempor ex sit laboris ad velit amet. Ut
              laborum consectetur quis ex cupidatat eu id in exercitation.
              Aliqua elit magna irure non elit exercitation elit laborum officia
              velit consectetur fugiat.
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
