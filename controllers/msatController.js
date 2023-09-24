const { randomNumbers } = require("../utils");
const {
  QuestionModel,
  ContestModel,
  AnswerModel,
  AttemptModel,
  ScoreModel,
  CurrentCourseModel,
} = require("../Schemas");
const { request } = require("express");

const contestCreator = async (req, res) => {
  // try {
  // will take the  noOfQues To add in the contest and the deadline in ms
  const { noOfQues, deadline } = req.body;
  const quesCount = await QuestionModel.countDocuments();
  const quesIndexes = randomNumbers(0, Number(quesCount) - 1, Number(noOfQues));

  let questions = await QuestionModel.find({}, { _id: 1 }).lean().exec();
  questions = questions.filter((_, index) => {
    return quesIndexes.includes(index);
  });
  const contest = await ContestModel.create({
    userID: res.locals.user._id,
    quesID: questions.map((element) => element._id),
    deadline: Date.now() + Number(deadline),
  });
  res.status(200).json({
    isError: false,
    data: contest,
  });
  // } catch (error) {
  //   res.status(500).json({
  //     isError: false,
  //     error,
  //     msg: "Internal Server Error",
  //   });
  // }
};

const getQuestionByID = async (req, res) => {
  try {
    const question = await QuestionModel.findById(req.params.id, {
      _id: 1,
      title: 1,
    })
      .lean()
      .exec();
    const answers = await AnswerModel.find(
      { quesID: req.params.id },
      { content: 1, _id: 1 }
    )
      .lean()
      .exec();

    res.status(200).json({
      isError: false,
      data: {
        question,
        answers,
      },
    });
  } catch (error) {
    res.status(500).json({
      isError: false,
      error,
      msg: "Internal Server Error",
    });
  }
};

const attemptQuestion = async (req, res) => {
  try {
    const { quesID, ansID, contestID } = req.body;
    await AttemptModel.create({
      quesID,
      ansID,
      contestID,
    });
    res.status(200).json({
      isError: false,
      data: {
        msg: "Answered",
      },
    });
  } catch (error) {
    res.status(500).json({
      isError: false,
      error,
      msg: "Internal Server Error",
    });
  }
};

const findAttempt = async (req, res) => {
  try {
    const { quesID, contestID } = req.params;
    const attempt = await AttemptModel.findOne({ quesID, contestID })
      .lean()
      .exec();

    res.status(200).json({
      isError: false,
      data: attempt,
    });
  } catch (error) {
    res.status(500).json({
      isError: false,
      error,
      msg: "Internal Server Error",
    });
  }
};

const result = async (req, res) => {
  try {
    const contestID = req.params.contestID;
    const contest = await ContestModel.findById(contestID)
      .populate("quesID")
      .lean()
      .exec();
    const maxMarks = contest.quesID.reduce((a, b) => {
      return a + b.marks;
    }, 0);

    const attempts = await AttemptModel.find({
      contestID,
      userID: request.locals.user._id,
    })
      .populate("ansID")
      .lean()
      .exec();

    let marks = 0;
    for (let i = 0; i < attempts.length; i++) {
      if (attempts[i].ansID.isCorrect === false) continue;
      for (let j = 0; j < contest.quesID.length; j++) {
        if (contest.quesID[i]._id === attempts[i].ansID.quesID) {
          marks += contest.quesID[i].marks;
        }
      }
    }
    const scoredata = await ScoreModel.findOne({ userID: res.locals.users._id, })
    if (scoredata && scoredata.bestScore < marks) {
      await ScoreModel.findByIdAndUpdate(scoredata._id, {
        userID: scoredata.userID,
        bestScore: marks
      })
    }
    res.status(200).json({
      isError: false,
      data: {
        maxMarks,
        marks,
      },
    });
  } catch (error) {
    res.status(500).json({
      isError: true,
      error,
      msg: "Internal Server Error",
    });
  }
};

const scoreFindByUser = async (req, res) => {
  try {
    const score = await ScoreModel.findOne({ userID: res.locals.users._id });
    const cuttOffs = await CurrentCourseModel.find({ applicationDeadlline: { $gt: Date.now() } }, {cuttOff: 1});
    res.status(200).json({
      isError: false,
      score,
      cuttOffs
    })
  } catch (error) {
    res.status(500).json({
      isError: true,
      error,
      msg: "Internal Server Error",
    });
  }
}

module.exports = {
  contestCreator,
  getQuestionByID,
  attemptQuestion,
  findAttempt,
  result,
  scoreFindByUser
};
