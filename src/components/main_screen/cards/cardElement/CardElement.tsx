import { Product } from "../../../../interfaces/Product";

interface Props {
   card:Product,
}

const CardElement:React.FC<Props> = (props):JSX.Element => {
   const {
      card,
   } = props;

   return (
      <li className="card">
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
}

export default CardElement;


