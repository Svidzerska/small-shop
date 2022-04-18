import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import Api from '../../api/getProducts';


interface InitialState {
   cardArray: object,
   popup : boolean

}

interface Data {
   data: Array<object>
}
 

const initialState = {
   cardArray: [],
   popup: false
} as InitialState



export const getProducts = createAsyncThunk<
Data
>(
   'products/getProducts',
   async () => {
      return Api.getProducts()?.then(data => {
         console.log(data);
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
         console.log(action.payload);
         state.cardArray = action.payload;
      });
      builder.addCase(getProducts.pending, (state) => {
         // state.cardArray = [{id: "00", warning : 'please wait a moment'}];
         console.log('pending')});
      builder.addCase(getProducts.rejected, (state) => {
         // state.cardArray = [];
         console.log('rejected')
      })
   }
},
)

export const { setPopup } = productSlice.actions;
export default productSlice.reducer;

