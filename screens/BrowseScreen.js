import { StyleSheet, Text, View, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { useState } from 'react';
import { Input } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; 

function BrowseScreen() {

  const initialState = {
    searchQuery: '',
  };

  const [state, setState] = useState(initialState);

  const updateStateObject = (vals) => {
    setState({
      ...state,
      ...vals,
    })
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.screenContainer}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.searchInputViewContainer}>
            <Ionicons name="search" size={20}/>
            <Input
              placeholder='Enter search query' 
              value={state.searchQuery}
              onChangeText={(val) => updateStateObject({searchQuery: val})}
              inputContainerStyle={styles.searchInputContainer}
              renderErrorMessage={false}
            />
          </View>
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
    backgroundColor: 'linen',
    borderRadius: 25,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  searchInputContainer:  {
    borderBottomWidth: 0,
    marginRight: 25,
  },
});

export default BrowseScreen;