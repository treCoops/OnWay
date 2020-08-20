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

    if(req.session.user) {

        if(req.session.user.account_type.toString() === 'SUPER ADMIN') {
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

    }else{
        res.render('Login/login', {
            data: 'Please login!.',
            title: 'OnWay | Login',
            status: ''
        });
    }
});


router.get('/regional_admin', function(req, res, next) {

    if(req.session.user) {

        if(req.session.user.account_type.toString() === 'SUPER ADMIN') {
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

    }else{
        res.render('Login/login', {
            data: 'Please login!.',
            title: 'OnWay | Login',
            status: ''
        });
    }
});

router.get('/manager', function(req, res, next) {

    if(req.session.user) {

        if(req.session.user.account_type.toString() === 'SUPER ADMIN') {
            res.render('Template/template', {
                Page_Content: 'Manager',
                title: 'OnWay | Manager',
                profile: req.session.user
            });
        }else{
            res.render('Login/login', {
                data: 'Please login with super admin account!.',
                title: 'OnWay | Login',
                status: ''
            });
        }

    }else{
        res.render('Login/login', {
            data: 'Please login!.',
            title: 'OnWay | Login',
            status: ''
        });
    }
});

router.get('/coordinator', function(req, res, next) {

    if(req.session.user) {

        if(req.session.user.account_type.toString() === 'SUPER ADMIN') {
            res.render('Template/template', {
                Page_Content: 'Coordinator',
                title: 'OnWay | Coordinator',
                profile: req.session.user
            });
        }else{
            res.render('Login/login', {
                data: 'Please login with super admin account!.',
                title: 'OnWay | Login',
                status: ''
            });
        }

    }else{
        res.render('Login/login', {
            data: 'Please login!.',
            title: 'OnWay | Login',
            status: ''
        });
    }
});

router.get('/drivers', function(req, res) {
    if(req.session.user) {

        if(req.session.user.account_type.toString() === 'SUPER ADMIN' || req.session.user.account_type.toString() === 'REGIONAL ADMIN') {
            res.render('Template/template', {
                Page_Content: 'Driver',
                title: 'OnWay | Taxi Drivers',
                profile: req.session.user
            });
        }else{
            res.render('Login/login', {
                data: 'Please login with super admin account!.',
                title: 'OnWay | Login',
                status: ''
            });
        }

    }else{
        res.render('Login/login', {
            data: 'Please login with super admin account!.',
            title: 'OnWay | Login',
            status: ''
        });
    }
});

router.get('/foodRiders', function(req, res) {
    if(req.session.user) {

        if(req.session.user.account_type.toString() === 'SUPER ADMIN' || req.session.user.account_type.toString() === 'REGIONAL ADMIN') {
            res.render('Template/template', {
                Page_Content: 'Food_Rider',
                title: 'OnWay | Food Delivery Riders',
                profile: req.session.user
            });
        }else{
            res.render('Login/login', {
                data: 'Please login with super admin account!.',
                title: 'OnWay | Login',
                status: ''
            });
        }

    }else{
        res.render('Login/login', {
            data: 'Please login with super admin account!.',
            title: 'OnWay | Login',
            status: ''
        });
    }
});

router.get('/trackFoodRiders', function(req, res) {
    if(req.session.user) {

        if(req.session.user.account_type.toString() === 'SUPER ADMIN' || req.session.user.account_type.toString() === 'REGIONAL ADMIN') {
            res.render('Template/template', {
                Page_Content: 'Track_Food_Driver',
                title: 'OnWay | Track Food Delivery Riders',
                profile: req.session.user
            });
        }else{
            res.render('Login/login', {
                data: 'Please login with super admin account!.',
                title: 'OnWay | Login',
                status: ''
            });
        }

    }else{
        res.render('Login/login', {
            data: 'Please login!.',
            title: 'OnWay | Login',
            status: ''
        });
    }
});

router.get('/groceryRiders', function(req, res) {
    if(req.session.user) {

        if(req.session.user.account_type.toString() === 'SUPER ADMIN' || req.session.user.account_type.toString() === 'REGIONAL ADMIN') {
            res.render('Template/template', {
                Page_Content: 'Grocery_Rider',
                title: 'OnWay | Grocery Delivery Riders',
                profile: req.session.user
            });
        }else{
            res.render('Login/login', {
                data: 'Please login with super admin account!.',
                title: 'OnWay | Login',
                status: ''
            });
        }

    }else{
        res.render('Login/login', {
            data: 'Please login with super admin account!.',
            title: 'OnWay | Login',
            status: ''
        });
    }
});

router.get('/trackGroceryRiders', function(req, res) {
    if(req.session.user) {

        if(req.session.user.account_type.toString() === 'SUPER ADMIN' || req.session.user.account_type.toString() === 'REGIONAL ADMIN') {
            res.render('Template/template', {
                Page_Content: 'Track_Grocery_Driver',
                title: 'OnWay | Track Grocery Delivery Riders',
                profile: req.session.user
            });
        }else{
            res.render('Login/login', {
                data: 'Please login with super admin account!.',
                title: 'OnWay | Login',
                status: ''
            });
        }

    }else{
        res.render('Login/login', {
            data: 'Please login!.',
            title: 'OnWay | Login',
            status: ''
        });
    }
});

router.get('/pharmacyRiders', function(req, res) {
    if(req.session.user) {

        if(req.session.user.account_type.toString() === 'SUPER ADMIN' || req.session.user.account_type.toString() === 'REGIONAL ADMIN') {
            res.render('Template/template', {
                Page_Content: 'Pharmacy_Rider',
                title: 'OnWay | Pharmacy Delivery Riders',
                profile: req.session.user
            });
        }else{
            res.render('Login/login', {
                data: 'Please login with super admin account!.',
                title: 'OnWay | Login',
                status: ''
            });
        }

    }else{
        res.render('Login/login', {
            data: 'Please login with super admin account!.',
            title: 'OnWay | Login',
            status: ''
        });
    }
});

router.get('/trackPharmacyRiders', function(req, res) {
    if(req.session.user) {

        if(req.session.user.account_type.toString() === 'SUPER ADMIN' || req.session.user.account_type.toString() === 'REGIONAL ADMIN') {
            res.render('Template/template', {
                Page_Content: 'Track_Pharmacy_Driver',
                title: 'OnWay | Track Pharmacy Delivery Riders',
                profile: req.session.user
            });
        }else{
            res.render('Login/login', {
                data: 'Please login with super admin account!.',
                title: 'OnWay | Login',
                status: ''
            });
        }

    }else{
        res.render('Login/login', {
            data: 'Please login!.',
            title: 'OnWay | Login',
            status: ''
        });
    }
});

router.get('/courierRiders', function(req, res) {
    if(req.session.user) {

        if(req.session.user.account_type.toString() === 'SUPER ADMIN' || req.session.user.account_type.toString() === 'REGIONAL ADMIN') {
            res.render('Template/template', {
                Page_Content: 'Courier_Rider',
                title: 'OnWay | Courier Delivery Riders',
                profile: req.session.user
            });
        }else{
            res.render('Login/login', {
                data: 'Please login with super admin account!.',
                title: 'OnWay | Login',
                status: ''
            });
        }

    }else{
        res.render('Login/login', {
            data: 'Please login with super admin account!.',
            title: 'OnWay | Login',
            status: ''
        });
    }
});

router.get('/trackCourierRiders', function(req, res) {
    if(req.session.user) {

        if(req.session.user.account_type.toString() === 'SUPER ADMIN' || req.session.user.account_type.toString() === 'REGIONAL ADMIN') {
            res.render('Template/template', {
                Page_Content: 'Track_Courier_Driver',
                title: 'OnWay | Track Courier Delivery Riders',
                profile: req.session.user
            });
        }else{
            res.render('Login/login', {
                data: 'Please login with super admin account!.',
                title: 'OnWay | Login',
                status: ''
            });
        }

    }else{
        res.render('Login/login', {
            data: 'Please login!.',
            title: 'OnWay | Login',
            status: ''
        });
    }
});

router.get('/passengers', function(req, res) {
    if(req.session.user) {

        if(req.session.user.account_type.toString() === 'SUPER ADMIN' || req.session.user.account_type.toString() === 'REGIONAL ADMIN') {
            res.render('Template/template', {
                Page_Content: 'Passenger',
                title: 'OnWay | Passengers',
                profile: req.session.user
            });
        }else{
            res.render('Login/login', {
                data: 'Please login with super admin account!.',
                title: 'OnWay | Login',
                status: ''
            });
        }
    }else{
        res.render('Login/login', {
            data: 'Please login!.',
            title: 'OnWay | Login',
            status: ''
        });
    }
});

router.get('/trackDrivers', function(req, res) {
    if(req.session.user) {

        if(req.session.user.account_type.toString() === 'SUPER ADMIN' || req.session.user.account_type.toString() === 'REGIONAL ADMIN') {
            res.render('Template/template', {
                Page_Content: 'Track_Driver',
                title: 'OnWay | Track Taxi Drivers',
                profile: req.session.user
            });
        }else{
            res.render('Login/login', {
                data: 'Please login with super admin account!.',
                title: 'OnWay | Login',
                status: ''
            });
        }

    }else{
        res.render('Login/login', {
            data: 'Please login!.',
            title: 'OnWay | Login',
            status: ''
        });
    }
});

router.post('/updateRegionalUser', function(req,res){

    let create_account = 0;
    let taxi = 0;
    let food = 0;
    let grocery = 0;
    let pharmacy = 0;
    let courier = 0;

    if(req.body.edit_chk_create_account === '1')
        create_account = 1;

    if(req.body.edit_chk_taxi_access === '1')
        taxi = 1;

    if(req.body.edit_chk_food_access === '1')
        food = 1;

    if(req.body.edit_chk_grocery_access === '1')
        grocery = 1;

    if(req.body.edit_chk_pharmacy_access === '1')
        pharmacy = 1;

    if(req.body.edit_chk_courier_access === '1')
        courier = 1;

    firebase.database().ref('backend_users').child(req.body.edit_txt_uid).update({
        pro_id: req.body.edit_cmb_province,
        des_id: req.body.edit_cmb_district,
        privileges: {
            courier_access: courier,
            create_user: create_account,
            food_access: food,
            grocery_access: grocery,
            pharmacy_access: pharmacy,
            taxi_access: taxi
        },
        district_name: req.body.edit_txt_district_name,
        province_name: req.body.edit_txt_province_name
    }, function(errors) {
        if (errors) {
            console.log(errors);
            res.end('{"message" : "Internal server error.!", "status" : 500}');
        } else {
            res.end('{"message" : "Account updated successfully.!", "status" : 200}');
        }
    });
});

router.post('/createRegionalUser', function(req,res){
    upload(req, res, function(err) {
        if (err) {
            console.log('Error: ' + err)
            res.end('{"message" : "Profile picture is not uploaded.!", "status" : 500}');
        }

        firebase.auth().createUserWithEmailAndPassword(req.body.txt_email, req.body.txt_confirm_password).then(function () {
            let user = firebase.auth().currentUser;

            let create_account = 0;
            let taxi = 0;
            let food = 0;
            let grocery = 0;
            let pharmacy = 0;
            let courier = 0;

            if(req.body.chk_create_account === '1')
                create_account = 1;

            if(req.body.chk_taxi_access === '1')
                taxi = 1;

            if(req.body.chk_food_access === '1')
                food = 1;

            if(req.body.chk_grocery_access === '1')
                grocery = 1;

            if(req.body.chk_pharmacy_access === '1')
                pharmacy = 1;

            if(req.body.chk_courier_access === '1')
                courier = 1;

            firebase.database().ref('backend_users').child(user.uid).set({
                account_type: 'REGIONAL ADMIN',
                email: req.body.txt_email,
                first_name: req.body.txt_first_name,
                last_name: req.body.txt_last_name,
                profile_pic_url: req.file.filename,
                contact_no: req.body.txt_tel,
                pro_id: req.body.cmb_province,
                des_id: req.body.cmb_district,
                privileges: {
                    courier_access: courier,
                    create_user: create_account,
                    food_access: food,
                    grocery_access: grocery,
                    pharmacy_access: pharmacy,
                    taxi_access: taxi
                },
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

router.post('/createManager', function(req,res){
    upload(req, res, function(err) {
        if (err) {
            console.log('Error: ' + err)
            res.end('{"message" : "Profile picture is not uploaded.!", "status" : 500}');
        }

        firebase.auth().createUserWithEmailAndPassword(req.body.txt_email, req.body.txt_confirm_password).then(function () {
            let user = firebase.auth().currentUser;

            let create_account = 0;
            let taxi = 0;
            let food = 0;
            let grocery = 0;
            let pharmacy = 0;
            let courier = 0;

            if(req.body.chk_create_account === '1')
                create_account = 1;

            if(req.body.chk_taxi_access === '1')
                taxi = 1;

            if(req.body.chk_food_access === '1')
                food = 1;

            if(req.body.chk_grocery_access === '1')
                grocery = 1;

            if(req.body.chk_pharmacy_access === '1')
                pharmacy = 1;

            if(req.body.chk_courier_access === '1')
                courier = 1;

            firebase.database().ref('backend_users').child(user.uid).set({
                account_type: 'MANAGER',
                email: req.body.txt_email,
                first_name: req.body.txt_first_name,
                last_name: req.body.txt_last_name,
                profile_pic_url: req.file.filename,
                contact_no: req.body.txt_tel,
                pro_id: req.body.cmb_province,
                des_id: req.body.cmb_district,
                privileges: {
                    courier_access: courier,
                    create_user: create_account,
                    food_access: food,
                    grocery_access: grocery,
                    pharmacy_access: pharmacy,
                    taxi_access: taxi
                },
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

router.post('/createCoordinator', function(req,res){
    upload(req, res, function(err) {
        if (err) {
            console.log('Error: ' + err)
            res.end('{"message" : "Profile picture is not uploaded.!", "status" : 500}');
        }

        firebase.auth().createUserWithEmailAndPassword(req.body.txt_email, req.body.txt_confirm_password).then(function () {
            let user = firebase.auth().currentUser;

            let create_account = 0;
            let taxi = 0;
            let food = 0;
            let grocery = 0;
            let pharmacy = 0;
            let courier = 0;

            if(req.body.chk_create_account === '1')
                create_account = 1;

            if(req.body.chk_taxi_access === '1')
                taxi = 1;

            if(req.body.chk_food_access === '1')
                food = 1;

            if(req.body.chk_grocery_access === '1')
                grocery = 1;

            if(req.body.chk_pharmacy_access === '1')
                pharmacy = 1;

            if(req.body.chk_courier_access === '1')
                courier = 1;

            firebase.database().ref('backend_users').child(user.uid).set({
                account_type: 'COORDINATOR',
                email: req.body.txt_email,
                first_name: req.body.txt_first_name,
                last_name: req.body.txt_last_name,
                profile_pic_url: req.file.filename,
                contact_no: req.body.txt_tel,
                pro_id: req.body.cmb_province,
                des_id: req.body.cmb_district,
                privileges: {
                    courier_access: courier,
                    create_user: create_account,
                    food_access: food,
                    grocery_access: grocery,
                    pharmacy_access: pharmacy,
                    taxi_access: taxi
                },
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

router.post('/removeDriver', function(req, res){

    let starCountRef = firebase.database().ref('mobile_users').child('drivers').child(req.body.ID);
    starCountRef.once('value', function (snapshot) {
        admin.auth().deleteUser(req.body.ID)
            .then(function() {
                let usr = firebase.database().ref('mobile_users').child('drivers').child(req.body.ID);
                usr.remove()
                    .then(function () {
                        res.end('{"message" : "Account removed successfully.!", "status" : 200}');
                    })
                    .catch(function (error) {
                        console.log(error);
                        res.end('{"message" : "Firebase error.!", "status" : 500}');
                    });
            })
            .catch(function(error) {
                res.end('{"message" : "Authentication error.!", "status" : 500}');
            });
    });

});

router.post('/removePassenger', function(req, res){

    let starCountRef = firebase.database().ref('mobile_users').child('passengers').child(req.body.ID);
    starCountRef.once('value', function (snapshot) {
        admin.auth().deleteUser(req.body.ID)
            .then(function() {
                let usr = firebase.database().ref('mobile_users').child('passengers').child(req.body.ID);
                usr.remove()
                    .then(function () {
                        res.end('{"message" : "Account removed successfully.!", "status" : 200}');
                    })
                    .catch(function (error) {
                        console.log(error);
                        res.end('{"message" : "Firebase error.!", "status" : 500}');
                    });
            })
            .catch(function(error) {
                res.end('{"message" : "Authentication error.!", "status" : 500}');
            });
    });

});




router.post('/blockSuperUser', function(req, res){

    if(req.body.status === '1')
    {
        admin.auth().updateUser(req.body.ID, {
            disabled: true
        }).then(function (userRecord) {

            firebase.database().ref('backend_users').child(req.body.ID).update({
                status: 0
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

            firebase.database().ref('backend_users').child(req.body.ID).update({
                status: 1
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


router.post('/blockDriver', function(req, res){

    let starCountRef = firebase.database().ref('mobile_users').child('drivers').child(req.body.ID).once('value', function (snapshot) {
        console.log(snapshot.val());
        if(req.body.status === '0')
        {
            admin.auth().updateUser(req.body.ID, {
                disabled: true
            }).then(function (userRecord) {

                firebase.database().ref('mobile_users').child('drivers').child(req.body.ID).update({
                    blocked_status: 1
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
        if (req.body.status === '1') {
            admin.auth().updateUser(req.body.ID, {
                disabled: false
            }).then(function (userRecord) {

                firebase.database().ref('mobile_users').child('drivers').child(req.body.ID).update({
                    blocked_status: 0
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

router.post('/blockPassenger', function(req, res){

    let starCountRef = firebase.database().ref('mobile_users').child('passengers').child(req.body.ID).once('value', function (snapshot) {
        console.log(snapshot.val());
        if(req.body.status === '0')
        {
            admin.auth().updateUser(req.body.ID, {
                disabled: true
            }).then(function (userRecord) {

                firebase.database().ref('mobile_users').child('passengers').child(req.body.ID).update({
                    blocked_status: 1
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
        if (req.body.status === '1') {
            admin.auth().updateUser(req.body.ID, {
                disabled: false
            }).then(function (userRecord) {

                firebase.database().ref('mobile_users').child('passengers').child(req.body.ID).update({
                    blocked_status: 0
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
                privileges: {
                    courier_access: 1,
                    create_user: 1,
                    food_access: 1,
                    grocery_access: 1,
                    pharmacy_access: 1,
                    taxi_access: 1
                },
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