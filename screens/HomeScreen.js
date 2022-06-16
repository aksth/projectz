import { View, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { MyTheme } from '../styles/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
//import { searchResponse } from '../api/spoonacular/testdata';
import RecipeList from '../components/RecipeList';
import { searchRecipes } from '../api/spoonacular/recipes';

function HomeScreen() {

  const [randomRecipes, setRandomRecipes] = useState([]);
  
  const [resultState, setResultState] = useState({
    loading: false,
    success: true,
    error: false,
  });

  useEffect(() => {
    try {
      setResultState({loading: true, success: false, error: false});
      searchRecipes({
        sort: 'random',
      }, (data) => {
        setRandomRecipes(data.results);
        setResultState({loading: false, success: true, error: false});
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <SafeAreaView style={styles.screenContainer} >
      <View>
        <RecipeList recipes={randomRecipes} loading={resultState.loading} showHeader={true}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  listItemContainer: {
    margin: 20
  },
  listItemImage: {
    width: '100%',
    aspectRatio: 1.75,
    marginBottom: 8,
  },
  listItemTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  listItemMetaText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: MyTheme.colors.textDim,
  },
});

export default HomeScreen;