import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store.ts';
import { postNewCocktail } from './Thunk/CocktailsFetch.ts';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CreateForm = () => {

    interface ICocktail {
        userId: string;
        name: string;
        recipe: string;
        ingredients: {
            name: string;
            amount: string;
        }[];
    }


    const userData = useSelector((state: RootState) => state.User.user)
    const navigate = useNavigate();

    useEffect(() => {
        if(!userData){
            navigate('/')
        }
    }, [userData , navigate]);

    if(!userData){
        return;
    }

    const [cocktail, setCocktail] = useState<ICocktail>(
        {
            userId: userData._id,
            name: '',
            recipe: '',
            ingredients:[{
                name: '',
                amount: '',
            }],
        }
    );
    const urlFile = useRef(null)
    const [file, setFile] = useState<File | null>(null);
    const dispatch = useDispatch();
    const [createAlert, setCreateAlert] = useState<boolean>(false);


    const addIngredient = () => {
        setCocktail(cocktail => ({
            ...cocktail,
            ingredients: [
                ...cocktail.ingredients,
                { name: '', amount: '' }
            ]
        }));
    };
    const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCocktail({
            ...cocktail,
            [name]: value,
        })
    }
    const onIngChange = (event: React.ChangeEvent<HTMLInputElement> , index: number) =>{
        const {name , value} = event.target;
        setCocktail((prev) => {
            const ingredientsCopy = [...prev.ingredients];
            ingredientsCopy[index] = {...ingredientsCopy[index], [name]: value};

            return {
                ...prev,
                ingredients: ingredientsCopy
            };
        })
    }
    const onIngDelete = (index: number)=>{
        setCocktail((prev) => {
            return {
                ...prev,
                ingredients: prev.ingredients.filter((_,i) => i !== index)
            }
        })
    }

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target.files

        if (fileInput && fileInput[0]) {
            setFile(fileInput[0])
        } else {
            setFile(null)
        }
    }

    const onSubmitData = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (cocktail) {
            const cocktailData = { ...cocktail, photo: file };
            dispatch(postNewCocktail(cocktailData));
            setCreateAlert(true)

            setTimeout(() => {
                navigate('/')
            }, 5000);
        }
    }


    return (
        <div className="cocktail-form">
            <form onSubmit={onSubmitData}>
                <div className="form-field">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={cocktail.name}
                        onChange={onFieldChange}
                        className="form-input"
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="recipe">Recipe:</label>
                    <input
                        type="text"
                        name="recipe"
                        required
                        value={cocktail.recipe}
                        onChange={onFieldChange}
                        className="form-input"
                    />
                </div>
                <div className="form-field">
                    <label>Add Ingredient:</label>
                    {cocktail.ingredients.map((ingredient, index) => (
                        <div className="ingredient-row" key={`ingredient_${index}`}>
                            <input
                                placeholder="Name"
                                value={ingredient.name}
                                name="name"
                                required
                                onChange={(event) => onIngChange(event, index)}
                                className="form-input"
                            />
                            <input
                                placeholder="Amount"
                                value={ingredient.amount}
                                name="amount"
                                required
                                onChange={(event) => onIngChange(event, index)}
                                className="form-input"
                            />
                            {index > 0 && (
                                <button
                                    type="button"
                                    className="delete-button"
                                    onClick={() => onIngDelete(index)}
                                >
                                    <span role="img" aria-label="delete">🗑️</span>
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={addIngredient}>
                        Add Ingredient
                    </button>
                </div>
                <input
                    type="file"
                    accept="image/*"
                    ref={urlFile}
                    required
                    onChange={onFileChange}
                    style={{ marginTop: '20px' }}
                />
                <div className="form-field">
                    <button type="submit">Save</button>
                </div>
                <Alert style={{display:createAlert?'flex': 'none'}} severity="info">The cocktail will be added to the page after moderation. Redirection in 5 seconds</Alert>
            </form>
        </div>
    );
};

export default CreateForm;