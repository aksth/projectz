import { View, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { MyTheme } from '../styles/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { searchResponse } from '../api/spoonacular/testdata';
import RecipeList from '../components/RecipeList';

function HomeScreen() {

  const [randomRecipes, setRandomRecipes] = useState(searchResponse);

  useEffect(() => {
    try {
      /* searchRecipes({
        sort: 'random',
        number: 2,
      }, (data) => {
        setRandomRecipes(data.results);
      }); */
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <SafeAreaView style={styles.screenContainer} >
      <View>
        <RecipeList recipes={randomRecipes} loading={false} showHeader={true}/>
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