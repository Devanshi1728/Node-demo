const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const userSchema =  new Schema({
    id: ObjectId,
    userName: {type: String, required: true},
    formNumber: {type: String},
    taskName: {type: String},
    taskDesc: {type: String},
    formDateTime: { type: Date, default: Date.now }
})

module.exports = mongoose.model("users",userSchema)