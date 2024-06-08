import mongoose from "mongoose";
const {Schema , model } = mongoose


let userSchema = new Schema({
    name: {type: String },
    email : {type: String, unique: true , required : true },
    password : {type: String, required : true },
    internshipIds : ["String"]
})

let User = model("User", userSchema);

export default User;


