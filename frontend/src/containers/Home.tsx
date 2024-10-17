import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store.ts';
import { useEffect } from 'react';
import { getAllCocktails } from './Thunk/CocktailsFetch.ts';
import CocktailCard from '../components/CocktailCard.tsx';

const Home = () => {

    const dispatch = useDispatch<AppDispatch>();
    const allCocktails = useSelector((state: RootState) => state.Cocktail.cocktail)

    useEffect(() => {
        dispatch(getAllCocktails());
    }, [dispatch]);

    useEffect(() => {
        console.log(allCocktails)
    }, [allCocktails]);

    return (
        <div>
            <div style={{ display: 'flex', gap: '20px', marginTop:'50px' }}>
                {allCocktails.map(cocktail => (
                    <CocktailCard
                        key={cocktail._id}
                        _id={cocktail._id}
                        image={cocktail.image}
                        name={cocktail.name}
                        displayName={cocktail.userId.displayName}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;