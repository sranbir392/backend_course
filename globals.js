const { config } = require("dotenv");
const { z } = require("zod");
config();

const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;
const BUCKET_NAME = process.env.BUCKET_NAME;
const AWS_REGION = process.env.AWS_REGION;
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;

z.string().parse(JWT_SECRET);
z.string().parse(MONGO_URL);

module.exports = { JWT_SECRET, MONGO_URL, PORT, BUCKET_NAME, AWS_REGION, AWS_ACCESS_KEY, AWS_SECRET_KEY };
