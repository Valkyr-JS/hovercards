import React, { JSXElementConstructor, useState } from "react";
import { default as cx } from "classnames";
import PerformerCardImage from "@/components/Image";
import { IPerformerCardPropsExtended } from "@/pluginTypes/hovercards";
import "./styles.scss";
import { IBooleanSetting } from "@/pluginTypes/stashPlugin";
import { usePluginComponent } from "@/hooks";

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
  const componentsReady = usePluginComponent("BooleanSetting");
  const qConfig = PluginApi.GQL.useConfigurationQuery();

  /**
   * To display the toggle button, ensure:
   * 1. The user config is loaded AND
   * 2. The user has enabled the button AND
   * 3. The required plugin component is ready for use.
   */
  if (
    qConfig.loading ||
    !qConfig.data.configuration.plugins.hovercards.showToggle ||
    !componentsReady
  )
    return [<>{props.children}</>];

  const BooleanSetting = window.PluginApi.components
    .BooleanSetting as JSXElementConstructor<IBooleanSetting>;

  /** Click event handler for the boolean setting. */
  const handleToggle: React.MouseEventHandler = () => {
    setActive(!isActive);
  };

  // TODO - Add class on load if config is set to use it

  /** Change event handler for the boolean setting. This is a required prop,
   * however this didn't seem to update the checked state of the toggle. Click
   * handler used instead. */
  const handleChange = (v: boolean) => {
    document.body.classList[v ? "add" : "remove"](
      "valkyr-hover-card__show-all"
    );

    // TODO - Update config
  };

  return [
    <>
      <BooleanSetting
        id="hovercards-toggle"
        checked={isActive}
        onClick={handleToggle}
        onChange={handleChange}
      />
      {props.children}
    </>,
  ];
});
