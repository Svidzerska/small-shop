import React from 'react';

import { ReactComponent as CheckIcon } from '../../../../../images/checkIcon.svg';
import { ReactComponent as XMarkInSquareIcon } from  '../../../../../images/squareXmarkIcon.svg';

import { Category } from '../../../../../interfaces/Category';

interface Props {
   category: Category,
   check: Function,
   cancel: Function,
}

const ConfirmButtons: React.FC<Props> = (props): JSX.Element => {
   const {
      category,
      check,
      cancel
   } = props;

   return (
      <>
         <button onClick={(e) => check(e, category.id)}>
            <i>
               <CheckIcon/>
            </i>
         </button>
         <button onClick={(e) => cancel(e)}>
            <i>
               <XMarkInSquareIcon/>
            </i>
         </button>
      </>
   )
}

export default ConfirmButtons;