import React, { useEffect, useRef } from "react";
import {
  IPerformerCardPropsExtended,
  IPerformerCustomFields,
} from "@pluginTypes/hovercards";
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

interface IHoverVideoProps {
  hovercard_video: string | number;
  preferFullVideos: boolean;
  soundActive: boolean;
}

const HoverVideo: React.FC<IHoverVideoProps> = ({ soundActive, ...props }) => {
  const videoEl = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoEl?.current?.volume)
      videoEl.current.volume = soundActive ? 0.05 : 0;
  }, [soundActive]);

  // Check if the user has set to use the full video stream instead of the
  // preview.
  const vidType = props.preferFullVideos ? "/stream" : "/preview";

  // Choose a random source from the list
  const value = getSourceValueFromList(props.hovercard_video);

  // If the hover value is a number, it is the Stash image ID. Else, it is the
  // URL.
  const src = typeof value === "number" ? "/scene/" + value + vidType : value;

  const mouseOverHandler: React.MouseEventHandler<HTMLVideoElement> = (e) =>
    (e.target as HTMLVideoElement).play();

  const mouseOutHandler: React.MouseEventHandler<HTMLVideoElement> = (e) =>
    (e.target as HTMLVideoElement).pause();

  return (
    <video
      className="performer-card-image hover-video"
      disableRemotePlayback
      playsInline
      muted={!soundActive}
      loop
      preload="none"
      onMouseOver={mouseOverHandler}
      onMouseOut={mouseOutHandler}
      ref={videoEl}
      src={src}
    />
  );
};

/** Get a random string/number value from a potential comma-separated string list or
 * single number. */
function getSourceValueFromList(sources: string | number): string | number {
  // Convert the sources into a list
  const values =
    typeof sources === "string"
      ? sources.split(",").map((v) => (isNaN(+v) ? v : +v))
      : [sources];

  // Choose a random source from the list
  const value = values[Math.floor(Math.random() * values.length)];
  const trimmed = typeof value === "string" ? value.trim() : value;

  return trimmed;
}
