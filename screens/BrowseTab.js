import { createStackNavigator } from '@react-navigation/stack';
import BrowseScreen from './BrowseScreen';
import HomeTab from './HomeTab';
import SearchResultScreen from './SearchResultScreen';


const Stack = createStackNavigator();

export default function BrowseTab() {
  return (
    <Stack.Navigator
    screenOptions={
      ({ route }) => ({
        headerShown: false,
      })}
    >
      <Stack.Screen name="BrowseScreen" component={BrowseScreen} />
      <Stack.Screen name="SearchResultScreen" component={SearchResultScreen}/>
    </Stack.Navigator>
  );
};