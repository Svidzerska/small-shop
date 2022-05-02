import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";

import Api from '../../api/getCategories';

import { Category } from '../../interfaces/Category';

interface InitialState {
   categoriesArray: object,
   categoriesTemporaryArray: object,
   editMode:boolean,
   editingCategory:boolean,
   toAddNewCategory: boolean,
   chooseAll: boolean
}

interface Data {
   data: Category[]
}

const initialState:InitialState = {
   categoriesArray: [],
   categoriesTemporaryArray: [],
   editMode: false,
   editingCategory: false,
   toAddNewCategory: false,
   chooseAll: false
}

export const getCategories = createAsyncThunk<
Data
>(
   'categories/getCategories',
   async () => {
      return Api.getCategories()?.then(data => {
         return data;  //payload - data
      }) as Promise<Data>;
   },
)

export const categoriesSlice = createSlice({
   name: 'categories',
   initialState,
   reducers: {
      setEditMode: (state, action : PayloadAction<boolean>) => {
         state.editMode = action.payload;
      },
      setCategories: (state, action : PayloadAction<Category[]>) => {
         state.categoriesArray = action.payload;
      },
      setTemporaryCategories: (state, action : PayloadAction<Category[]>) => {
         state.categoriesTemporaryArray = action.payload;
      },
      setEditingCategory: (state, action : PayloadAction<boolean>) => {
         state.editingCategory = action.payload;
      },
      setToAddNewCategory: (state, action : PayloadAction<boolean>) => {
         state.toAddNewCategory = action.payload;
      },
      setChooseAll: (state, action : PayloadAction<boolean>) => {
         state.chooseAll = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(getCategories.fulfilled, (state, action) => {
         state.categoriesArray = action.payload;
      });
      builder.addCase(getCategories.pending, (state) => {
         console.log('pending')});
      builder.addCase(getCategories.rejected, (state) => {
         console.log('rejected')});
   }
},
)

export const { setEditMode,
   setCategories,
   setTemporaryCategories,
   setEditingCategory,
   setToAddNewCategory,
   setChooseAll
   } = categoriesSlice.actions;

export default categoriesSlice.reducer;

