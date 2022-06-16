import { equalTo, getDatabase, onValue, push, query, ref, set, get, orderByChild, update } from 'firebase/database';
import Toast from 'react-native-root-toast';

function writeUserData(userId, name, email, imageUrl) {
  const db = getDatabase();
  const reference = ref(db, 'users/' + userId);
  set(reference, {
    username: name,
    email: email,
    profile_picture: imageUrl,
  });
}

function getUserById(id) {
  const db = getDatabase();
  const reference = ref(db, 'users/' + id);
  onValue(reference, (snapshot) => {
    const data = snapshot.val();
    //console.log(data);
  }, { onlyOnce: true });
}

function writeLoginDataToDb(email, fullName, photoUrl, exponentPushToken) {
  console.log('Saving to db...');
  console.log(exponentPushToken);
  const db = getDatabase();

  const existingEmailRef = query(ref(db, 'users'), orderByChild('email'), equalTo(email));

  get(existingEmailRef)
  .then(snapshot => {
    if (snapshot.exists()){
      console.log("user by email exists!");
    } else {
      console.log("user by email doesn't exist! Creating one.");
      push(reference, {
        email: email,
        fullName: fullName,
        photoUrl: photoUrl,
        exponentPushToken: exponentPushToken ? exponentPushToken : '',
      });
    }
  })
  .catch(error => {
    console.log(error);
  })

  const reference = ref(db, 'users/');
}

function updateMealPlan(email, recipe) {
  const db = getDatabase();
  const existingEmailRef = query(ref(db, 'users'), orderByChild('email'), equalTo(email));
  get(existingEmailRef)
  .then(snapshot => {
    if (snapshot.exists()){
      console.log("user by email exists!");
      console.log("updating meal plan.");
      const id = Object.keys(snapshot.val())[0];
      const reference = ref(db, 'users/' + id + '/mealplan');
      
      let recipeToAdd = {};
      recipeToAdd[recipe.id] = {
        id: recipe.id,
        healthScore: recipe.healthScore,
        title: recipe.title,
        image: recipe.image,
        nutrition: {
          nutrients: recipe.nutrition.nutrients,
          caloricBreakdown: recipe.nutrition.caloricBreakdown
        },
        cuisines: recipe.cuisines,
        diets: recipe.diets
      }
      update(reference, recipeToAdd);
      Toast.show(`Added to the meal plan!`, {
        duration: Toast.durations.SHORT,
        animation: true,
        hideOnPress: true,
      });
    } else {
      console.log("user by email doesn't exist! User record is needed first to update one.");
    }
  })
  .catch(error => {
    console.log(error);
  })
  
}

function getMealPlan(email, callback) {
  const db = getDatabase();
  const existingEmailRef = query(ref(db, 'users'), orderByChild('email'), equalTo(email));
  get(existingEmailRef)
  .then(snapshot => {
    if (snapshot.exists()){
      console.log("user by email exists!");
      console.log("Getting meal plan for " + email);
      const id = Object.keys(snapshot.val())[0];
      const reference = ref(db, 'users/' + id + '/mealplan');
      onValue(reference, (snapshot2) => {
        const data = snapshot2.val();
        //console.log(data);
        callback(data);
      }, { onlyOnce: true });
    } else {
      console.log("user by email doesn't exist! User record is needed first to update one.");
    }
  })
  .catch(error => {
    console.log(error);
  })
}

export { writeUserData, getUserById, writeLoginDataToDb, updateMealPlan, getMealPlan };