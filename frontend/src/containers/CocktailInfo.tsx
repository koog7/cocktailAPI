import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store.ts';
import { useEffect } from 'react';
import { getOneCocktail } from './Thunk/CocktailsFetch.ts';

const CocktailInfo = () => {
    const {id} = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const allCocktails = useSelector((state: RootState) => state.Cocktail.cocktail)

    useEffect(() => {
        console.log(allCocktails)
    }, [allCocktails]);

    useEffect(() => {
        if(id){
            dispatch(getOneCocktail(id))
        }
    }, [dispatch, id]);
    return (
        <div style={{ border: '1px solid #ddd', padding: '20px', maxWidth: '600px', margin: '20px auto' }}>
            <h2>{allCocktails[0]?.name}</h2>
            <p>Автор: {allCocktails[0]?.userId.displayName}</p>
            <img src={`http://localhost:8000/images/${allCocktails[0]?.image}`} alt={allCocktails[0]?.name} style={{ width: '30%', height: 'auto' }} />
            <h3>Recipe:</h3>
            <p>{allCocktails[0]?.recipe}</p>
            <h4>Ingredients:</h4>
            <ul>
                {allCocktails[0]?.ingredients.map((ingredient, index) => (
                    <li key={index}>
                        {ingredient.name} - {ingredient.amount}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CocktailInfo;