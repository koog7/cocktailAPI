import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store.ts';
import { useEffect } from 'react';
import { getAllCocktails } from './Thunk/CocktailsFetch.ts';
import CocktailCard from '../components/CocktailCard.tsx';

const Home = () => {

    const dispatch = useDispatch<AppDispatch>();
    const allCocktails = useSelector((state: RootState) => state.Cocktail.cocktail)
    const userData = useSelector((state: RootState) => state.User.user)

    useEffect(() => {
        dispatch(getAllCocktails());
    }, [dispatch]);


    useEffect(() => {
        console.log(userData);
    }, [userData]);
    return (
        <div>
            <div style={{ display: 'flex', gap: '20px', marginTop:'50px' }}>
                {userData?.role === 'admin' ? (
                    allCocktails.length > 0 ? (
                        allCocktails.map(cocktail => (
                            <CocktailCard
                                key={cocktail._id}
                                _id={cocktail._id}
                                image={cocktail.image}
                                name={cocktail.name}
                                displayName={cocktail.userId.displayName}
                            />
                        ))
                    ) : (
                        <h1>List of cocktail recipes are empty</h1>
                    )
                ) : (
                    allCocktails.filter(cocktail => cocktail.isPublished).length > 0 ? (
                        allCocktails.filter(cocktail => cocktail.isPublished).map(cocktail => (
                            <CocktailCard
                                key={cocktail._id}
                                _id={cocktail._id}
                                image={cocktail.image}
                                name={cocktail.name}
                                displayName={cocktail.userId.displayName}
                            />
                        ))
                    ) : (
                        <h1>List of cocktail recipes are empty</h1>
                    )
                )}

            </div>
        </div>
    );
};

export default Home;