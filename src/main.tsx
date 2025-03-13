import React from "react";
import "./styles.scss";

const { PluginApi } = window;

PluginApi.patch.instead("PerformerCard", function (props, _, Original) {
  console.log("props", props);
  console.log("_", _);
  console.log("Original", Original);

  return [<Original {...props} />];
});
