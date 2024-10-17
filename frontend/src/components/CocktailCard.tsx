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
        <NavLink to={`/${_id}`} style={{textDecoration:'none', color:'white'}}>
          <Card sx={{ minWidth: 200 }}>
            <CardMedia
                component="img"
                height="140"
                image={image}
                alt={name}
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