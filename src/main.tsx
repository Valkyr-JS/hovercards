import React from "react";
import {
  PerformerCardDetails,
  PerformerCardTitle,
} from "@components/PerformerCard";
import "./styles.scss";

const { PluginApi } = window;

PluginApi.patch.instead("PerformerCard", function (props, _, Original) {
  return [<Original {...props} />];
});

PluginApi.patch.instead("PerformerCard.Details", function (props) {
  return [<PerformerCardDetails {...props} />];
});

PluginApi.patch.instead("PerformerCard.Title", function (props) {
  return [<PerformerCardTitle {...props} />];
});
