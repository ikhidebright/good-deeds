import { model, Schema } from "mongoose"

const File = new Schema({
    files: { type: Array }
})

export const Files = model('Files', File)
