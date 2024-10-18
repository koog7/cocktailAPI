import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosAPI from '../../axios/AxiosAPI.ts';

interface Ingridients {
    name: string;
    amount: string;
}

export interface CocktailProps {
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

interface ICocktail {
    userId: string;
    name: string;
    recipe: string;
    photo: File | null;
    ingredients: {
        name: string;
        amount: string;
    }[];
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

export const getUserCocktail = createAsyncThunk('cocktail/getUserCocktail', async (id:string) =>{
    const response = await axiosAPI.get(`/cocktail/userId/${id}`)
    return response.data;
})

export const getOneCocktail = createAsyncThunk('cocktail/getOne', async (id:string) =>{
    const response = await axiosAPI.get(`/cocktail/${id}`)
    return response.data;
})

export const activateRecipe = createAsyncThunk('cocktail/activate', async (id:string) =>{
    await axiosAPI.patch(`/cocktail/${id}/activate`)
})

export const postNewCocktail = createAsyncThunk<void , ICocktail , { rejectValue: string }>('cocktail/postNew' , async(ICocktail, { rejectWithValue }) =>{
    try {
        const formData = new FormData();
        formData.append('userId', ICocktail.userId);
        formData.append('name', ICocktail.name);
        if (ICocktail.photo) {
            formData.append('image', ICocktail.photo);
        }
        formData.append('recipe', ICocktail.recipe);
        ICocktail.ingredients.forEach((ingredient, index) => {
            formData.append(`ingredients[${index}][name]`, ingredient.name);
            formData.append(`ingredients[${index}][amount]`, ingredient.amount);
        });

        await axiosAPI.post('/cocktail', formData)
    }catch (error) {
        return rejectWithValue('An unknown error occurred');
    }
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
        builder.addCase(getUserCocktail.pending, (state: CocktailState) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(getUserCocktail.fulfilled, (state: CocktailState, action) => {
            state.cocktail = action.payload;
            state.loader = false;
            state.error = null;
        });
        builder.addCase(getUserCocktail.rejected, (state: CocktailState , action) => {
            state.loader = false;
            state.error = action.payload as string;
        });
        builder.addCase(getOneCocktail.pending, (state: CocktailState) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(getOneCocktail.fulfilled, (state: CocktailState, action) => {
            state.cocktail = action.payload;
            state.loader = false;
            state.error = null;
        });
        builder.addCase(getOneCocktail.rejected, (state: CocktailState , action) => {
            state.loader = false;
            state.error = action.payload as string;
        });
        builder.addCase(activateRecipe.pending, (state: CocktailState) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(activateRecipe.fulfilled, (state: CocktailState) => {
            state.loader = false;
            state.error = null;
        });
        builder.addCase(activateRecipe.rejected, (state: CocktailState , action) => {
            state.loader = false;
            state.error = action.payload as string;
        });
    }
})

export const CocktailsReducer = CocktailsSlice.reducer;