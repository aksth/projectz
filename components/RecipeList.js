import { View, StyleSheet, Text, FlatList, Pressable, Image, ActivityIndicator } from 'react-native';
import React from 'react';
import { MyTheme } from '../styles/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { getHsvColor } from '../styles/utils';
import { getRecipeImageLarge } from '../api/spoonacular/recipes';
import { useNavigation } from '@react-navigation/native';

const RecipeList = (props) => {

  const navigation = useNavigation();

  const renderRecipeItem = ({index, item}) => {
    return (
      <View>
        <Pressable
          onPress={() => {
            navigation.navigate("RecipeScreen", {
              recipeId: item.id,
            });
          }
          }
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? 'whitesmoke'
                : MyTheme.colors.background
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

  const renderFooter = () => {
    return (
      props.loading && (
        <View style={{marginVertical: 20}}>
          <ActivityIndicator size='large' color={MyTheme.colors.primary}/>
        </View>
      )
    );
  }

  const loadMore = () => {
    props.onLoadMore();
  }

  return (
    <FlatList 
      data={props.recipes}
      renderItem={renderRecipeItem}
      nestedScrollEnabled
      ListHeaderComponent={props.showHeader ? renderHeaderImage() : null}
      ListFooterComponent={renderFooter()}
      onEndReachedThreshold={0.01}
      onEndReached={loadMore}
    />
  );

};

const styles = StyleSheet.create({
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

export default RecipeList;