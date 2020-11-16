import { model, Schema } from "mongoose"
import permissions from '../config/permission'

const Role = new Schema({
    name: { type: String, required: true, min: 3, max: 20 },
    permission: { 
        type: [String],
        enum: permissions,
        validate: v => Array.isArray(v) && v.length > 0, 
    },
    description: { type: String, required: true },
    CreatedDate: { type: Date, default: Date.now },
    CreadtedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    ModifiedDate: { type: Date },
    ModifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
})

export const Roles = model('Roles', Role)
