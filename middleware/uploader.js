const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
  secretAccessKey: '41Wd6tgUydXFUJ2LXO9zhUiKaf1//L5f2ri2AZ9H',
  accessKeyId: 'AKIAJAWZX4SBJ3XVPZFA'
});
const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'my-amazon-v1',
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString());
    },
  }),
});

module.exports = upload;