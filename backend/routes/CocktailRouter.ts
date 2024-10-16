import express from 'express';
import Cocktail from '../models/Cocktails';
import permit from '../middleware/permit';
import authCheck from '../middleware/authCheck';

const cocktailRouter = express.Router();
cocktailRouter.use(express.json());

cocktailRouter.get('/', async (req, res) => {
  const findAllCocktails = await Cocktail.find()
  res.send(findAllCocktails)
})

cocktailRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  const findCocktail = await Cocktail.find({ _id: id })
  res.send(findCocktail)
})

cocktailRouter.patch('/:id/activate', authCheck, permit('admin'), async (req, res, next) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({ error: 'Id not found' });
  }

  try {
    const findCocktail = await Cocktail.findById(id)

    if (!findCocktail) {
      return res.status(404).send({ error: 'Cocktail not found' });
    }
    findCocktail.isPublished = true;

    await findCocktail.save();
    res.send({ success: 'Patched' });
  }catch (e) {
    next(e)
  }
})

cocktailRouter.post('/' , async (req, res, next) => {
  try {
    const cocktail = new Cocktail({
      userId: req.body.userId,
      name: req.body.name,
      image: req.body.image,
      recipe: req.body.recipe,
      isPublished: req.body.isPublished || false,
      ingredients: req.body.ingredients
    })

    await cocktail.save()
    res.send(cocktail)

  }catch(err) {
    next(err)
  }
})

export default cocktailRouter