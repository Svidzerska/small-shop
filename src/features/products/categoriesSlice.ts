import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import Api from '../../api/getCategories';

import { Categories } from '../../interfaces/Categories';



interface InitialState {
   categoriesArray: object,
   correct:boolean,
   editingCategory:boolean,
   toAddNewCategory: boolean
}

interface Data {
   data: Categories[]
}


const initialState = {
   categoriesArray: [],
   correct: false,
   editingCategory: false,
   toAddNewCategory: false
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
      setEditingCategory: (state, action : PayloadAction<boolean>) => {
         state.editingCategory = action.payload;
      },
      setToAddNewCategory: (state, action : PayloadAction<boolean>) => {
         state.toAddNewCategory = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(getCategories.fulfilled, (state, action) => {
         console.log(action.payload);
         state.categoriesArray = action.payload;
      });
      builder.addCase(getCategories.pending, (state) => {
         console.log('pending')});
      builder.addCase(getCategories.rejected, (state) => {
         console.log('rejected')});
   }
},
)

export const { setCorrect, setCategories, setEditingCategory, setToAddNewCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;

