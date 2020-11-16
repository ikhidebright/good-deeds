import { model, Schema } from "mongoose"

const Image = new Schema({
    images: { type: Array }
})

export const Images = model('Image', Image)
