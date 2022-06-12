
import { MyTheme } from '../styles/theme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import HomeTab from './HomeTab';
import SettingsTab from './SettingsTab';
//import BrowseTab from './BrowseTab';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <SafeAreaProvider>
        <Tab.Navigator
          screenOptions={
            ({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = focused
                    ? 'home'
                    : 'home-outline';
                } else if (route.name === 'Settings') {
                  iconName = focused ? 'settings' : 'settings-outline';
                } else if (route.name === 'Browse') {
                  iconName = focused ? 'text-box-search' : 'text-box-search-outline';
                }

                // You can return any component that you like here!
                if(route.name === 'Browse') {
                  return (<MaterialCommunityIcons name={iconName} size={size} color={color} />);
                } else {
                  return (<Ionicons name={iconName} size={size} color={color} />);
                }
              },
              tabBarActiveTintColor: MyTheme.colors.primary,
              tabBarInactiveTintColor: MyTheme.colors.disabled,
            })}
        >
          <Tab.Screen name="Home" component={HomeTab} />
          {/* <Tab.Screen name="Browse" component={BrowseTab} /> */}
          <Tab.Screen name="Settings" component={SettingsTab} />
        </Tab.Navigator>
    </SafeAreaProvider>
  );
}