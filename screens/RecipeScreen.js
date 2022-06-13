import { View, StyleSheet, Text, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { MyTheme } from '../styles/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { testdaterecipe } from '../api/spoonacular/testdatarecipe';
import { getRecipeImageLarge } from '../api/spoonacular/recipes';
import { getHsvColor } from '../styles/utils';

const RecipeScreen = ({route, navigation}) => {

  //console.log(route.params.recipeId);

  const [resultState, setResultState] = useState({
    loading: false,
    success: true,
    error: false,
  });

  const [recipe, setRecipe] = useState(testdaterecipe);
    
  useEffect(() => {
    /* setResultState({loading: true, success: false, error: false});
    searchRecipes({...searchParams, offset: pagination.offset}, (data) => {
      setResultState({loading: false, success: true, error: false});
      setResult(data.results);
      setPagination({...pagination, totalResults: data.totalResults})
    }); */
  }, []);

  const renderIngredients = () => {
    const ingredients = [];
    for(let ingredient of recipe.extendedIngredients) {
      ingredients.push(<Text style={styles.ingredientText}>{ingredient.original}</Text>);
    }
    return ingredients;
  }
  
  const renderInstructions = () => {
    const instructions = [];
    for(let instruction of recipe.analyzedInstructions[0].steps) {
      instructions.push(<Text style={styles.instructionText}>{instruction.step}</Text>);
    }
    return instructions;
  }
  
  const renderDiets = () => {
    if(recipe.diets.length <= 0) return;
    const diets = [];
    for(let diet of recipe.diets) {
      diets.push(<Text style={{...styles.tagText, marginRight: 10}}>{diet}</Text>);
    }
    return (
      <View style={{flex: 1}}>
          <Text style={styles.sectionHeader}>Diets</Text>
          <View style={{flexDirection: 'row'}}>
            {diets}
          </View>
      </View>
    );
  }
  
  const renderCuisines = () => {
    if(recipe.cuisines.length <= 0) return;
    const cuisines = [];
    for(let cuisine of recipe.cuisines) {
      cuisines.push(<Text style={{...styles.tagText, marginLeft: 10}}>{cuisine}</Text>);
    }
    return (
      <View style={{flex: 1}}>
          <Text style={{...styles.sectionHeader, textAlign: 'right'}}>Cuisines</Text>
          <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
            {cuisines}
          </View>
      </View>
    );
  }

  const getNutrition = (name) => {
    const nutrient = recipe.nutrition.nutrients.find((val) => val.name === name);
    if(nutrient) {
      return (<Text style={styles.listRecipeMetaText}>{name + ': ' + nutrient.amount + '' + nutrient.unit}</Text>)
    } else {
      return;
    }
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => 
            navigation.goBack()
            }
          style={styles.buttonLeft}
        >
          <Ionicons name='arrow-back-circle' size={36} color={MyTheme.colors.primary}/>
        </TouchableOpacity>
        <Text style={styles.headerText}>{recipe.title}</Text>
      </View>
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
        <View>
          <Text style={styles.sectionHeader}>Instructions</Text>
          {renderInstructions()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );

};

const styles = StyleSheet.create({
  header: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  screenContainer: {
    flex: 1,
  },
  scrollContainer: {
    margin: 10,
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