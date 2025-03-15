import React from "react";
import { IPerformerCardPropsExtended } from "@pluginTypes/valkyrperformercard";

const Title: React.FC<IPerformerCardPropsExtended> = ({ performer }) => {
  return (
    <div>
      <div className="performer-name">{performer.name}</div>
      {performer.disambiguation && (
        <div className="performer-disambiguation">
          {performer.disambiguation}
        </div>
      )}
    </div>
  );
};

export default Title;
