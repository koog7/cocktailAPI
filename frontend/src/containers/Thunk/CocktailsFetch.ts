import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosAPI from '../../axios/AxiosAPI.ts';

interface Ingridients {
    name: string;
    amount: string;
}

interface CocktailProps {
    _id: string;
    userId: {
        _id: string;
        displayName: string;
    };
    name: string;
    image: string;
    recipe:string;
    isPublished: boolean;
    ingredients: Ingridients[];
}

interface CocktailState {
    cocktail: CocktailProps[];
    loader: boolean;
    error: string | null;
}

const initialState: CocktailState = {
    cocktail: [],
    loader: false,
    error: null,
};


export const getAllCocktails = createAsyncThunk('cocktail/getAll', async () =>{
    const response = await axiosAPI.get('/cocktail')
    return response.data;
})

export const CocktailsSlice = createSlice({
    name:'Cocktail',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(getAllCocktails.pending, (state: CocktailState) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(getAllCocktails.fulfilled, (state: CocktailState, action) => {
            state.cocktail = action.payload;
            state.loader = false;
            state.error = null;
        });
        builder.addCase(getAllCocktails.rejected, (state: CocktailState , action) => {
            state.loader = false;
            state.error = action.payload as string;
        });
    }
})

export const CocktailsReducer = CocktailsSlice.reducer;