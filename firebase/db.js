import { getApp } from 'firebase/app';
import { equalTo, getDatabase, onValue, push, query, ref, set, get, orderByChild, update } from 'firebase/database';

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
    console.log(data);
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

function updateMealPlan() {
  const db = getDatabase();
  const existingEmailRef = query(ref(db, 'users'), orderByChild('email'), equalTo('shrestha.akash01@gmail.com'));
  get(existingEmailRef)
  .then(snapshot => {
    if (snapshot.exists()){
      console.log("user by email exists!");
      const id = Object.keys(snapshot.val())[0];
      const reference = ref(db, 'users/' + id + '/mealplan');
      update(reference, {
        id123: {
          name: 'pizza',
          calories: 500
        }
      });
    } else {
      console.log("user by email doesn't exist! Creating one.");
    }
  })
  .catch(error => {
    console.log(error);
  })
  
}

export { writeUserData, getUserById, writeLoginDataToDb, updateMealPlan };