import React from "react";
import { default as cx } from "classnames";
import PerformerCardImage from "@components/Image";
import { IPerformerCardPropsExtended } from "@pluginTypes/hovercards";
import "./styles.scss";

const { PluginApi } = window;

PluginApi.patch.instead("PerformerCard", function (props, _, Original) {
  const wrapperClasses = cx("valkyr-hover-card");
  return [
    <div className={wrapperClasses}>
      <Original {...props} />
    </div>,
  ];
});

PluginApi.patch.instead("PerformerCard.Image", function (props, _, Original) {
  // Fetch user plugin config
  const qConfig = PluginApi.GQL.useConfigurationQuery();
  const configLoaded = !qConfig.loading;

  if (configLoaded) {
    const extendedProps: IPerformerCardPropsExtended = {
      ...props,
      stashSettings: qConfig.data.configuration,
    };

    console.log("extendedProps", extendedProps);

    return [<PerformerCardImage {...extendedProps} />];
  }

  // Return the original component until config request has loaded.
  return [<Original {...props} />];
});
