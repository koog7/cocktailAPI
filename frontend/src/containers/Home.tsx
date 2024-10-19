import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store.ts';
import { useEffect } from 'react';
import { getAllCocktails } from './Thunk/CocktailsFetch.ts';
import CocktailCard from '../components/CocktailCard.tsx';
import { Box, Typography } from '@mui/material';

const Home = () => {

    const dispatch = useDispatch<AppDispatch>();
    const allCocktails = useSelector((state: RootState) => state.Cocktail.cocktail);
    const userData = useSelector((state: RootState) => state.User.user);

    useEffect(() => {
        dispatch(getAllCocktails());
    }, [dispatch]);

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
                                isPublished={cocktail.isPublished}
                            />
                        ))
                    ) : (
                        <Box textAlign="center" sx={{margin:'0 auto'}} mt={4}>
                            <Typography variant="h5" color="white">
                                The list of cocktail recipes is empty
                            </Typography>
                            <Typography variant="body1" color="white">
                                Please add new cocktail recipes!
                            </Typography>
                        </Box>
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
                                isPublished={cocktail.isPublished}
                            />
                        ))
                    ) : (
                        <Box textAlign="center" mt={4} sx={{margin:'0 auto'}}>
                            <Typography variant="h5" color="white">
                                The list of cocktail recipes is empty
                            </Typography>
                            <Typography variant="body1" color="white">
                                Please add new cocktail recipes!
                            </Typography>
                        </Box>
                    )
                )}
            </div>
        </div>
    );
};

export default Home;