import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";

import { Product } from "../../interfaces/Product";

import Api from '../../api/getProducts';


interface InitialState {
   cardArray: object,
   popup : boolean
}

interface Data {
   data: Product[],
}
 
const initialState:InitialState = {
   cardArray: [],
   popup: false
}

export const getProducts = createAsyncThunk<
Data
>(
   'products/getProducts',
   async () => {
      return Api.getProducts()?.then(data => {
         return data;  //payload - data
      }) as Promise<Data>;
   },
)

export const productsSlice = createSlice({
   name: 'products',
   initialState,
   reducers: { 
      setPopup: (state, action : PayloadAction<boolean>) => {
         state.popup = action.payload
      }
   },
   extraReducers: (builder) => {
      builder.addCase(getProducts.fulfilled, (state, action) => {
         state.cardArray = action.payload;
      });
      builder.addCase(getProducts.pending, (_state) => {
         console.log('pending')});
      builder.addCase(getProducts.rejected, (_state) => {
         console.log('rejected')
      })
   }
},
)

export const { setPopup } = productsSlice.actions;
export default productsSlice.reducer;