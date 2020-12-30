import { model, Schema } from "mongoose"

const deed = new Schema({
    deed: { type: String, required: true, min: 20, max: 400 },
    location: { type: String, required: true },
    name: { type: String, required: true },
    date: { type: String, required: true },
    files: { type: Schema.Types.ObjectId, ref: 'Files' },
    approved: { type: Boolean, default: null },
    likes: { type: Number, default: 0 },
    CreatedDate: { type: Date, default: Date.now },
    CreadtedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    ModifiedDate: { type: Date },
    ModifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
})

export const Deed = model('Deed', deed)
