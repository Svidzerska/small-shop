import { Products } from "../../../../interfaces/Products";

const CardElement:React.FC<Products> = (props):JSX.Element => {
   const {
      id,
      name,
      picture,
      currency,
      price,
      part,
   } = props;

   return (
      <li className="card">
         <p className="card__image">
            <img src={picture} alt=""/>
         </p>
         <h5 className="card__name">{name}</h5>
         <div className="card__price">
            <p>{currency} {price}</p>
            <p>{part}</p>
         </div>
      </li>
   )
}

export default CardElement;


