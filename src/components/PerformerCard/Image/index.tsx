import React, { useEffect, useRef } from "react";
import { IPerformerCardPropsExtended } from "@pluginTypes/valkyrperformercard";
import "./Image.scss";

const Image: React.FC<IPerformerCardPropsExtended> = ({ performer }) => {
  const { vpc_hover, vpc_video } = performer.custom_fields;
  const hoverImage = vpc_hover ? <HoverImage vpc_hover={vpc_hover} /> : null;
  const hoverVideo = vpc_video ? <HoverVideo vpc_video={vpc_video} /> : null;

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

interface IHoverVideoProps {
  soundActive?: boolean;
  vpc_video: string | number;
}

const HoverVideo: React.FC<IHoverVideoProps> = ({
  vpc_video,
  soundActive = false,
}) => {
  const videoEl = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoEl?.current?.volume)
      videoEl.current.volume = soundActive ? 0.05 : 0;
  }, [soundActive]);

  // If the hover value is a number, it is the Stash image ID. Else, it is the
  // URL.
  const src =
    typeof vpc_video === "number"
      ? "/scene/" + vpc_video + "/stream"
      : vpc_video;

  const mouseOverHandler: React.MouseEventHandler<HTMLVideoElement> = (e) =>
    (e.target as HTMLVideoElement).play();

  const mouseOutHandler: React.MouseEventHandler<HTMLVideoElement> = (e) =>
    (e.target as HTMLVideoElement).pause();

  return (
    <video
      className="hover-video"
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
