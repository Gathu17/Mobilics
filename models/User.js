const { model, Schema, Types } = require("mongoose");

const UserSchema = new Schema({
    id: {type: Number, unique: true},
    first_name: {type: String,},
    last_name: {type: String,},
    email: {type: String, unique: true},
    gender: {type: String,},
    income: {type: String,},
    city: {type: String,},
    car: {type: String},
    quote: {type: String},
    phone_price: {type: String, required: true}
})

module.exports = new model("User", UserSchema)