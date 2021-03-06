const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../keys")
const User = mongoose.model('User')


module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      error: "You must be logged in",
    });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({
        error: "You must be logged in"
      });
    }

    const {_id} = payload;
    User.findById(_id)
      .then((userData) => {
        req.user = userData;
        next();
      })
      .catch((error) => {
        return res.status(404).json({
          error: "You need to be logged in",
        });
      });
  });
};