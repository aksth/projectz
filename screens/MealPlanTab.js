import { View, StyleSheet, Text, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MealPlanTab() {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <View>
        <Text>Hello</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
});