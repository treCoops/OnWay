let express = require('express');
let router = express.Router();
let firebase = require('firebase/app');

require("firebase/auth");
require("firebase/database");


const firebaseConfig = {
  apiKey: "AIzaSyD-bGtCqg3dwzulZP8_WYcSlLpEgKbIM30",
  authDomain: "onway-53e1b.firebaseapp.com",
  databaseURL: "https://onway-53e1b.firebaseio.com",
  projectId: "onway-53e1b",
  storageBucket: "onway-53e1b.appspot.com",
  messagingSenderId: "588304030538",
  appId: "1:588304030538:web:3462580143caa4bb287fb3"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


router.get('/', function(req, res, next) {
  res.render('Login/login', {
    title: 'OnWay | Login',
    data: '',
    status: ''
  });
});

router.post('/signIn', function(req, res, next) {
  let email = req.body.txt_email;
  let password = req.body.txt_password;

  firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
    let user = firebase.auth().currentUser;
    if(user.emailVerified){
      if (user) {
        let starCountRef = firebase.database().ref('backend_users').child(user.uid);
        starCountRef.once('value', function (snapshot) {

          req.session.user = snapshot.val();
          console.log(req.session.user);
          res.render('Template/template', {
            Page_Content: 'Dashboard',
            title: 'OnWay | Dashboard',
            profile: req.session.user
          });

        }).catch(function (error) {
          res.render('Login/login', {
            data: error.message,
            title: 'Sherlock | User Login'
          });
        });
      }
    }else{
      res.render('Login/login', {
        data: 'Please verify your given email account',
        title: 'Sherlock | User Login'
      });
    }

  }).catch(function (error) {
    console.log(error.code);

    let message = '';
    if(error.code === 'auth/user-disabled'){
      message = error.message;
    }
    if(error.code === 'auth/wrong-password'){
      message = 'Invalid username or password.!';
    }

    res.render('Login/login', {
      title: 'OnWay | Login',
      data: message
    });

  });
});

router.post('/forgetPassword', function(req, res, next) {
  let email = req.body.txt_email;

  firebase.auth().sendPasswordResetEmail(email).then(function() {
    res.render('Login/login', {
      data: "Account recovery mail has been sent.!",
      title: 'Sherlock | User Login'
    });
  }).catch(function(error) {
    res.render('Login/login', {
      data: "Internal Server Error.!",
      title: 'Sherlock | User Login'
    });
  });
});

router.get('/logout', function(req, res, next) {

  if(req.session.user){

    firebase.auth().signOut().then(function () {
      req.session.destroy();

      res.render('Login/login', {
        data: 'Please login!.',
        title: 'OnWay | Login',
        status: ''
      });

    }).catch(function (error) {
      res.render('Login/login', {
        data: error.message,
        title: 'OnWay | Login',
        status: ''
      });
    });

  }else{
    res.render('Login/login', {
      data: 'Please login!.',
      title: 'OnWay | Login',
      status: ''
    });
  }

});

module.exports = router;
