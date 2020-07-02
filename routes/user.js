let express = require('express');
let router = express.Router();
let firebase = require('firebase/app');
let multer = require('multer');
let fs = require('fs');
let admin = require('firebase-admin');


const firebaseConfig = {
    apiKey: "AIzaSyD-bGtCqg3dwzulZP8_WYcSlLpEgKbIM30",
    authDomain: "onway-53e1b.firebaseapp.com",
    databaseURL: "https://onway-53e1b.firebaseio.com",
    projectId: "onway-53e1b",
    storageBucket: "onway-53e1b.appspot.com",
    messagingSenderId: "588304030538",
    appId: "1:588304030538:web:3462580143caa4bb287fb3"
};


let serviceAccount = require("../onway-53e1b-firebase-adminsdk-bg7ix-209c4abbbe.json");

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://onway-53e1b.firebaseio.com"
});


const Storage = multer.diskStorage({

    destination: function(req, file, callback) {
        callback(null, "./public/images/users");
    },

    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }

});

const upload = multer({
    storage: Storage
}).single("txt_img");


router.get('/', function(req, res, next) {

    if(req.session.user && req.session.user.account_type.toString() === 'SUPER ADMIN') {
        res.render('Template/template', {
            Page_Content: 'Super',
            title: 'OnWay | Super Admin',
            profile: req.session.user
        });
    }else{
        res.render('Login/login', {
            data: 'Please login with super admin account!.',
            title: 'OnWay | Login',
            status: ''
        });
    }
});


router.get('/regional_admin', function(req, res, next) {

    if(req.session.user && req.session.user.account_type.toString() === 'SUPER ADMIN') {
        res.render('Template/template', {
            Page_Content: 'Regional',
            title: 'OnWay | Regional Admin',
            profile: req.session.user
        });
    }else{
        res.render('Login/login', {
            data: 'Please login with super admin account!.',
            title: 'OnWay | Login',
            status: ''
        });
    }
});


router.post('/createRegionalUser', function(req,res){
    upload(req, res, function(err) {
        if (err) {
            console.log('Error: ' + err)
            res.end('{"message" : "Profile picture is not uploaded.!", "status" : 500}');
        }

        firebase.auth().createUserWithEmailAndPassword(req.body.txt_email, req.body.txt_confirm_password).then(function () {
            let user = firebase.auth().currentUser;

            firebase.database().ref('backend_users').child(user.uid).set({
                account_type: 'REGIONAL ADMIN',
                email: req.body.txt_email,
                first_name: req.body.txt_first_name,
                last_name: req.body.txt_last_name,
                profile_pic_url: req.file.filename,
                contact_no: req.body.txt_tel,
                pro_id: req.body.cmb_province,
                des_id: req.body.cmb_district,
                district_name: req.body.txt_district_name,
                province_name: req.body.txt_province_name,
                uid: user.uid,
                status: 1,
            }, function(errors) {
                if (errors) {
                    console.log(errors);
                    res.end('{"message" : "Firebase error.!", "status" : 500}');
                } else {

                    user.sendEmailVerification().then(function() {
                        res.end('{"message" : "Account created successfully, Please check for verify email for given mail.!", "status" : 200}');
                    }).catch(function(error) {
                        res.end('{"message" : "Message Server Error.!", "status" : 500}');
                    });

                }
            });

        }).catch(function (error) {
            console.log(error);
            res.end('{"message" : "This account is already exist.!", "status" : 500}');
            fs.unlink('./public/images/users/'+req.file.filename,function(err){
                if(err) return console.log(err);
                console.log('file deleted successfully');
            });

        });
    });
});

router.post('/removeSuperUser', function(req, res){

    let starCountRef = firebase.database().ref('backend_users').child(req.body.ID);
    starCountRef.once('value', function (snapshot) {
        admin.auth().deleteUser(req.body.ID)
            .then(function() {
                let usr = firebase.database().ref('backend_users').child(req.body.ID);
                usr.remove()
                    .then(function () {
                        fs.unlink('./public/images/users/'+snapshot.val().profile_pic_url,function(err){
                            if(err) return console.log(err);
                            console.log('file deleted successfully');
                            res.end('{"message" : "Account removed successfully.!", "status" : 200}');
                        });
                    })
                    .catch(function (error) {
                        res.end('{"message" : "Internal server error.!", "status" : 500}');
                    });
            })
            .catch(function(error) {
                res.end('{"message" : "Internal server error.!", "status" : 500}');
            });
    });

});



