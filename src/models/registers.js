const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  number:{
    type:Number,
    unique: true,
    required:true,
  },
  gender:{
    type:String,
    required:true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
});

// collection
const Register = new mongoose.model("register", candidateSchema);

module.exports = Register;
