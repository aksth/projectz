import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { MyTheme } from '../styles/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { searchRecipes } from '../api/spoonacular/recipes';
import RecipeList from '../components/RecipeList';
//import { searchResponse } from '../api/spoonacular/testdata';

const SearchResultScreen = ({route, navigation}) => {

  const [pagination, setPagination] = useState({
    currentPage: 1,
    offset: 0,
    totalResults: 0,
  });

  const [resultState, setResultState] = useState({
    loading: false,
    success: true,
    error: false,
  });
  
  const [searchParams, setSearchParams] = useState(route.params.searchParams);

  const [result, setResult] = useState([]);
  
  useEffect(() => {
    setResultState({loading: true, success: false, error: false});
    searchRecipes({...searchParams, offset: pagination.offset}, (data) => {
      setResultState({loading: false, success: true, error: false});
      setResult(data.results);
      setPagination({...pagination, totalResults: data.totalResults})
    });
  }, []);

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
        <Text style={styles.headerText}>{resultState.loading ? 'searching...' : pagination.totalResults + ' results found...'}</Text>
      </View>
      <RecipeList recipes={result} loading={resultState.loading} showHeader={false}/>
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
    marginLeft: 8
  },
  screenContainer: {
    flex: 1,
  },
  scrollContainer: {
    margin: 10,
  },
});

export default SearchResultScreen;