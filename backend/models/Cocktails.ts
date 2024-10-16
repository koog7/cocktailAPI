import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CocktailSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  image:{
    type: String,
    required: true,
  },
  recipe:{
    type: String,
    required: true,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  ingredients:[{
    name:{
      type: String,
      required: true,
    },
    amount:{
      type: String,
      required: true,
    }
  }]
})

const Cocktail = mongoose.model('Cocktail', CocktailSchema)
export default Cocktail;