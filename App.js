
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,TouchableOpacity,  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { MyTheme } from './styles/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
//import SearchResultScreen from './screens/SearchResultScreen';
import MainTabs from './screens/MainTabs';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

TouchableOpacity.defaultProps = { 
  activeOpacity: 0.7,
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={MyTheme.colors.primary} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            {/* <Stack.Screen name="SearchResultScreen" component={SearchResultScreen}
              options={{
                      title: 'Search Result',
                      headerTitleAlign: 'center',
                    }}
            /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/* <View style={styles.container}>
      <Test />
      <Text>Open up App.js to start working on your app!</Text>
      <TouchableOpacity
        onPress={loginWithFacebook}
        style={{backgroundColor: 'lightskyblue', padding: 10, marginBottom: 10}}
      >
        <Text>Login with Facebook!</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={signOutFacebook}
        style={{backgroundColor: 'wheat', padding: 10}}
      >
        <Text>Sign Out!</Text>
      </TouchableOpacity>
    </View> */