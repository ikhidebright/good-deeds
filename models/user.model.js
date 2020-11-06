import { model, Schema } from "mongoose"

const user = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: Schema.Types.ObjectId, ref: 'Roles' },
    emailConfirm: { type: Boolean, default: false },
    blocked: { type: Boolean, default: false },
    password: { type: String, required: true },
    CreatedDate: { type: Date, default: Date.now },
    CreadtedBy: { type: Date, default: Date.now },
    ModifiedDate: { type: Date, default: Date.now },
    ModifiedBy: { type: Date, default: Date.now },
})

export const User = model('User', user)
