import React from "react";
import { useSelector, RootStateOrAny } from "react-redux";

import './cards.scss';

import { Product } from "../../../interfaces/Product";

import CardElement from "./cardElement/CardElement";
import RenderAddCard from "./renderAddCard/RenderAddCard";

const Cards: React.FC = (): JSX.Element => {
   const cards: Product[] = useSelector((state: RootStateOrAny) => state.products.cardArray);

   const displayCards: JSX.Element[] = cards.map((card: Product) =>
      <CardElement key={card.id}
         card={card}
      />
   )

   const displayCardsEven: JSX.Element[] = displayCards.filter((_item, index) =>
      index % 2 !== 0
   )

   const displayCardsOdd: JSX.Element[] = displayCards.filter((_item, index) =>
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