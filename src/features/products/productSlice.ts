import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import Api from '../../api/getProducts';

interface InitialState {
   cardArray: object,
   popup : boolean
}

interface Data {
   data: object[],
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

export const productSlice = createSlice({
   name: 'product',
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
      builder.addCase(getProducts.pending, (state) => {
         console.log('pending')});
      builder.addCase(getProducts.rejected, (state) => {
         console.log('rejected')
      })
   }
},
)

export const { setPopup } = productSlice.actions;
export default productSlice.reducer;