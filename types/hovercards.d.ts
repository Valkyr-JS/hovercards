import { IPerformerCardProps } from "./stashPlugin";

/** Types for your plugin config. Settings are undefined by default. Data should
 * match the settings in your `/src/source.yml` file. */
interface IhovercardsConfig {
  /** By default, a hover card video uses the video preview. Enabling this
   * option makes hover card videos use the full video instead. */
  preferFullVideos?: boolean;
}

interface IPerformerCustomFields {
  /** Either the Stash ID number or the URL string for the hover image. */
  hovercard_image?: string | number;
  /** Either the Stash ID number or the URL string for the hover video. */
  hovercard_video?: string | number;
}

interface IPerformerCardPropsExtended extends IPerformerCardProps {
  config?: IhovercardsConfig;
  performer: Performer & {
    custom_fields: IPerformerCustomFields;
  };
  stashSettings: ConfigResult;
}
