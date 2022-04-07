import image1 from '../images/image1.jpg';
import image2 from '../images/image2.jpg';

interface Products {
   name : string,
   picture: string,
   price: string,
   currency: string,
   part: string,
}



const products: Products[] = [
{
   name : "Product 1",
   picture: image1,
   price: "100.00",
   currency: "USD",
   part: "item",
},
{
   name : "Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor, ",
   picture: image2,
   price: "100.00",
   currency: "USD",
   part: "piece",
},
{
   name : "Lorem ipsum dolor sit amet consectetur adipisicing.",
   picture: image2,
   price: "100.00",
   currency: "USD",
   part: "item",
}
]


export default products;

