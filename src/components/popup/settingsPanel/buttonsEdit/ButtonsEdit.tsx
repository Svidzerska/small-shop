import React from "react";

import { ReactComponent as PlusIcon } from "../../../../images/plusIcon.svg";
import { ReactComponent as CheckIcon } from "../../../../images/checkIcon.svg";

interface Props {
  allButtonToDo: Function;
  isDisabled: boolean;
  switcher: boolean;
  plus: Function;
  check: Function;
}

const ButtonsEdit: React.FC<Props> = ({ allButtonToDo, isDisabled, switcher, plus, check }): JSX.Element => {
  return (
    <>
      <button
        onClick={(): void => allButtonToDo()}
        disabled={isDisabled}
        className={`settingsPanel__buttonAll ${switcher ? "on" : "off"}`}
      >
        All
      </button>
      <button onClick={(): void => plus()} disabled={isDisabled}>
        <i>
          <PlusIcon />
        </i>
      </button>
      <button onClick={(): void => check()} disabled={isDisabled}>
        <i>
          <CheckIcon />
        </i>
      </button>
    </>
  );
};

export default ButtonsEdit;
