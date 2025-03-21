import React, { useEffect, useRef } from "react";
import getSourceValueFromList from "@/helpers/getSourceValueFromList";

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

export default HoverVideo;
