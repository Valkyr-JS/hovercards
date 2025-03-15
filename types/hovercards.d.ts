import { IPerformerCardProps } from "./stashPlugin";

/** Types for your plugin config. Settings are undefined by default. Data should
 * match the settings in your `/src/source.yml` file. */
interface IhovercardsConfig {
  /** By default, a hover card video uses the video preview. Enabling this
   * option makes hover card videos use the full video instead. */
  preferFullVideos?: boolean;
}

interface IPerformerCustomFields {
  vpc_hover?: string | number;
}

interface IPerformerCardPropsExtended extends IPerformerCardProps {
  performer: Performer & {
    custom_fields: IPerformerCustomFields;
  };
}
