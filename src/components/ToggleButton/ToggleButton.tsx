import React from "react";
import { faIdBadge as iconOff } from "@fortawesome/free-regular-svg-icons";
import { faIdBadge as iconOn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ToggleButton: React.FC<ToggleButtonProps> = (props) => {
  const icon = props.active ? iconOn : iconOff;
  const title =
    (props.active ? "Hide" : "Show") + " all performer hover content";

  return (
    <button
      type="button"
      {...props}
      className="minimal d-flex align-items-center btn btn-primary "
      title={title}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default ToggleButton;

interface ToggleButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  /** Whether displaying all hover content is active. */
  active: boolean;
}
