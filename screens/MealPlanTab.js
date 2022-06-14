import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, StyleSheet } from 'react-native';

export default function MealPlanTab() {

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View>
        <Text>Meal Plan Tab</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});