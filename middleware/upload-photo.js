const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

aws.config.update({
  secretAccessKey: process.env.AWSSecretKey,
  accessKeyId: process.env.AWSAccessKeyId,
});
const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: "pharma-find",
    acl: "public-read",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString());
    },
  }),
});

module.exports = upload;

// const multer = require("multer");

// const storage = multer.diskStorage({
//   filename: (req, file, cb) => {
//     cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
//   },
//   destination: (req, file, cb) => {
//     cb(null, "./documents");
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     // eslint-disable-next-line operator-linebreak
//     file.mimetype === "image/jpeg" ||
//     // eslint-disable-next-line operator-linebreak
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/png"
//   ) {
//     cb(null, true);
//   } else {
//     cb(new Error("File type not accepted"), false);
//   }
// };

// const upload = multer({
//   storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5,
//   },
//   fileFilter,
// });

// module.exports = upload;