router.post('/blockSuperUser', function(req, res){


    let starCountRef = firebase.database().ref('backend_users').child(req.body.ID).once('value', function (snapshot) {
        console.log(snapshot.val());
        if(req.body.status === '1')
        {
            admin.auth().updateUser(req.body.ID, {
                disabled: true
            }).then(function (userRecord) {

                firebase.database().ref('backend_users').child(req.body.ID).set({
                    status: 0,
                    account_type: 'REGIONAL ADMIN',
                    email: snapshot.val().email,
                    first_name: snapshot.val().first_name,
                    last_name: snapshot.val().last_name,
                    profile_pic_url: snapshot.val().profile_pic_url,
                    contact_no: snapshot.val().contact_no,
                    pro_id: snapshot.val().pro_id,
                    des_id: snapshot.val().des_id,
                    district_name: snapshot.val().district_name,
                    province_name: snapshot.val().province_name,
                    uid: snapshot.val().uid
                }, function (errors) {
                    if (errors) {
                        console.log(errors);
                        res.end('{"message" : "Firebase error.!", "status" : 500}');
                    } else {
                        res.end('{"message" : "Selected account has been blocked.!", "status" : 200}');
                    }
                });

            }).catch(function (error) {
                console.log('Error updating user:', error);
            });
        }
        if (req.body.status === '0') {
            admin.auth().updateUser(req.body.ID, {
                disabled: false
            }).then(function (userRecord) {

                firebase.database().ref('backend_users').child(req.body.ID).set({
                    status: 1,
                    account_type: 'REGIONAL ADMIN',
                    email: snapshot.val().email,
                    first_name: snapshot.val().first_name,
                    last_name: snapshot.val().last_name,
                    profile_pic_url: snapshot.val().profile_pic_url,
                    contact_no: snapshot.val().contact_no,
                    pro_id: snapshot.val().pro_id,
                    des_id: snapshot.val().des_id,
                    district_name: snapshot.val().district_name,
                    province_name: snapshot.val().province_name,
                    uid: snapshot.val().uid
                }, function (errors) {
                    if (errors) {
                        console.log(errors);
                        res.end('{"message" : "Firebase error.!", "status" : 500}');
                    } else {
                        res.end('{"message" : "Selected account has been activated.!", "status" : 200}');
                    }
                });

            }).catch(function (error) {
                console.log('Error updating user:', error);
            });
        }
    });

});


router.post('/createUser', function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            console.log('Error: '+err)
            res.end('{"message" : "Profile picture is not uploaded.!", "status" : 500}');
        }

        firebase.auth().createUserWithEmailAndPassword(req.body.txt_email, req.body.txt_confirm_password).then(function () {
            let user = firebase.auth().currentUser;

            firebase.database().ref('backend_users').child(user.uid).set({
                account_type: 'SUPER ADMIN',
                email: req.body.txt_email,
                first_name: req.body.txt_first_name,
                last_name: req.body.txt_last_name,
                profile_pic_url: req.file.filename,
                contact_no: req.body.txt_tel,
                uid: user.uid,
                status: 1,
            }, function(errors) {
                if (errors) {
                    console.log(errors);
                    res.end('{"message" : "Firebase error.!", "status" : 500}');
                } else {

                    user.sendEmailVerification().then(function() {
                        res.end('{"message" : "Account created successfully, Please check for verify email for given mail.!", "status" : 200}');
                    }).catch(function(error) {
                        res.end('{"message" : "Message Server Error.!", "status" : 500}');
                    });

                }
            });

        }).catch(function (error) {
            console.log(error);
            res.end('{"message" : "This account is already exist.!", "status" : 500}');
            fs.unlink('./public/images/users/'+req.file.filename,function(err){
                if(err) return console.log(err);
                console.log('file deleted successfully');
            });

        });
    });
});


module.exports = router;