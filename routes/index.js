const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const userSchema = require('../models/userModel');
const carSchema = require('../models/car');
const contractSchema = require('../models/contract');

router.get('/',isLoggedIn.checkLoginHome,(req, res, next) => {
    res.render('Dashboard/index');
});

router.get('/login',isLoggedIn.checkLoginIndex, (req,res) => {
    res.render('login');
});

router.post('/login',isLoggedIn.checkLoginIndex, function(req, res) {
    userSchema.findOne({email:req.body.email, password:req.body.password}, function(err, data){
        if ( data ){
            req.session.userSchema = {id:data._id, email:data.email};
            res.redirect("/");
        }
        else
        res.redirect("/login?error=1")
    });
});

router.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
        res.redirect("/");
    });
});

router.get('/register',isLoggedIn.checkLoginIndex, (req,res) => {
    if ( req.query.error ){
        var errorMsg = "";
        switch( req.query.error ){
            case "1" : errorMsg = "All fields are required!"; break;
            case "2" : errorMsg = "Passwords does not match!"; break;
            case "3" : errorMsg = "Email already taken!"; break;
        }
        res.render("register", {viewerror:errorMsg});
    } else 
        res.render("register");
});

router.post('/register',isLoggedIn.checkLoginIndex, function(req, res) {
    if ( req.body.email && req.body.password && req.body.cpassword){
        if ( req.body.password == req.body.cpassword ){
            userSchema.findOne({email:req.body.email}, function(err, data){
                if ( data ){
                    res.redirect("/register?error=3");
                }
                else{
                    var newUser = new userSchema({email:req.body.email, password:req.body.password});
                    newUser.save();
                    res.redirect("/");
                }
            });
        } else {
            res.redirect("/register?error=2");
        }
    } else {
        res.redirect("/register?error=1");
    }
});

router.get('/myCar',isLoggedIn.checkLoginHome, (req,res)=>{
    carSchema.find({userEmail:req.session.userSchema.email}, function(err,carslist) {
        if(carslist){
            res.render('Dashboard/myCar',{carslist:carslist});
        }else{
            res.render('Dashboard/myCar?error=2');
        }
    });
});

router.post('/createCar', isLoggedIn.checkLoginHome, (req,res)=>{
    if ( req.body.contract && req.body.name && req.body.deliveryDate && req.body.dateMEC && req.body.odometre && req.body.phaseWW && req.body.dateRemiseRecip && req.body.phaseImmat && req.body.dateImmat && req.body.wassel1 && req.body.wassel2 && req.body.wassel3 && req.body.visiteTech && req.body.prochainRev && req.body.depassement && req.body.contratActuel && req.body.vitesseMax && req.body.ConsoMentuelle && req.body.imgUrl && req.body.dateEntretien && req.body.dateVT){
                    var newCar = new carSchema({contract:req.body.contract,userEmail:req.session.userSchema.email, name:req.body.name, deliveryDate: req.body.deliveryDate, dateMEC: req.body.dateMEC, odometre:req.body.odometre, phaseWW:req.body.phaseWW, dateRemiseRecip:req.body.dateRemiseRecip, phaseImmat:req.body.phaseImmat, dateImmat:req.body.dateImmat, wassel1:req.body.wassel1, wassel2:req.body.wassel2, wassel3:req.body.wassel3, visiteTech:req.body.visiteTech, prochaineRev:req.body.prochainRev, depassement:req.body.depassement, contractuel:req.body.contratActuel, vitessMax:req.body.vitesseMax, consomationMontuelle:req.body.ConsoMentuelle, imgUrl:req.body.imgUrl, dateEntretien:req.body.dateEntretien, dateVT:req.body.dateVT});
                    newCar.save();
                    console.log(newCar);
                    res.redirect("/myCar");
    } else {
        res.redirect("/createCar?error=1");
    }
});

router.get('/myContract',isLoggedIn.checkLoginHome, (req,res)=> {
    contractSchema.find({userEmail:req.session.userSchema.email},function(err,data){
        if(err)console.log(err);
        if(data){
            res.render('Dashboard/myContract',{data:data});
        }
    })
});

router.get('/createContract',isLoggedIn.checkLoginHome, function(req,res){
    res.render('Dashboard/createContract');
} )

router.post('/createContract',isLoggedIn.checkLoginHome, function(req, res) {
    if ( req.body.numero ){
            userSchema.findOne({numero:req.body.numero}, function(err, data){
                if ( data ){
                    res.redirect("/createContract?error=3");
                }
                else{
                    console.log("test");
                    var newContract = new contractSchema({userEmail:req.session.userSchema.email, numero:req.body.numero,type:req.body.type,duration:req.body.duration});
                    newContract.save();
                    res.redirect("/myContract");
                }
            });
    } else {
        res.redirect("/createContract?error=1");
    }
});

router.get('/myContractDetails/:id',isLoggedIn.checkLoginHome, (req,res)=>{
    carSchema.find({contract:req.params.id,userEmail:req.session.userSchema.email}, function(err,data) {
        if(data){
            res.render('Dashboard/myContractDetails',{data:data});
        }
    });
});

router.get('/reparationAndMaintenance',isLoggedIn.checkLoginHome, (req,res) => {
    res.render('Dashboard/reparationAndMaintenance');
});

router.get('/services',isLoggedIn.checkLoginHome, (req,res)=>{
    carSchema.find({mail:req.session.userSchema.email}, function(err,carslist) {
        if(carslist){
            res.render('Dashboard/services',{carslist:carslist});
        }else{
            res.render('Dashboard/services?error=2');
        }
    });
});

router.get('/serfcar/:id?',  function(){
    var car=req.params.id;
    var dacia;
     carSchema.find({model:"DACIA Nouveau DUSTER AMBIANCE 1,5 dci 85 CH 4X2"},function(err,dataz){
        dacia=dataz;
    })
     carSchema.find({model:car},function(err,data){
        if(err)console.log(err);
        if(data){
            if(data.price>2*dacia.price)
            {
                var carlist=dacia+dacia+dacia;
                res.render('Dashboard/services',{carlist:carlist});
            }
        }
    });
});

router.get('/createCar', (req,res)=> {
    contractSchema.find({userEmail:req.session.userSchema.email},function(err,data){
        if(err)console.log(err);
        if(data){
            res.render('Dashboard/createCar',{data:data});
        }
    })
});

router.get('/help',isLoggedIn.checkLoginHome, (req,res) => {
    res.render('Dashboard/help');
});

module.exports = router;