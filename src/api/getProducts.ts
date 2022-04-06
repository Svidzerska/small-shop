import products from "../mockData/products";

const Api = {
   getProducts: () => {
      return wait(3000).then(() => {
         return products;
      });
   },
}

function wait(duration : number) {
   return new Promise((resolve, reject) => {
      if (duration < 0) {
         reject(new Error("wrong value"));
      }
      setTimeout(resolve, duration);
   });
}


export default Api;



