const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");
const util = require("util");
const { BUCKET_NAME, AWS_REGION, AWS_ACCESS_KEY, AWS_SECRET_KEY } = require("../globals");
const unlinkFile = util.promisify(fs.unlink)
const s3 = new S3({
  region: AWS_REGION,
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
})
const fileUpload = async (req, res) => {
    const file = req.file;
    const result = await uploadFile(file);
    await unlinkFile(file.path);
    res.status(200).json({
        isError: false,
        data: result
    })
}

function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: BUCKET_NAME,
    Body: fileStream,
    Key: file.filename
  }

    return s3.upload(uploadParams).promise();
}

module.exports = fileUpload;