let express = require('express');
let router = express.Router();
let firebase = require('firebase/app');

require("firebase/auth");


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

    if(req.session.user) {
        res.render('Template/template', {
            Page_Content: 'Dashboard',
            title: 'OnWay | Dashboard',
            profile: req.session.user
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
