import { IPerformerCardProps } from "./stashPlugin";

/** Types for your plugin config. Settings are undefined by default. Data should
 * match the settings in your `/src/source.yml` file. */
interface MyPluginConfig {
  enablePlugin?: boolean;
}

interface IPerformerCardPropsExtended extends IPerformerCardProps {}
