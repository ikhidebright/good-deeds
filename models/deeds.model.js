import { model, Schema } from "mongoose"

const deed = new Schema({
    deed: { type: String, required: true, min: 20, max: 400 },
    location: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: Schema.Types.ObjectId, ref: 'Image' },
    approved: { type: Boolean, default: null },
    CreatedDate: { type: Date, default: Date.now },
    CreadtedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    ModifiedDate: { type: Date },
    ModifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
})

export const Deed = model('Deed', deed)
