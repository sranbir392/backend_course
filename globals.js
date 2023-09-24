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
const pass=[
    {
      "sectionId": "650fcccae33d4e8ad5189327",
      "sectionScore": 6,
      "sectionName": "Reading Fluency",
      "isVideoSection": false,
      "sectionMaxMarks": 10,
      "subSectionScore": []
    },
    {
      "sectionId": "650fcccae33d4e8ad518932b",
      "sectionScore": 8,
      "sectionName": "VC - 1",
      "isVideoSection": true,
      "sectionMaxMarks": 10,
      "subSectionScore": []
    },
    {
      "sectionId": "650fcccae33d4e8ad518932f",
      "sectionScore": 7,
      "sectionName": "VC - 2",
      "isVideoSection": true,
      "sectionMaxMarks": 10,
      "subSectionScore": []
    },
    {
      "sectionId": "650fcccce33d4e8ad5189345",
      "sectionScore": 23,
      "sectionName": "Cognitive Ability",
      "isVideoSection": false,
      "sectionMaxMarks": 36,
      "subSectionScore": []
    },
    {
      "sectionId": "650fcccde33d4e8ad518935f",
      "sectionScore": 11.5,
      "sectionName": "Attention to Detail",
      "isVideoSection": false,
      "sectionMaxMarks": 15.5,
      "subSectionScore": []
    },
    {
      "sectionId": "650fcccee33d4e8ad5189376",
      "sectionScore": 19,
      "sectionName": "Verbal Ability",
      "isVideoSection": true,
      "sectionMaxMarks": 30,
      "subSectionScore": []
    }
  ]
  const fail=[
    {
      "sectionId": "650fcccae33d4e8ad5189327",
      "sectionScore": 0,
      "sectionName": "Reading Fluency",
      "isVideoSection": false,
      "sectionMaxMarks": 10,
      "subSectionScore": []
    },
    {
      "sectionId": "650fcccae33d4e8ad518932b",
      "sectionScore": 0,
      "sectionName": "VC - 1",
      "isVideoSection": true,
      "sectionMaxMarks": 10,
      "subSectionScore": []
    },
    {
      "sectionId": "650fcccae33d4e8ad518932f",
      "sectionScore": 0,
      "sectionName": "VC - 2",
      "isVideoSection": true,
      "sectionMaxMarks": 10,
      "subSectionScore": []
    },
    {
      "sectionId": "650fcccce33d4e8ad5189345",
      "sectionScore": 0,
      "sectionName": "Cognitive Ability",
      "isVideoSection": false,
      "sectionMaxMarks": 36,
      "subSectionScore": []
    },
    {
      "sectionId": "650fcccde33d4e8ad518935f",
      "sectionScore": 0,
      "sectionName": "Attention to Detail",
      "isVideoSection": false,
      "sectionMaxMarks": 15.5,
      "subSectionScore": []
    },
    {
      "sectionId": "650fcccee33d4e8ad5189376",
      "sectionScore": 0,
      "sectionName": "Verbal Ability",
      "isVideoSection": true,
      "sectionMaxMarks": 30,
      "subSectionScore": []
    }
  ]
z.string().parse(JWT_SECRET);
z.string().parse(MONGO_URL);

module.exports = { JWT_SECRET, MONGO_URL, PORT, BUCKET_NAME, AWS_REGION, AWS_ACCESS_KEY, AWS_SECRET_KEY,pass,fail };
