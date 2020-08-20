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
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

let serviceAccount = require("../onway-53e1b-firebase-adminsdk-bg7ix-209c4abbbe.json");

if (!firebase.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://onway-53e1b.firebaseio.com"
    });
}


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

    if(req.session.user) {
        res.render('Template/template', {
            Page_Content: 'Profile',
            title: 'OnWay | My Profile',
            profile: req.session.user
        });
    }else{
        res.render('Login/login', {
            data: 'Please login!.',
            title: 'OnWay | Login',
        });
    }
});

router.post('/changeSuperPassword', function(req, res){
    let user = firebase.auth().currentUser;

    user.updatePassword(req.body.txt_confirm_password).then(function() {
        res.end('{"message" : "Password changed successfully.!", "status" : 200}');
    }).catch(function(error) {
        res.end('{"message" : "Firebase error.!", "status" : 500}');
    });
});

router.post('/updateProfile', function(req, res){
    upload(req, res, function(err) {
        if (err) {
            console.log('Error: '+err)
            res.end('{"message" : "Profile picture is not uploaded.!", "status" : 500}');
        }
        let user = firebase.auth().currentUser;
        let data;

        if("file" in req){

            if(req.session.user.account_type === 'SUPER ADMIN'){
                data = {
                    status: 1,
                    account_type: req.session.user.account_type,
                    email: req.body.txt_email,
                    first_name: req.body.txt_first_name,
                    last_name: req.body.txt_last_name,
                    profile_pic_url: req.file.filename,
                    contact_no: req.body.txt_tel,
                    uid: user.uid
                }
            }else{
                data = {
                    account_type: req.session.user.account_type,
                    email: req.body.txt_email,
                    first_name: req.body.txt_first_name,
                    last_name: req.body.txt_last_name,
                    profile_pic_url: req.file.filename,
                    contact_no: req.body.txt_tel,
                    uid: user.uid,
                    status: 1,
                    pro_id: req.session.user.pro_id,
                    des_id: req.session.user.des_id,
                    district_name: req.session.user.district_name,
                    province_name: req.session.user.province_name,
                }
            }

            user.updateEmail(req.body.txt_email).then(function() {
                user = firebase.auth().currentUser;
                firebase.database().ref('backend_users').child(user.uid).update(data
                , function(errors) {
                    if (errors) {
                        console.log(errors);
                        res.end('{"message" : "Firebase error.!", "status" : 500}');
                    } else {
                        if(req.body.txt_email !== eq.session.user.email){
                            user.sendEmailVerification().then(function() {
                                res.end('{"message" : "Account updated successfully, Please check for verify email for given mail.!", "status" : 200}');
                                fs.unlink('./public/images/users/'+req.body.txt_current_pic_url,function(err){
                                    if(err) return console.log(err);
                                    console.log('file deleted successfully');
                                });

                            }).catch(function(error) {
                                res.end('{"message" : "Message Server Error.!", "status" : 500}');
                            });
                        }else{
                            res.end('{"message" : "Account updated successfully.!", "status" : 200}');
                        }

                    }
                });
            }).catch(function(error) {
                res.end('{"message" : "Firebase error.!", "status" : 500}');
            });
        }else{

            if(req.session.user.account_type === 'SUPER ADMIN'){
                data = {
                    status: 1,
                    account_type: req.session.user.account_type,
                    email: req.body.txt_email,
                    first_name: req.body.txt_first_name,
                    last_name: req.body.txt_last_name,
                    profile_pic_url: req.body.txt_current_pic_url,
                    contact_no: req.body.txt_tel,
                    uid: user.uid
                }
            }else{
                data = {
                    account_type: req.session.user.account_type,
                    email: req.body.txt_email,
                    first_name: req.body.txt_first_name,
                    last_name: req.body.txt_last_name,
                    profile_pic_url: req.body.txt_current_pic_url,
                    contact_no: req.body.txt_tel,
                    uid: user.uid,
                    status: 1,
                    pro_id: req.session.user.pro_id,
                    des_id: req.session.user.des_id,
                    district_name: req.session.user.district_name,
                    province_name: req.session.user.province_name,
                }
            }

            user.updateEmail(req.body.txt_email).then(function() {
                user = firebase.auth().currentUser;
                firebase.database().ref('backend_users').child(user.uid).update(data, function(errors) {
                    if (errors) {
                        console.log(errors);
                        res.end('{"message" : "Firebase error.!", "status" : 500}');
                    } else {
                        if(req.body.txt_email !== req.session.user.email) {
                            user.sendEmailVerification().then(function () {
                                res.end('{"message" : "Account updated successfully, Please check for verify email for given mail.!", "status" : 200}');
                            }).catch(function (error) {
                                res.end('{"message" : "Message Server Error.!", "status" : 500}');
                            });
                        }else{
                            res.end('{"message" : "Account updated successfully.!", "status" : 200}');
                        }

                    }
                });
            }).catch(function(error) {
                res.end('{"message" : "Firebase error.!", "status" : 500}');
            });
        }

    });
});


module.exports = router;