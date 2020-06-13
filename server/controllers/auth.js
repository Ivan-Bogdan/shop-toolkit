const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.signup = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists)
    return res.status(403).json({
      error: errorHandler(err),
    });
  const user = await new User(req.body);
  await user.save();
  res.status(200).json({ message: "Регистрация прошла успешно" });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Пользователь не существует. Пожалуйста, зарегистрируйтесь",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email или пароль не совпадают",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("t", token, { expire: new Date() + 9999 });

    const { _id, name, email, role, history } = user;
    return res.json({ token, user: { _id, email, name, role, history } });
  });
};

//signout
exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Выход успешно!" });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: "Нет доступа",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Доступ закрыт",
    });
  }
  next();
};
