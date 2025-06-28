module.exports = (req, res, next) => {
  console.log(req.session.isAuth,"session");
  if (req.session.isAuth) {
    return next();
  } else {
    return res.redirect("/");
  }
};
