import api from './api';

export const searchRecipes = async (searchParams, callback) => {
  const response = await api.get('/recipes/complexSearch', 
  { 
    params: searchParams,
  });
  callback(response.data);
};

export const getRandomRecipes = async (count, callback) => {
  const response = await api.get('/recipes/random', 
  { 
    params: {
      number: count
    },
  });
  callback(response.data);
};

export const getRecipeImageLarge = (recipeId) => {
  return `https://spoonacular.com/recipeImages/${recipeId}-556x370.jpg`
}