import image1 from '../images/image1.jpg';
import image2 from '../images/image2.jpg';
import { Product } from '../interfaces/Product';


const products: Product[] = [
{
   id: 1,
   name : "Product 1",
   picture: image1,
   price: "100.00",
   currency: "USD",
   part: "item"
},
{
   id: 2,
   name : "Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor, ",
   picture: image2,
   price: "100.00",
   currency: "USD",
   part: "piece"
},
{
   id: 3,
   name : "Lorem ipsum dolor sit amet consectetur adipisicing.",
   picture: image2,
   price: "100.00",
   currency: "USD",
   part: "item"
},
{
   id: 4,
   name : "Lorem ipsum dolor sit amet consectetur adipisicing. Lorem ipsum dolor sit amet consectetur,",
   picture: image2,
   price: "100.00",
   currency: "USD",
   part: "piece"
}
]

export default products;

