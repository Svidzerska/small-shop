import image1 from '../images/image1.jpg';
import image2 from '../images/image2.jpg';
import { Products } from '../interfaces/Products';


const products: Products[] = [
{
   id: "1a",
   name : "Product 1",
   picture: image1,
   price: "100.00",
   currency: "USD",
   part: "item",
   warning: ""
},
{
   id: "2b",
   name : "Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor, ",
   picture: image2,
   price: "100.00",
   currency: "USD",
   part: "piece",
   warning: ""
},
{
   id: "3c",
   name : "Lorem ipsum dolor sit amet consectetur adipisicing.",
   picture: image2,
   price: "100.00",
   currency: "USD",
   part: "item",
   warning: ""
},
{
   id: "4d",
   name : "Lorem ipsum dolor sit amet consectetur adipisicing. Lorem ipsum dolor sit amet consectetur,",
   picture: image2,
   price: "100.00",
   currency: "USD",
   part: "piece",
   warning: ""
}

]


export default products;

