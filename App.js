import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { MyTheme } from './styles/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTab from './screens/HomeTab';
import SettingsTab from './screens/SettingsTab';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import BrowseTab from './screens/BrowseTab';

TouchableOpacity.defaultProps = {
  activeOpacity: 0.7,
};

//const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={MyTheme.colors.primary} />
      <NavigationContainer theme={MyTheme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'settings' : 'settings-outline';
              } else if (route.name === 'Browse') {
                iconName = focused
                  ? 'text-box-search'
                  : 'text-box-search-outline';
              }

              // You can return any component that you like here!
              if (route.name === 'Browse') {
                return (
                  <MaterialCommunityIcons
                    name={iconName}
                    size={size}
                    color={color}
                  />
                );
              } else {
                return <Ionicons name={iconName} size={size} color={color} />;
              }
            },
            tabBarActiveTintColor: MyTheme.colors.primary,
            tabBarInactiveTintColor: MyTheme.colors.disabled,
          })}
        >
          <Tab.Screen name='Home' component={HomeTab} />
          <Tab.Screen name='Browse' component={BrowseTab} />
          <Tab.Screen name='Settings' component={SettingsTab} />
        </Tab.Navigator>
      </NavigationContainer>
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