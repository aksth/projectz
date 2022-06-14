import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { getValueFromStore } from '../storage/store';
import { useFocusEffect } from '@react-navigation/native';

export default function MealPlanTab({route, navigation}) {

  const [loggedIn, setLoggedIn] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getValueFromStore('loggedIn', (value) => {
        console.log('screen focused, logged in:', value);
        setLoggedIn((value === 'true'))
      });
      return;
    }, [])
  );

  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView style={styles.scrollContainer}>
        { loggedIn &&
        <View>
          <Text>Meal Plan Tab</Text>
        </View>
        }
        
        { !loggedIn &&
        <View>
          <Text>Login to continue...</Text>
        </View>
        }
        
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    margin: 10,
  },
});