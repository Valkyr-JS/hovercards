import React from "react";
import getSourceValueFromList from "@/helpers/getSourceValueFromList";

interface IHoverImageProps {
  hovercard_image: string | number;
  preferOriginalImage: boolean;
}

const HoverImage: React.FC<IHoverImageProps> = (props) => {
  // Check if the user has set to use the original image instead of the preview.
  const imgType = props.preferOriginalImage ? "/image" : "/thumbnail";

  // Choose a random source from the list
  const value = getSourceValueFromList(props.hovercard_image);

  // If the value is a number, it is the Stash image ID. Else, it is the URL.
  const src = typeof value === "number" ? "/image/" + value + imgType : value;

  return (
    <img
      loading="lazy"
      className="performer-card-image hover-image"
      src={src}
    />
  );
};

export default HoverImage;
