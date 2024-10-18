import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { NavLink } from 'react-router-dom';

interface CocktailCardProps {
  _id: string;
  image: string;
  name: string;
  displayName:string;
}

const CocktailCard: React.FC<CocktailCardProps> = ({ _id, image, name, displayName }) => {
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
          </Card>
        </NavLink>
    );
};

export default CocktailCard;