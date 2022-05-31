import { getDatabase, onValue, ref, set } from 'firebase/database';

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

export { writeUserData, getUserById };