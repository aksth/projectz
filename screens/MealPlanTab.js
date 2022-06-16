import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Pressable, Image } from 'react-native';
import { getAllValues } from '../storage/store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MyTheme } from '../styles/theme';
import { getMealPlan, deleteMealPlanItem } from '../firebase/db';
import { getRecipeImageSmall } from '../api/spoonacular/recipes';

export default function MealPlanTab({route, navigation}) {

  const [sessionData, setSessionData] = useState({
    loggedIn: false,
    email: '',
  });

  const [mealPlan, setMealPlan] =  useState([]);
  const [cumulativeData, setCumulativeData] =  useState({
    calories: 0,
    protein: 0,
    carbohydrates: 0,
    fat: 0,
  });

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

  const refreshMealPlan = () => {
    getMealPlan(sessionData.email, (mealPlan) => {
      const arr = [];
      let calories = 0;
      let protein = 0;
      let carbohydrates = 0;
      let fat = 0;
      for (let key in mealPlan) {
        if (mealPlan.hasOwnProperty(key)) {
          const meal = mealPlan[key]
          //cumulative
          const caloriesObj = getNutritionItem(meal, 'Calories');
          calories = caloriesObj ? (calories + caloriesObj.amount) : calories;
          const proObj = getNutritionItem(meal, 'Protein');
          protein = proObj ? (protein + proObj.amount) : protein;
          const carbsObj = getNutritionItem(meal, 'Carbohydrates');
          carbohydrates = carbsObj ? (carbohydrates + carbsObj.amount) : carbohydrates;
          const fatObj = getNutritionItem(meal, 'Fat');
          fat = fatObj ? (fat + fatObj.amount) : fat;
          arr.push(meal);
        }
      }
      setMealPlan(arr);
      setCumulativeData({
        calories: calories,
        protein: protein,
        carbohydrates: carbohydrates,
        fat: fat,
      })
    });
  }

  const getNutrition = (recipe, name) => {
    const nutrient = getNutritionItem(recipe, name);
    if(nutrient) {
      return (
        <View style={{flexDirection: 'column', flex: 1, flexGrow: 1}}>
          <Text style={styles.mealItemNutrientText}>{name.substring(0,3) + ':'}</Text>
          <Text>{nutrient.amount + ' ' + nutrient.unit.substring(0,1)}</Text>
        </View>
      );
    } else {
      return;
    }
  }

  const getNutritionItem = (recipe, name) => {
    return recipe.nutrition.nutrients.find((val) => val.name === name);
  }

  const renderMealItem = ({index, item}) => {
    return (
      <View>
        <Pressable
          onPress={() => {}}
          onLongPress={() => {
            deleteMealPlanItem(sessionData.email, item.id, () => {
              refreshMealPlan();
            })
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? 'whitesmoke'
                : MyTheme.colors.background
            }
          ]}>
            <View style={(index == mealPlan.length - 1) ? 
                {...styles.mealItemContainer, ...{borderBottomWidth: 0}} : styles.mealItemContainer }>
              <Image
                style={{width: 120, height: 75, marginRight: 10,}}
                source={{uri: getRecipeImageSmall(item.id)}}
              />
              <View style={{flex: 1}}>
                <Text style={styles.mealItemTextHeader}>{item.title}</Text>
                <View style={{flexDirection:'row'}}>
                    {getNutrition(item, 'Calories')}
                    {getNutrition(item, 'Protein')}
                    {getNutrition(item, 'Carbohydrates')}
                    {getNutrition(item, 'Fat')}
                </View>
              </View>
              
            </View>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Meal Plan</Text>
        <TouchableOpacity
          onPress={refreshMealPlan}
        >
          <MaterialCommunityIcons name='refresh' size={30} color={MyTheme.colors.primary}/>
        </TouchableOpacity>
      </View>

      { sessionData.loggedIn &&
      <View>
      <FlatList 
        data={mealPlan}
        renderItem={renderMealItem}
        style={{margin: 15}}
        ListFooterComponent={
          <View style={{marginTop: 15}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 15}}>Nutrition Aggregate</Text>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text style={styles.aggregateLabel}>Calories</Text>
                <Text style={styles.aggregateLabel}>Proten</Text>
                <Text style={styles.aggregateLabel}>Carbohydrates</Text>
                <Text style={styles.aggregateLabel}>Fat</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.aggregateValue}>{cumulativeData.calories} kcal</Text>
                <Text style={styles.aggregateValue}>{cumulativeData.protein} g</Text>
                <Text style={styles.aggregateValue}>{cumulativeData.carbohydrates} g</Text>
                <Text style={styles.aggregateValue}>{cumulativeData.fat} g</Text>
              </View>
            </View>
            
          </View>
        }
      />
      </View>
      }
      
      { !sessionData.loggedIn &&
      <View style={{alignItems: 'center'}}>
        <Text>Login to continue...</Text>
      </View>
      }

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  scrollContainer: {
    margin: 10,
  },
  header: {
    margin: 10,
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
  mealItemContainer: {
    borderBottomWidth: 0,
    flexDirection: 'row',
    paddingVertical: 5,
  },
  mealItemTextHeader: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  mealItemNutrientText: {
    fontSize: 14,
  },
  aggregateLabel: {
    fontSize: 18,
  },
  aggregateValue: {
    fontSize: 18,
  }
});