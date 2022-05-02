import React from 'react';

import './renderAddCard.scss';

import { ReactComponent as PlusIcon } from '../../../../images/plusIcon.svg';

const RenderAddCard:React.FC = ():JSX.Element => {
   return (
      <li className="card cards-element__add-card">
         <button>
            <i>
               <PlusIcon/>
            </i>
         </button>
         <h5>Tap to add <br/> a new item</h5>
      </li>
   )
}

export default RenderAddCard;