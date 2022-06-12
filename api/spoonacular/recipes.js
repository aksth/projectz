import api from './api';

export const searchRecipes = async (searchParams, callback) => {
  try{
    const response = await api.get('/recipes/complexSearch', 
    { 
      params: {...searchParams, number: 1},
    });
    callback(response.data);
  } catch (err) {
    console.log(err);
    //callback(response.data);
  }
};

export const getRandomRecipes = async (callback) => {
  try{
    const response = await api.get('/recipes/random', 
    { 
      params: {
        number: 10,
      },
    });
    callback(response.data);
  } catch (err) {
    console.log(err);
    //callback(response.data);
  }
};

export const getRecipeImageLarge = (recipeId) => {
  return `https://spoonacular.com/recipeImages/${recipeId}-556x370.jpg`
}