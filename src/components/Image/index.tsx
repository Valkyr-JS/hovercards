import React from "react";
import {
  IPerformerCardPropsExtended,
  IPerformerCustomFields,
} from "@/pluginTypes/hovercards";
import HoverGallery from "../HoverGallery";
import HoverImage from "../HoverImage";
import HoverVideo from "../HoverVideo";
import "./Image.scss";

const Image: React.FC<IPerformerCardPropsExtended> = ({
  performer,
  ...props
}) => {
  const { hovercard_gallery, hovercard_image, hovercard_video } =
    performer.custom_fields as IPerformerCustomFields;

  const hoverGallery = hovercard_gallery ? (
    <HoverGallery
      hovercard_gallery={hovercard_gallery}
      preferOriginalImage={props.config?.preferOriginalImage ?? false}
    />
  ) : null;

  const hoverImage = hovercard_image ? (
    <HoverImage
      hovercard_image={hovercard_image}
      preferOriginalImage={props.config?.preferOriginalImage ?? false}
    />
  ) : null;

  const hoverVideo = hovercard_video ? (
    <HoverVideo
      hovercard_video={hovercard_video}
      preferFullVideos={props.config?.preferFullVideos ?? false}
      soundActive={props.stashSettings?.interface?.soundOnPreview ?? false}
    />
  ) : null;

  return (
    <div className="image-wrapper">
      <img
        loading="lazy"
        className="performer-card-image main-image"
        alt={performer.name ?? ""}
        src={performer.image_path ?? ""}
      />
      {hoverVideo ?? hoverGallery ?? hoverImage}
    </div>
  );
};

export default Image;
