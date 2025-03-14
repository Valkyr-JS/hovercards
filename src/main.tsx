import React from "react";
import "./styles.scss";

const { PluginApi } = window;

PluginApi.patch.instead("PerformerCard", function (props, _, Original) {
  console.log("props", props);

  return [<Original {...props} />];
});

PluginApi.patch.instead("PerformerCard.Details", function (props, _, Original) {
  console.log("Details", props.performer.name);
  return [<Original {...props} />];
});
