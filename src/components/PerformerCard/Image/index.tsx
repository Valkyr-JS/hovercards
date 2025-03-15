import React from "react";
import { IPerformerCardPropsExtended } from "@pluginTypes/valkyrperformercard";
import "./Image.scss";

const Image: React.FC<IPerformerCardPropsExtended> = ({ performer }) => {
  console.log(performer);

  const hoverImage = performer.custom_fields.vpc_hover ? (
    <HoverImage vpc_hover={performer.custom_fields.vpc_hover} />
  ) : null;

  return (
    <div className="image-wrapper">
      <img
        loading="lazy"
        className="performer-card-image main-image"
        alt={performer.name ?? ""}
        src={performer.image_path ?? ""}
      />
      {hoverImage}
    </div>
  );
};

export default Image;

interface IHoverImageProps {
  vpc_hover: string | number;
}

const HoverImage: React.FC<IHoverImageProps> = ({ vpc_hover }) => {
  // If the hover value is a number, it is the Stash image ID. Else, it is the
  // URL.
  const src =
    typeof vpc_hover === "number"
      ? "/image/" + vpc_hover + "/image"
      : vpc_hover;

  return (
    <img
      loading="lazy"
      className="performer-card-image hover-image"
      src={src}
    />
  );
};
