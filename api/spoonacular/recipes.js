import api from './api';

export const searchRecipes = async (searchParams, callback) => {
  //await new Promise(r => setTimeout(r, 5000));
  try{
    const response = await api.get('/recipes/complexSearch', 
    { 
      params: {...searchParams, number: 1, addRecipeNutrition: true},
    });
    //console.log(response.data);
    callback(response.data);
  } catch (err) {
    console.log(err);
    //callback(response.data);
  }
};

export const getRecipeById = async (id, callback) => {
  //await new Promise(r => setTimeout(r, 5000));
  try{
    const response = await api.get(`/recipes/${id}/information`, 
    { 
      params: {includeNutrition: true},
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

export const getRecipeImageSmall = (recipeId) => {
  return `https://spoonacular.com/recipeImages/${recipeId}-240x150.jpg`
}