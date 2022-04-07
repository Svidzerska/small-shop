import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import Api from '../../api/getCategories';


interface InitialState {
   categoriesArray: object,
}

interface Data {
   data: Array<string>
}
 

const initialState = {
   categoriesArray: [],
} as InitialState



export const getCategories = createAsyncThunk<
Data
>(
   'categories/getCategories',
   async () => {
      return Api.getCategories()?.then(data => {
         console.log(data);
         return data;  //payload - data
      }) as Promise<Data>;
   },
)


export const categoriesSlice = createSlice({
   name: 'categories',
   initialState,
   reducers: { 

   },
   extraReducers: (builder) => {
      builder.addCase(getCategories.fulfilled, (state, action) => {
         console.log(action.payload);
         state.categoriesArray = action.payload;
      });
      builder.addCase(getCategories.pending, (state) => {
         state.categoriesArray = [{warning : 'please wait a moment'}];
         console.log('pending')});
      builder.addCase(getCategories.rejected, (state) => {
         state.categoriesArray = [];
         console.log('rejected')
      })
   }
},
)

export default categoriesSlice.reducer;

