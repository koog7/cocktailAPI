import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store.ts';
import { activateRecipe } from '../containers/Thunk/CocktailsFetch.ts';

interface CocktailCardProps {
  _id: string;
  image: string;
  name: string;
  displayName:string;
  isPublished: boolean;
}

const CocktailCard: React.FC<CocktailCardProps> = ({ _id, image, name, displayName, isPublished }) => {

    const userData = useSelector((state: RootState) => state.User.user)
    const dispatch = useDispatch<AppDispatch>();

    const clickActivateRecipe = async (id:string) => {
        await dispatch(activateRecipe(id))
        location.reload()
    }
    console.log(_id , '-' , isPublished)
    return (
        <NavLink to={`/cocktail/${_id}`} style={{textDecoration:'none', color:'white'}}>
          <Card sx={{ minWidth: 200 }}>
            <CardMedia
                component="img"
                image={`http://localhost:8000/images/${image}`}
                alt={name}
                sx={{
                    height: '200px',
                    width: '200px',
                }}
            />
            <CardContent style={{paddingBottom:'10px'}}>
              <Typography gutterBottom variant="h5" component="div">
                {name}
              </Typography>
              <p style={{margin:'20px 0 0 0'}}>
                By: <strong>{displayName}</strong>
              </p>
            </CardContent>
              {userData && userData.role === 'admin' && !isPublished && (
                  <div>
                      <button
                          onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              clickActivateRecipe(_id);
                          }}
                          style={{ backgroundColor: 'green', margin: '10px' }}
                      >
                          Publish
                      </button>
                  </div>
              )}
          </Card>
        </NavLink>
    );
};

export default CocktailCard;