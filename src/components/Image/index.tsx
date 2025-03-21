import React from "react";
import {
  IPerformerCardPropsExtended,
  IPerformerCustomFields,
} from "@/pluginTypes/hovercards";
import HoverImage from "../HoverImage";
import HoverVideo from "../HoverVideo";
import "./Image.scss";

const { GQL } = window.PluginApi;

const Image: React.FC<IPerformerCardPropsExtended> = ({
  performer,
  ...props
}) => {
  const { hovercard_gallery, hovercard_image, hovercard_video } =
    performer.custom_fields as IPerformerCustomFields;

  // Get an image from the gallery
  let hoverGalleryImageID;
  if (!!hovercard_gallery) {
    const query = GQL.useFindImagesQuery({
      variables: {
        filter: { per_page: 1, sort: "random" },
        image_filter: {
          galleries: {
            value: [hovercard_gallery.toString()],
            modifier: CriterionModifier.Includes,
          },
        },
      },
    });

    if (query.data?.findImages.images.length) {
      hoverGalleryImageID = query.data.findImages.images[0].id;
    }
  }

  const hoverGallery = hoverGalleryImageID ? (
    <HoverImage
      hovercard_image={hoverGalleryImageID}
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
