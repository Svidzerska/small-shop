import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import Api from '../../api/getCategories';

import { Categories } from '../../interfaces/Categories';



interface InitialState {
   categoriesArray: object,
   correct:boolean,
   editCategory:boolean,
   addCategory: boolean
}

interface Data {
   data: Categories[]
}
 

const initialState = {
   categoriesArray: [],
   correct: false,
   editCategory: false,
   addCategory: false
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
      setCorrect: (state, action : PayloadAction<boolean>) => {
         state.correct = action.payload;
      }, 
      setCategories: (state, action : PayloadAction<Categories[]>) => {
         state.categoriesArray = action.payload;
      },
      setEditCategory: (state, action : PayloadAction<boolean>) => {
         state.editCategory = action.payload;
      },
      setAddCategory: (state, action : PayloadAction<boolean>) => {
         state.addCategory = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(getCategories.fulfilled, (state, action) => {
         console.log(action.payload);
         state.categoriesArray = action.payload;
      });
      builder.addCase(getCategories.pending, (state) => {
         state.categoriesArray = [{id:'00', warning:'please wait a moment'}];
         console.log('pending')});
      builder.addCase(getCategories.rejected, (state) => {
         state.categoriesArray = [];
         console.log('rejected')
      })
   }
},
)

export const { setCorrect, setCategories, setEditCategory, setAddCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;

