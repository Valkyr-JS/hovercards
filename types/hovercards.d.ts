import { IPerformerCardProps } from "./stashPlugin";

/** Types for your plugin config. Settings are undefined by default. Data should
 * match the settings in your `/src/source.yml` file. */
interface IhovercardsConfig {
  /** By default, setting a Stash scene ID uses the Stash-generated scene
   * preview. Enabling this option uses the full video stream instead. */
  preferFullVideos?: boolean;
  /** By default, setting a Stash image ID uses the Stash-generated image
   * thumbnail. Enabling this option uses the original image instead. */
  preferOriginalImage?: boolean;
  /** Enabling this option adds a toggle button to the navigation bar which will display hover content for all performer cards on the current page. */
  showToggle?: boolean;
}

interface IPerformerCustomFields {
  /** The ID of a Stash gallery. A random image in the gallery will be picked to
   * be displayed on hover. */
  hovercard_gallery?: number;
  /** Either the Stash ID number or the URL string for the hover image, or a
   * comma-separated string of either. */
  hovercard_image?: string | number;
  /** Either the Stash ID number or the URL string for the hover video, or a
   * comma-separated string of either. */
  hovercard_video?: string | number;
}

interface IPerformerCardPropsExtended extends IPerformerCardProps {
  config?: IhovercardsConfig;
  performer: Performer;
  stashSettings: ConfigResult;
}
