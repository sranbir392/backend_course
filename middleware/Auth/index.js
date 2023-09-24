const { BearerTokenFinder } = require("../../utils");
const { decode } = require("jsonwebtoken");
const { UsersModel } = require("../../Schemas");
const AuthMiddleware = (role = "student") => {
  return async (req, res, next) => {
    const jwtToken = BearerTokenFinder(req.headers.authorization);
    if (jwtToken === null) {
      return res.status(403).json({
        isError: true,
        isSuccess: false,
        error: { message: "Unauthorized" },
      });
    }
    const id = decode(jwtToken).id;
    if (!id) {
      return res.status(403).json({
        isError: true,
        isSuccess: false,
        error: { message: "Unauthorized" },
      });
    }

    const user = await UsersModel.findById(id)
      .populate("roleID", "name")
      .lean()
      .exec();
    if (!user || user.roleID.name !== role) {
      if (user.roleID.name !== "admin") {
        return res.status(403).json({
          isError: true,
          isSuccess: false,
          error: { message: "Unauthorized" },
        });
      }
    }
    res.locals.user = user;
    next();
  };
};

module.exports = AuthMiddleware;
