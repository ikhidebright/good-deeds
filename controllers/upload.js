const Gallery = require("../models/upload");

// export default class gallery {
//   static async imageUpload(request, response, next) {
//     try {
//       const upload = await new Gallery();
//       // const upload = await new Gallery({
//       //     image : request.file.location
//       // });
//       console.log("upload", upload);
//       upload.photo = request.body.photo;

//       await upload.save();
//       response.json({
//         upload,
//         status: true,
//         message: "Successfully uploaded photo",
//       });
//     } catch (error) {
//       console.log("error", error);
//     }
//   }
// }

export default class galleryController {
  static async uploadImage(req, res) {
    console.log("file", req.file);
    console.log("location", req.file.location);
    try {
      const upload = new Gallery();
      upload.image = req.file.path;

      await upload.save();
      res.json({
        upload,
        status: true,
        message: "Successfully uploaded an image",
      });
    } catch (error) {
      console.log("error", error);
    }
  }
}
