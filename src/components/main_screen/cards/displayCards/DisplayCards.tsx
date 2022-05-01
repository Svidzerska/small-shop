import React from "react";
import { useSelector, RootStateOrAny } from "react-redux";

import { Products } from "../../../../interfaces/Products";

const DisplayCards:React.FC = ():JSX.Element => {
   const cards:Products[] = useSelector((state : RootStateOrAny) => state.products.cardArray);

   const displayCards:JSX.Element[] = cards.map((card: Products) => {
      return (
         <li key={card.id} className="card">
            <p className="card__image">
               <img src={card.picture} alt=""/>
            </p>
            <h5 className="card__name">{card.name}</h5>
            <div className="card__price">
               <p>{card.currency} {card.price}</p>
               <p>{card.part}</p>
            </div>
         </li>
      )
   })

   return (<>
   {displayCards}
   </>);
}

export default DisplayCards;