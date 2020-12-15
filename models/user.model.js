import { model, Schema } from "mongoose"
const gender = ['male', 'female', 'transgender', 'gender neutral', 'non-binary', 'agender', 'pangender', 'genderqueer']
const permissions = ['male', 'female', 'transgender', 'gender neutral', 'non-binary', 'agender', 'pangender', 'genderqueer']

const user = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    role: { type: Schema.Types.ObjectId, ref: 'Roles' },
    emailConfirm: { type: Boolean, default: false },
    blocked: { type: Boolean, default: false },
    password: { type: String, required: true },
    profilePic: { type: String, default: 'https://good-deed-app.s3-us-west-1.amazonaws.com/user.png' },
    firstName: { type: String },
    lastName: { type: String },
    address: { type: String },
    country: { type: String },
    state: { type: String },
    gender: { 
        type: String,
        enum: gender 
    },
    dob: { type: Date },
    maritalStatus: { 
        type: String,
        enum: permissions, 
    },
    CreatedDate: { type: Date, default: Date.now },
    CreadtedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    ModifiedDate: { type: Date },
    ModifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
})

export const User = model('User', user)
