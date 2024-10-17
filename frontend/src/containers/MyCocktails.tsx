import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store.ts';
import { getUserCocktail } from './Thunk/CocktailsFetch.ts';
import CocktailCard from '../components/CocktailCard.tsx';
import { useNavigate } from 'react-router-dom';

const MyCocktails = () => {

    const dispatch = useDispatch<AppDispatch>();
    const allCocktails = useSelector((state: RootState) => state.Cocktail.cocktail)
    const userData = useSelector((state: RootState) => state.User.user)
    const navigate = useNavigate();

    useEffect(() => {
        if(userData){
            dispatch(getUserCocktail(userData?._id));
        }
    }, [dispatch]);

    useEffect(() => {
      if(!userData?.token){
        navigate('/')
      }
    }, [userData?.token]);

    return (
        <div>
            <div style={{ display: 'flex', gap: '20px', marginTop: '50px' }}>
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

export default MyCocktails;