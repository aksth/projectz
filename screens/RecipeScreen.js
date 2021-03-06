import { View, StyleSheet, Text, ScrollView, TouchableOpacity, ActivityIndicator, Image, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { MyTheme } from '../styles/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
//import { testdaterecipe } from '../api/spoonacular/testdatarecipe';
import { getRecipeById, getRecipeImageLarge } from '../api/spoonacular/recipes';
import { getHsvColor } from '../styles/utils';
import { getAllValues } from '../storage/store';
import { updateMealPlan } from '../firebase/db';

const RecipeScreen = ({route, navigation}) => {

  const [resultState, setResultState] = useState({
    loading: false,
    success: true,
    error: false,
  });

  const [recipe, setRecipe] = useState({
    id: '',
    title: '',
    healthScore: '',
    extendedIngredients: [],
    analyzedInstructions: [],
    diets: [],
    cuisines: [],
    nutrition: {
      nutrients: [],
    }
  });

  const [sessionData, setSessionData] = useState({
    loggedIn: false,
    email: '',
  });
    
  useEffect(() => {
    setResultState({loading: true, success: false, error: false});
    getRecipeById(route.params.recipeId, (data) => {
      setResultState({loading: false, success: true, error: false});
      setRecipe(data);
    });
  }, []);
  
  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {
      getAllValues((values) => {
        setSessionData({
          loggedIn: values.loggedIn,
          email: values.email,
        });
      });
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;

  }, [navigation]);

  const renderIngredients = () => {
    const ingredients = [];
    for(let ingredient of recipe.extendedIngredients) {
      ingredients.push(<Text key={ingredient.id} style={styles.ingredientText}>{ingredient.original}</Text>);
    }
    return ingredients;
  }
  
  const renderInstructions = () => {
    const instructions = [];
    let count = 1;
    for(let instruction of recipe.analyzedInstructions[0].steps) {
      instructions.push(<Text key={count} style={styles.instructionText}>{instruction.step}</Text>);
      count++;
    }
    return instructions;
  }
  
  const renderDiets = () => {
    if(recipe.diets.length <= 0) return;
    const diets = [];
    let count = 100;
    for(let diet of recipe.diets) {
      diets.push(<Text key={count} style={{...styles.tagText, marginRight: 10, marginBottom: 5}}>{diet}</Text>);
      count++;
    }
    return (
      <View style={{flex: 1}}>
          <Text style={styles.sectionHeader}>Diets</Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {diets}
          </View>
      </View>
    );
  }
  
  const renderCuisines = () => {
    if(recipe.cuisines.length <= 0) return;
    const cuisines = [];
    let count = 200;
    for(let cuisine of recipe.cuisines) {
      cuisines.push(<Text key={count} style={{...styles.tagText, marginLeft: 10, marginBottom: 5}}>{cuisine}</Text>);
      count++;
    }
    return (
      <View style={{flex: 1}}>
          <Text style={{...styles.sectionHeader, textAlign: 'right'}}>Cuisines</Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end'}}>
            {cuisines}
          </View>
      </View>
    );
  }

  const getNutrition = (name) => {
    const nutrient = recipe.nutrition.nutrients.find((val) => val.name === name);
    if(nutrient) {
      return (<Text style={styles.listRecipeMetaText}>{name + ': ' + nutrient.amount + ' ' + nutrient.unit}</Text>)
    } else {
      return;
    }
  }

  const addToMealPlan = () => {
    updateMealPlan(sessionData.email, recipe);
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => 
            navigation.goBack()
            }
        >
          <Ionicons name='arrow-back-circle' size={36} color={MyTheme.colors.primary}/>
        </TouchableOpacity>
        <Text style={styles.headerText}>{recipe.title}</Text>
        {sessionData.loggedIn && !resultState.loading &&
        <TouchableOpacity
          onPress={addToMealPlan}
        >
          <Entypo name='add-to-list' size={30} color={MyTheme.colors.primary}/>
        </TouchableOpacity>
        }
      </View>
      {resultState.loading &&
      <View style={{marginVertical: 20}}>
        <ActivityIndicator size='large' color={MyTheme.colors.primary}/>
      </View>
      }
      {!resultState.loading &&
      <ScrollView style={styles.scrollContainer}>
        {/* Image */}
        <Image
          style={styles.listRecipeImage}
          source={{uri: getRecipeImageLarge(recipe.id)}}
        />
        {/* Nutrition Data */}
        <View style={styles.metaContainer}>
          {getNutrition('Calories')}
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <MaterialCommunityIcons name="heart-pulse" size={20} color={getHsvColor(recipe.healthScore)} 
              style={{marginRight: 5}}/>
            <Text style={styles.listRecipeMetaText}>Health Score: {recipe.healthScore}%</Text>
          </View>
        </View>
        <View style={styles.metaContainer}>
          {getNutrition('Carbohydrates')}
          {getNutrition('Protein')}
        </View>
        <View style={styles.metaContainer}>
          {getNutrition('Fat')}
          {getNutrition('Saturated Fat')}
        </View>
        {/* Diets & Cuisines*/}
        <View style={{...styles.metaContainer}}>
          {renderDiets()}
          {renderCuisines()}
        </View>
        {/* Ingredients */}
        <View>
          <Text style={styles.sectionHeader}>Ingredients</Text>
          {renderIngredients()}
        </View>
        {/* Instructions */}
        {recipe.analyzedInstructions.length > 0 &&
        <View>
          <Text style={styles.sectionHeader}>Instructions</Text>
          {renderInstructions()}
        </View>
        }
      </ScrollView>
      }
    </SafeAreaView>
  );

};

const styles = StyleSheet.create({
  header: {
    margin: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
    width: '100%',
    flex: 1,
  },
  screenContainer: {
    flex: 1,
  },
  scrollContainer: {
    margin: 15,
  },
  listRecipeImage: {
    width: '100%',
    aspectRatio: 1.75,
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  listRecipeMetaText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: MyTheme.colors.textDim,
  },
  ingredientsContainer: {},
  sectionHeader: {
    textTransform: 'uppercase',
    color: MyTheme.colors.textDim,
    marginBottom: 10,
    marginTop: 20,
    fontSize: 16,
  },
  ingredientText: {
    fontSize: 16,
    marginBottom: 5,
  },
  instructionText: {
    fontSize: 16,
    marginBottom: 5,
  },
  tagText: {
    fontSize: 16,
    backgroundColor: 'whitesmoke',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 25,
  }
});

export default RecipeScreen;