import { View, StyleSheet, Text, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { MyTheme } from '../styles/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

const SearchResultScreen = ({route, navigation}) => {

  const [pagination, setPagination] = useState({
    currentPage: 1,
  });

  const [resultState, setResultState] = useState({
    loading: false,
    success: true,
    error: false,
  });
  
  const [searchParams, setSearchParams] = useState(route.params.searchParams);

  /* searchRecipes(searchParams, (data) => {

    }); */
    
  useEffect(() => {
    console.log(searchParams);
    /* navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => 
            navigation.navigate("Browse")}
          style={styles.buttonLeft}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      ),
    }); */
  });

  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView style={styles.scrollContainer}>
      </ScrollView>
      <Text>Hello</Text>
      {resultState.loading && (
          <View style={styles.loading}>
            <ActivityIndicator size='large' color={MyTheme.colors.primary}/>
          </View>
        )}
    </SafeAreaView>
  );

};

const styles = StyleSheet.create({
  buttonLeft: {
    paddingLeft: 15,
  },
  buttonText: {
    fontSize: 18,
    color: MyTheme.colors.text,
    fontWeight: "bold",
  },
  screenContainer: {
    flex: 1,
  },
  scrollContainer: {
    margin: 10,
  },
});

export default SearchResultScreen;