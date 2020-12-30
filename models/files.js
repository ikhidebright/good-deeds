import { model, Schema } from "mongoose"

const File = new Schema({
    files: {
        type: [String]
    },
    CreatedDate: { type: Date, default: Date.now },
    CreadtedBy: { type: Schema.Types.ObjectId, ref: 'User' },
})

export const Files = model('Files', File)
