import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useState, useEffect } from 'react';
import { Input } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import MultiSelector from '../components/MultiSelector';
import { MyTheme } from '../styles/theme';

const ingredientList = require('../assets/ingredients.json');
const cuisineList = require('../assets/cuisines.json');
const dietList = require('../assets/diets.json');

function BrowseTab({route, navigation}) {
  const initialState = {
    query: '',

    minCalories: '',
    maxCalories: '',
    minCarbs: '',
    maxCarbs: '',
    minProtein: '',
    maxProtein: '',
    minFat: '',
    maxFat: '',
  };

  const [state, setState] = useState(initialState);
  const [ingredients, setIngredients] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [diets, setDiets] = useState([]);

  const updateStateObject = (vals) => {
    setState({
      ...state,
      ...vals,
    });
  };

  const search = () => {

    const ingredientNames = ingredientList[0].children.filter(function (value) {
      return this.delete(value.id);
    }, new Set(ingredients)).map(function(item) {
      return item['name'];
    }).join(",");
    
    const cuisineNames = cuisineList[0].children.filter(function (value) {
      return this.delete(value.id);
    }, new Set(cuisines)).map(function(item) {
      return item['name'];
    }).join(",");
    
    const dietNames = dietList[0].children.filter(function (value) {
      return this.delete(value.id);
    }, new Set(diets)).map(function(item) {
      return item['name'];
    }).join(",");

    const searchParams = {
      ...(state.query && {query: state.query}),
      ...(cuisineNames && {cuisine: cuisineNames}),
      ...(dietNames && {diet: dietNames}),
      ...(ingredientNames && {includeIngredients: ingredientNames}),
      
      ...(state.minCalories && {minCalories: state.minCalories}),
      ...(state.maxCalories && {maxCalories: state.maxCalories}),
      ...(state.minCarbs && {minCarbs: state.minCarbs}),
      ...(state.maxCarbs && {maxCarbs: state.maxCarbs}),
      ...(state.minProtein && {minProtein: state.minProtein}),
      ...(state.maxProtein && {maxProtein: state.maxProtein}),
      ...(state.minFat && {minFat: state.minFat}),
      ...(state.maxFat && {maxFat: state.maxFat}),
    }

    navigation.navigate("SearchResultScreen", {
      'searchParams': searchParams,
    })

  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.screenContainer}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.searchInputViewContainer}>
            <Ionicons name='search' size={20} />
            <Input
              placeholder='Enter search query'
              value={state.query}
              onChangeText={(val) => updateStateObject({ query: val })}
              inputContainerStyle={styles.searchInputContainer}
              renderErrorMessage={false}
            />
          </View>
          <MultiSelector
            items={ingredientList}
            selectedItems={ingredients}
            name='Ingredients'
            onSelection={setIngredients}
          />
          <MultiSelector
            items={cuisineList}
            selectedItems={cuisines}
            name='Cuisines'
            onSelection={setCuisines}
          />
          <MultiSelector
            items={dietList}
            selectedItems={diets}
            name='Diets'
            onSelection={setDiets}
          />

          <Text style={styles.sectionHeader}>Nutrition</Text>

          {/* Calories */}
          <View style={styles.nutritionRow}>
            <Text style={styles.nutritionRowLabel}>Calories (kcal)</Text>
            <View style={styles.nutritionRowInputView}>
              <Input
                placeholder='Min'
                value={state.minCalories}
                onChangeText={(val) => updateStateObject({ minCalories: val })}
                renderErrorMessage={false}
                inputContainerStyle={styles.nutritionRowInputContainer}
                keyboardType='numeric'
                maxLength={4}
              />
            </View>
            <View style={styles.nutritionRowInputView}>
              <Input
                placeholder='Max'
                value={state.maxCalories}
                onChangeText={(val) => updateStateObject({ maxCalories: val })}
                renderErrorMessage={false}
                inputContainerStyle={styles.nutritionRowInputContainer}
                keyboardType='numeric'
                maxLength={4}
              />
            </View>
          </View>

          {/* Carbs */}
          <View style={styles.nutritionRow}>
            <Text style={styles.nutritionRowLabel}>Carbs (gm)</Text>
            <View style={styles.nutritionRowInputView}>
              <Input
                placeholder='Min'
                value={state.minCarbs}
                onChangeText={(val) => updateStateObject({ minCarbs: val })}
                renderErrorMessage={false}
                inputContainerStyle={styles.nutritionRowInputContainer}
                keyboardType='numeric'
                maxLength={4}
              />
            </View>
            <View style={styles.nutritionRowInputView}>
              <Input
                placeholder='Max'
                value={state.maxCarbs}
                onChangeText={(val) => updateStateObject({ maxCarbs: val })}
                renderErrorMessage={false}
                inputContainerStyle={styles.nutritionRowInputContainer}
                keyboardType='numeric'
                maxLength={4}
              />
            </View>
          </View>

          {/* Protein */}
          <View style={styles.nutritionRow}>
            <Text style={styles.nutritionRowLabel}>Protein (gm)</Text>
            <View style={styles.nutritionRowInputView}>
              <Input
                placeholder='Min'
                value={state.minProtein}
                onChangeText={(val) => updateStateObject({ minProtein: val })}
                renderErrorMessage={false}
                inputContainerStyle={styles.nutritionRowInputContainer}
                keyboardType='numeric'
                maxLength={4}
              />
            </View>
            <View style={styles.nutritionRowInputView}>
              <Input
                placeholder='Max'
                value={state.maxProtein}
                onChangeText={(val) => updateStateObject({ maxProtein: val })}
                renderErrorMessage={false}
                inputContainerStyle={styles.nutritionRowInputContainer}
                keyboardType='numeric'
                maxLength={4}
              />
            </View>
          </View>

          {/* Fat */}
          <View style={styles.nutritionRow}>
            <Text style={styles.nutritionRowLabel}>Fat (gm)</Text>
            <View style={styles.nutritionRowInputView}>
              <Input
                placeholder='Min'
                value={state.minFat}
                onChangeText={(val) => updateStateObject({ minFat: val })}
                renderErrorMessage={false}
                inputContainerStyle={styles.nutritionRowInputContainer}
                keyboardType='numeric'
                maxLength={4}
              />
            </View>
            <View style={styles.nutritionRowInputView}>
              <Input
                placeholder='Max'
                value={state.maxFat}
                onChangeText={(val) => updateStateObject({ maxFat: val })}
                renderErrorMessage={false}
                inputContainerStyle={styles.nutritionRowInputContainer}
                keyboardType='numeric'
                maxLength={4}
              />
            </View>
          </View>

          <TouchableOpacity onPress={search} style={styles.button}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>

          {/* <Collapse>
            <CollapseHeader>
              <View>
                <Text>Click here</Text>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <Text>Ta daa!</Text>
            </CollapseBody>
          </Collapse> */}
        </ScrollView>
        
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  scrollContainer: {
    margin: 10,
  },
  searchInputViewContainer: {
    backgroundColor: 'whitesmoke',
    borderRadius: 25,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  searchInputContainer: {
    borderBottomWidth: 0,
    marginRight: 25,
  },
  sectionHeader: {
    textTransform: 'uppercase',
    color: MyTheme.colors.textDim,
    marginBottom: 10,
    marginTop: 20,
  },
  nutritionRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  nutritionRowLabel: {
    fontSize: 16,
    width: 120,
  },
  nutritionRowInputView: {
    flex: 1,
  },
  nutritionRowInputContainer: {
    borderWidth: 1,
    height: 40,
    borderRadius: 10,
    padding: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  button: {
    elevation: 8,
    backgroundColor: MyTheme.colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 10,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF88',
  }
});

export default BrowseTab;
