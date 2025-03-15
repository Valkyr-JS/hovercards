import { IPerformerCardProps } from "./stashPlugin";

/** Types for your plugin config. Settings are undefined by default. Data should
 * match the settings in your `/src/source.yml` file. */
interface IhovercardsConfig {
  /** By default, setting a Stash scene ID uses the scene preview. Enabling this
   * option uses the full video stream instead. */
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
