import React from "react";
import { IPerformerCardPropsExtended } from "@pluginTypes/valkyrperformercard";
import "./Image.scss";

const Image: React.FC<IPerformerCardPropsExtended> = ({ performer }) => {
  console.log(performer);
  return (
    <div className="image-wrapper">
      <img
        loading="lazy"
        className="performer-card-image main-image"
        alt={performer.name ?? ""}
        src={performer.image_path ?? ""}
      />
      <img
        loading="lazy"
        className="performer-card-image hover-image"
        alt={performer.name ?? ""}
        src={"http://192.168.0.20:7910/image/199670/image?t=1741027850"}
      />
    </div>
  );
};

export default Image;
