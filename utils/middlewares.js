export const checkLogin = (req, res, next) => {
  if (req.session.user) {
    console.log("already here", req.session.user);
    next();
  } else res.redirect("/admin");
};

export const bypassLogin = (req, res, next) => {
  if (!req.session.user) {
    next();
  } else {
    res.redirect("/dashboard");
  }
};
