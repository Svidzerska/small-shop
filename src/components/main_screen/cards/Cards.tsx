import React from "react";
import { useSelector, RootStateOrAny } from "react-redux";

import './cards.scss';

import { Products } from "../../../interfaces/Products";

import RenderAddCard from "./renderAddCard/RenderAddCard";

const Cards:React.FC = ():JSX.Element => {
   const cards:Products[] = useSelector((state : RootStateOrAny) => state.products.cardArray);

   const displayCards:JSX.Element[] = cards.map((card: Products) =>
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

   const displayCardsEven:JSX.Element[] = displayCards.filter((_item, index) =>
      index % 2 !== 0
   )

   const displayCardsOdd:JSX.Element[] = displayCards.filter((_item, index) =>
      index % 2 === 0
   )

   return (
      <section className="cards-element__row">
         <ul className="cards-element__column">
            {displayCardsOdd}
            {cards.length % 2 === 0 && <RenderAddCard/>}
         </ul>
         <ul className="cards-element__column">
            {displayCardsEven}
            {cards.length % 2 !== 0 && <RenderAddCard/>}
         </ul>
      </section>
   )
};

export default Cards;