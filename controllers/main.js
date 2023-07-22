const jwt = require("jsonwebtoken");

const CustomAPIError = require("../errors/custom-error");
const login = async (req, res) => {
  const { username, password } = req.body;
  //   res.send(req.body);
  if (!username || !password) {
    throw new CustomAPIError("Please provide email and password", 400);
  }
  //demo id for the user
  const id = new Date().getDate();
  const token = jwt.sign(
    { id: id, username: username },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  // const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // const { id, username } = decoded;
  console.log("req.user", req.user);
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${req?.user?.username},`,
    secret: `Your lucky number is ${luckyNumber}`,
  });
  // console.log("decoded", decoded);
};
module.exports = {
  login,
  dashboard,
};
