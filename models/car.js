const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    contract:{
        type:Number,
        required:true
    },
    userEmail: {
        type:String,
        required:true
    },
    name: {
        type:String,
        required:true
    },
    deliveryDate:{
        type:Date,
        required:true
    },
    dateMEC: {
        type:Date,
        required:true
    },
    odometre: {
        type:Number,
        required:true
    },
    phaseWW : {
        type:Number,
        required:true
    },
    dateRemiseRecip : {
        type:Date,
        required:true
    },
    phaseImmat : {
        type:Number,
        required:true
    },
    dateImmat: {
        type:Date,
        required:true
    },
    wassel1:{
        type:String,
        required:true
    },
    wassel2 : {
        type:String,
        required:true
    },
    wassel3 : {
        type:String,
        required:true
    },
    visiteTech : {
        type:Number,
        required:true
    },
    prochaineRev : {
        type:Number,
        required:true
    },
    depassement : {
        type:Number,
        required:true
    },
    contractuel:{
        type:Number,
        required:true
    },
    vitessMax : {
        type:Number,
        required:true
    },
    consomationMontuelle:{
        type:Number,
        required:true
    },
    imgUrl:{
        type:String,
        required:true
    },
    dateEntretien : {
        type:Date,
        required:true
    },
    dateVT : {
        type: Date,
        required:true
    }
});

module.exports = mongoose.model('Cars', carSchema);

