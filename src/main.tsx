import React from "react";
import "./styles.scss";
import { PerformerCardDetails } from "./components/PerformerCard";

const { PluginApi } = window;

PluginApi.patch.instead("PerformerCard", function (props, _, Original) {
  console.log("props", props);

  return [<Original {...props} />];
});

PluginApi.patch.instead("PerformerCard.Details", function (props) {
  return [<PerformerCardDetails {...props} />];
});
