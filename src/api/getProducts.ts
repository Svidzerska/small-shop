import products from "../mockData/products";
import { wait } from "../utils/wait";

const Api = {
   getProducts: () => {
      return wait(3000).then(() => {
         return products;
      });
   },
}

export default Api;



