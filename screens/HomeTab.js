import { Text, View, FlatList, Pressable, StyleSheet, Image } from 'react-native';
import { getRecipeImageLarge, searchRecipes } from '../api/spoonacular/recipes';
import { useState, useEffect } from 'react';
import { MyTheme } from '../styles/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { searchResponse } from '../api/spoonacular/testdata';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { getHsvColor } from '../styles/utils';

function HomeTab() {

  const [randomRecipes, setRandomRecipes] = useState(searchResponse);

  useEffect(() => {
    console.log(new Date());
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

  const renderRecipeItem = ({index, item}) => {
    return (
      <View>
        <Pressable
          onPress={() => true
          }
          style={({ pressed }) => [
            {
              /*
              backgroundColor: pressed
                ? MyTheme.colors.background
                : MyTheme.colors.background
                */
            }
          ]}>
            <View style={styles.listItemContainer}>
              <Image
                style={styles.listItemImage}
                source={{uri: getRecipeImageLarge(item.id)}}
              />
              <Text style={styles.listItemTitleText}>{item.title}</Text>
              <View style={styles.metaContainer}>
                <Text style={styles.listItemMetaText}>{item.nutrition.nutrients[0].amount} {item.nutrition.nutrients[0].unit}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <MaterialCommunityIcons name="heart-pulse" size={20} color={getHsvColor(item.healthScore)} 
                  style={{marginRight: 5}}/>
                  <Text style={styles.listItemMetaText}>{item.healthScore}</Text>
                </View>
              </View>
            </View>
        </Pressable>
      </View>
    );
  }

  const renderHeaderImage = () => {
    return (
      <Image source={require('../assets/home-logo.jpg')} style={{width: '100%', height: undefined, aspectRatio: 2.0248447205,}}/>
    );
  }

  return (
    <SafeAreaView style={styles.screenContainer} >
      <View>
        <FlatList 
          data={randomRecipes}
          renderItem={renderRecipeItem}
          nestedScrollEnabled
          ListHeaderComponent={renderHeaderImage()}
        />
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

export default HomeTab;