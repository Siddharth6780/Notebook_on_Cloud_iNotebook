var jwt = require("jsonwebtoken");
const JWT_SECREAT = "MyNameisSID";
const fetchuser = (req, res, next) => {
  //Get the user form JWT
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please auth using a valid token" });
  }
  try {
    const str = jwt.verify(token, JWT_SECREAT);
    req.user = str.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please auth using a valid token" });
  }
};

module.exports = fetchuser;
