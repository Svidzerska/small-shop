import React from "react";

import { ReactComponent as PensilIcon } from '../../../../images/pensilIcon.svg';

interface Props {
   onClickToDo: Function
}

const ButtonEditModeOn: React.FC<Props> = ({onClickToDo}): JSX.Element => {
      return (
         <>
            <button onClick={(): void => onClickToDo()}>
               <i>
                  <PensilIcon/> 
               </i>
            </button>
         </>
      )
}

export default ButtonEditModeOn;
