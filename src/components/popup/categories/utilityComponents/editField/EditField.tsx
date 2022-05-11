import React from "react";

import "./editField.scss";

import { Category } from "../../../../../interfaces/Category";

import ConfirmButtons from "../buttonsComponents/confirmButtons/ConfirmButtons";

interface Props {
  value: string;
  onChangeToDo: Function;
  onFocusToDo?: Function | undefined;
  check: Function;
  cancel: Function;
  charAmountLeft: number;
  category?: Category;
}

const EditField: React.FC<Props> = ({
  value,
  onChangeToDo,
  onFocusToDo,
  check,
  cancel,
  charAmountLeft,
  category,
}): JSX.Element => {
  return (
    <div className="editField">
      <div>
        <p className="editField__inputField">
          <input
            value={value}
            onChange={(e: React.FormEvent<HTMLInputElement>): void => onChangeToDo(e)}
            onFocus={(e: React.FocusEvent<HTMLInputElement>): void => onFocusToDo && onFocusToDo(e)}
            className="inputForEdit"
            autoFocus
          />
        </p>
        <ConfirmButtons className="editField__buttonResult" category={category} check={check} cancel={cancel} />
      </div>
      {<p className="editField__char-amount">{charAmountLeft} char. left</p>}
    </div>
  );
};

export default EditField;
