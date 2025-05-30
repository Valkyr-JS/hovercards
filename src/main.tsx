import React, { useState } from "react";
import { default as cx } from "classnames";
import PerformerCardImage from "@/components/Image";
import { IPerformerCardPropsExtended } from "@/pluginTypes/hovercards";
import "./styles.scss";
import ToggleButton from "./components/ToggleButton/ToggleButton";

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
      config: qConfig.data.configuration.plugins.hovercards,
      stashSettings: qConfig.data.configuration,
    };

    return [<PerformerCardImage {...extendedProps} />];
  }

  // Return the original component until config request has loaded.
  return [<Original {...props} />];
});

// Patch the navbar buttons, adding a toggle to the left-hand side in on the
// performers grid page.
PluginApi.patch.after("MainNavBar.UtilityItems", function (props) {
  const [isActive, setActive] = useState(false);
  const qConfig = PluginApi.GQL.useConfigurationQuery();

  /**
   * To display the toggle button, ensure:
   * 1. The user config is loaded AND
   * 2. The user has enabled the button
   */
  if (
    qConfig.loading ||
    !qConfig.data.configuration.plugins?.hovercards?.showToggle
  )
    return [<>{props.children}</>];

  /** Click event handler for the boolean setting. */
  const handleToggle: React.MouseEventHandler = () => {
    const newState = !isActive;
    setActive(newState);
    document.body.classList[newState ? "add" : "remove"](
      "valkyr-hover-card__show-all"
    );
  };

  return [
    <>
      {props.children}
      <ToggleButton
        active={isActive}
        id="hovercards-toggle"
        onClick={handleToggle}
      />
    </>,
  ];
});
