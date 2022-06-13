import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import RecipeScreen from './RecipeScreen';

const Stack = createStackNavigator();

export default function HomeTab() {
  return (
    <Stack.Navigator
    screenOptions={
      ({ route }) => ({
        headerShown: false,
      })}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="RecipeScreen" component={RecipeScreen}/>
    </Stack.Navigator>
  );
};