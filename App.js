import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, Platform } from 'react-native';
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
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

TouchableOpacity.defaultProps = {
  activeOpacity: 0.7,
};

const Tab = createBottomTabNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {

    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    try {
      initializeDb();
    } catch (err) {
      console.log(err);
    }

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };

  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={MyTheme.colors.background} />
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

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}