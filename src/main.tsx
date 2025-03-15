import React from "react";
import { default as cx } from "classnames";
import { PerformerCardImage } from "@components/PerformerCard";
import "./styles.scss";

const { PluginApi } = window;

PluginApi.patch.instead("PerformerCard", function (props, _, Original) {
  const wrapperClasses = cx("valkyr-performer-card");
  return [
    <div className={wrapperClasses}>
      <Original {...props} />
    </div>,
  ];
});

PluginApi.patch.instead("PerformerCard.Image", function (props) {
  return [<PerformerCardImage {...props} />];
});
