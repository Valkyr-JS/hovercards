import React, { useEffect, useRef } from "react";
import { IPerformerCardPropsExtended } from "@pluginTypes/hovercards";
import "./Image.scss";

const Image: React.FC<IPerformerCardPropsExtended> = ({
  performer,
  ...props
}) => {
  const { hovercard_image, hovercard_video } = performer.custom_fields;

  const hoverImage = hovercard_image ? (
    <HoverImage hovercard_image={hovercard_image} />
  ) : null;

  const hoverVideo = hovercard_video ? (
    <HoverVideo
      hovercard_video={hovercard_video}
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
}

const HoverImage: React.FC<IHoverImageProps> = ({ hovercard_image }) => {
  // If the hover value is a number, it is the Stash image ID. Else, it is the
  // URL.
  const src =
    typeof hovercard_image === "number"
      ? "/image/" + hovercard_image + "/image"
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
  soundActive?: boolean;
  hovercard_video: string | number;
}

const HoverVideo: React.FC<IHoverVideoProps> = ({
  hovercard_video,
  soundActive,
}) => {
  const videoEl = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoEl?.current?.volume)
      videoEl.current.volume = soundActive ? 0.05 : 0;
  }, [soundActive]);

  // If the hover value is a number, it is the Stash image ID. Else, it is the
  // URL.
  const src =
    typeof hovercard_video === "number"
      ? "/scene/" + hovercard_video + "/preview"
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
