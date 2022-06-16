import { View, StyleSheet, Platform } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { MyTheme } from '../styles/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
//import { searchResponse } from '../api/spoonacular/testdata';
import RecipeList from '../components/RecipeList';
import { searchRecipes } from '../api/spoonacular/recipes';
import { useNavigation } from '@react-navigation/native';
import * as Device from 'expo-device';
import { saveToStore } from '../storage/store';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function HomeScreen() {

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const navigation = useNavigation();

  const [randomRecipes, setRandomRecipes] = useState([]);
  
  const [resultState, setResultState] = useState({
    loading: false,
    success: true,
    error: false,
  });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalResults: 0,
    end:false,
  });

  useEffect(() => {

    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    //Listening to the notifications
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("hello...this log is caused by opening of the notification!");
      console.log(response);
      const recipeId = response.notification.request.content.data.recipeId;
      console.log("recipeId - " + recipeId);
      navigation.navigate("RecipeScreen", {
        recipeId: recipeId,
      });
    });

    try {
      setResultState({loading: true, success: false, error: false});
      searchRecipes({
        sort: 'random',
        offset: ((pagination.currentPage - 1) * 10)
      }, (data) => {
        const newResult = [...randomRecipes, ...data.results]
        setRandomRecipes(newResult);
        setResultState({loading: false, success: true, error: false});
        const end = newResult.length >= pagination.totalResults;
        setPagination({currentPage: pagination.currentPage + 1, totalResults: data.totalResults, end: end})
      });
    } catch (err) {
      console.log(err);
    }

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const loadMore = () => {
    try {
      setResultState({loading: true, success: false, error: false});
      searchRecipes({
        sort: 'random',
        offset: ((pagination.currentPage - 1) * 10)
      }, (data) => {
        setRandomRecipes([...randomRecipes, ...data.results]);
        setResultState({loading: false, success: true, error: false});
        setPagination({currentPage: pagination.currentPage + 1, totalResults: data.totalResults})
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <SafeAreaView style={styles.screenContainer} >
      <View>
        <RecipeList recipes={randomRecipes} loading={resultState.loading} showHeader={true} onLoadMore={loadMore} end={pagination.end}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  listItemContainer: {
    margin: 20
  },
  listItemImage: {
    width: '100%',
    aspectRatio: 1.75,
    marginBottom: 8,
  },
  listItemTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  listItemMetaText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: MyTheme.colors.textDim,
  },
});

export default HomeScreen;

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
    await saveToStore('exponentPushToken', token);
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