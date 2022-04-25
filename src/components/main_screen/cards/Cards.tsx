import React, { useEffect } from "react";
import './cards.scss';

import { ReactComponent as Plus } from '../../../images/plusIcon.svg';

import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { Products } from "../../../interfaces/Products";



const Cards:React.FC = () => {
   
   const cards:Products[] = useSelector((state : RootStateOrAny) => state.products.cardArray);

   const displayCards:JSX.Element[] = cards.map((card: Products) => {
         return (
         <article key={card.id} className="card">
            <p className="card__image"><img src={card.picture} alt=""/></p>
            <h5 className="card__name">{card.name}</h5>
            <div className="card__price">
               <p>{card.currency} {card.price}</p>
               <p>{card.part}</p>
            </div>
         </article>
      )
   })

   const displayCardsEven:JSX.Element[] = displayCards.filter((item, index) => 
      index % 2 !== 0
   )

   const displayCardsOdd:JSX.Element[] = displayCards.filter((item, index) => 
      index % 2 === 0
   )

   const renderAddCard = ():JSX.Element => {
      return (
         <div className="card cards-element__add-card">
            <button>
               <i>
                  <Plus/>
               </i>
            </button>
            <h5>Tap to add <br/> a new item</h5>
         </div>
      )
   }


   return (
      <section className="cards-element__row">
         <div className="cards-element__column">
            {displayCardsOdd}
            {cards.length % 2 === 0 ? renderAddCard() : <></>}
         </div>
         <div className="cards-element__column">
            {displayCardsEven}
            {cards.length % 2 !== 0 ? renderAddCard() : <></>}
         </div>
      </section>
   )
};


export default Cards;