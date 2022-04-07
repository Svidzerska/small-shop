import { configureStore} from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice'
import categoriesReducer from '../features/products/categoriesSlice';

export const store = configureStore({
  reducer: {
      products: productReducer,
      categories: categoriesReducer
   },
});


export type RootState = ReturnType<typeof store.getState>;

