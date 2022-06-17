import React, { useEffect, useRef } from 'react';
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
import MealPlanTab from './screens/MealPlanTab';
import { initializeDb } from './firebase';
import * as Analytics from 'expo-firebase-analytics';

TouchableOpacity.defaultProps = {
  activeOpacity: 0.7,
};

const Tab = createBottomTabNavigator();

export default function App() {

  const navigationRef = useRef();
  const routeNameRef = useRef();

  useEffect(() => {

    try {
      initializeDb();
    } catch (err) {
      console.log(err);
    }

  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={MyTheme.colors.background} />
      <NavigationContainer theme={MyTheme} ref={navigationRef} 
      onReady={() =>
        (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
      }
      onStateChange={ async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;
        if (previousRouteName !== currentRouteName) {
          await Analytics.logEvent("screen_view", {
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        // Save the current route name for later comparison
        routeNameRef.current = currentRouteName;
      }}
      >
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: { height: 55, paddingBottom: 5, paddingTop: 5},
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
              } else if (route.name === 'Meal Plan') {
                iconName = focused
                  ? 'restaurant'
                  : 'restaurant-outline';
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
          <Tab.Screen name='Meal Plan' component={MealPlanTab} />
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