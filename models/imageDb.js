// import { model, Schema } from "mongoose";

// const Image = new Schema({
//   images: { type: Array },
// });

// export const Images = model("Image", Image);
// import mongoose from "mongoose";

// const { Schema } = mongoose;

// const GallerySchema = new Schema(
//   {
//     // image: {
//     //   type: Array,
//     // },
//     photo: String,
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Gallery", GallerySchema);
import mongoose from "mongoose";

const { Schema } = mongoose;

const GallerySchema = new Schema(
  {
    image: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", GallerySchema);
