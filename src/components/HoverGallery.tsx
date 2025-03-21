import React from "react";
import getSourceValueFromList from "@/helpers/getSourceValueFromList";

const { GQL } = window.PluginApi;

interface IHoverGalleryProps {
  hovercard_gallery: number;
  preferOriginalImage: boolean;
}

const HoverGallery: React.FC<IHoverGalleryProps> = (props) => {
  // Check if the user has set to use the original image instead of the preview.
  const imgType = props.preferOriginalImage ? "/image" : "/thumbnail";

  // Choose a random gallery from the list.
  const value = getSourceValueFromList(props.hovercard_gallery);

  // External galleries are not supported. If the value is anything other than a
  // number, return `null`.
  if (typeof value === "string") return null;

  // Get a random image from the gallery
  const query = GQL.useFindImagesQuery({
    variables: {
      filter: { per_page: 1, sort: "random" },
      image_filter: {
        galleries: {
          value: [value.toString()],
          modifier: CriterionModifier.Includes,
        },
      },
    },
  });

  // Don't return the component if a valid image hasn't been found.
  if (!query.data || query.data.findImages.images.length === 0) return null;

  const imageID = query.data.findImages.images[0].id;
  const src = "/image/" + imageID + imgType;

  return (
    <img
      loading="lazy"
      className="performer-card-image hover-image"
      src={src}
    />
  );
};

export default HoverGallery;
