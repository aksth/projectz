import api from './api';
import Toast from 'react-native-root-toast';

export const searchRecipes = async (searchParams, callback) => {
  //await new Promise(r => setTimeout(r, 5000));
  try{
    const response = await api.get('/recipes/complexSearch', 
    { 
      params: {...searchParams, number: 10, addRecipeNutrition: true},
    });
    //console.log(response.data);
    callback(response.data);
  } catch (err) {
    console.log(err);
    if((err.response.status) === 402) {
      Toast.show(`Quota for free API exausted! Contact the admin!`, {
        duration: Toast.durations.SHORT,
        animation: true,
        hideOnPress: true,
      });
    }
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
    if((err.response.status) === 402) {
      Toast.show(`Quota for free API exausted! Contact the admin!`, {
        duration: Toast.durations.SHORT,
        animation: true,
        hideOnPress: true,
      });
    }
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
    if((err.response.status) === 402) {
      Toast.show(`Quota for free API exausted! Contact the admin!`, {
        duration: Toast.durations.SHORT,
        animation: true,
        hideOnPress: true,
      });
    }
    //callback(response.data);
  }
};

export const getRecipeImageLarge = (recipeId) => {
  return `https://spoonacular.com/recipeImages/${recipeId}-556x370.jpg`
}

export const getRecipeImageSmall = (recipeId) => {
  return `https://spoonacular.com/recipeImages/${recipeId}-240x150.jpg`
}