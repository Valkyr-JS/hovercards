import React, { useEffect, useRef } from "react";
import { IPerformerCardPropsExtended } from "@pluginTypes/hovercards";
import "./Image.scss";

const Image: React.FC<IPerformerCardPropsExtended> = ({
  performer,
  ...props
}) => {
  const { hovercard_image, hovercard_video } = performer.custom_fields;

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
      {hoverVideo ?? hoverImage}
    </div>
  );
};

export default Image;

interface IHoverImageProps {
  hovercard_image: string | number;
  preferOriginalImage: boolean;
}

const HoverImage: React.FC<IHoverImageProps> = ({
  hovercard_image,
  ...props
}) => {
  // Check if the user has set to use the original image instead of the preview.
  const imgType = props.preferOriginalImage ? "/image" : "/thumbnail";

  // If the hover value is a number, it is the Stash image ID. Else, it is the
  // URL.
  const src =
    typeof hovercard_image === "number"
      ? "/image/" + hovercard_image + imgType
      : hovercard_image;

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

const HoverVideo: React.FC<IHoverVideoProps> = ({
  hovercard_video,
  soundActive,
  ...props
}) => {
  const videoEl = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoEl?.current?.volume)
      videoEl.current.volume = soundActive ? 0.05 : 0;
  }, [soundActive]);

  // Check if the user has set to use the full video stream instead of the
  // preview.
  const vidType = props.preferFullVideos ? "/stream" : "/preview";

  // If the hover value is a number, it is the Stash image ID. Else, it is the
  // URL.
  const src =
    typeof hovercard_video === "number"
      ? "/scene/" + hovercard_video + vidType
      : hovercard_video;

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
