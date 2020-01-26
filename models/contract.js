const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const contractSchema = new Schema({
    numero:{
        type: Number,
        required:true
    },
    userEmail:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    }

});

module.exports = mongoose.model('Contracts', contractSchema);

