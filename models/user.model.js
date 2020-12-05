import { model, Schema } from "mongoose"

const user = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    role: { type: Schema.Types.ObjectId, ref: 'Roles' },
    emailConfirm: { type: Boolean, default: false },
    blocked: { type: Boolean, default: false },
    password: { type: String, required: true },
    profilePic: { type: String, default: 'https://good-deed-app.s3-us-west-1.amazonaws.com/user.png' },
    CreatedDate: { type: Date, default: Date.now },
    CreadtedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    ModifiedDate: { type: Date },
    ModifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
})

export const User = model('User', user)
