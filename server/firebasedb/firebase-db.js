const firebase = require('firebase');
const jwt = require('jsonwebtoken');
const cert = process.env.PRIVATE_KEY_JWT;

class FirebaseDB {
  constructor() {
    firebase.initializeApp({
      serviceAccount: './insta-grow-me-db.json',
      databaseURL: 'https://insta-grow-me.firebaseio.com'
    });
    this.db = firebase.database();
  }
  checkUser(snapshot, password, username) {
    let userID = null;
    let iterator = 0;
    snapshot.forEach((childSnapshot) => { // TODO find
      if (childSnapshot.val().username === username && childSnapshot.val().password === password) {
        userID = {username: childSnapshot.val().username};
      }
      iterator++;
    });
    return userID
  }
// async login(instaUser, res) {
//   let user = JSON.stringify({password: instaUser.password, username: instaUser.username});
//   let decoded = jwt.sign(user, cert);
//   this.usersRef.once('value').then((snapshot) => {
//     let checkUsername = null //this.checkUser(snapshot, instaUser.password, instaUser.username);
//     console.log('userID', checkUsername);
//     if (checkUsername) {
//       res.send({'status': 'approved', token: decoded});
//     }
//     else {
//       res.status(401).send({'status': 'not permitted'});
//     }
//   })
// }
  async loginFB(user) {
    this.db.ref('users/' + user.id).set({
      username: user.username,
      password : user.password,
      token:user.token
    });
  }
  async test() {
    return {status:200,db:this.db}
  }


}

module.exports = FirebaseDB