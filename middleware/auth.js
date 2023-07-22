const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequest,
  UnauthenticatedError,
  CustomAPIError,
} = require("../errors");
// const CustomAPIError = require("../errors/custom-error");
const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("No token provided");
  }
  const token = authHeader.split(" ")[1];

  try {
    console.log("process.env.JWT_SECRET", process);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next();

    // console.log("decoded", decoded);
  } catch (error) {
    throw new UnauthenticatedError("Not authorized to access this route");
  }
};
module.exports = authenticationMiddleware;
