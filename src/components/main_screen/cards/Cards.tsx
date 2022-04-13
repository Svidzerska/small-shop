import React, { useEffect } from "react";
import './cards.scss';
import plus from '../../../images/plus-square-fill.svg';

import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { Products } from "../../../interfaces/Products";


const Cards:React.FC = () => {

   const dispatch = useDispatch();

   const cards:Products[] = useSelector((state : RootStateOrAny) => state.products.cardArray);

   useEffect(() => {
      console.log(cards);
   }, [cards]);


   const displayCards:JSX.Element[] = cards.map((card: Products) => {
         return (
         <div key={card.id} className="card">
            <div className="card__image"><img src={card.picture} alt=""/></div>
            <div className="card__name">{card.warning !== "" ? card.warning : card.name}</div>
            <div className="card__price">
               <p>{card.currency} {card.price}</p>
               <p>{card.part}</p>
            </div>
         </div>
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
                  <p><button><img src={plus} alt=""/></button></p>
                  <p>Tap to add <br/> a new item</p>
         </div>
      )
   }


   return (
      <main className="cards-element">
         <div className="cards-element__row">
            <div className="cards-element__column">
               {displayCardsOdd}
               {cards.length % 2 === 0 ? renderAddCard() : <></>}
            </div>
            <div className="cards-element__column">
               {displayCardsEven}
               {cards.length % 2 !== 0 ? renderAddCard() : <></>}
            </div>
         </div>
      </main>
   )
};


export default Cards;