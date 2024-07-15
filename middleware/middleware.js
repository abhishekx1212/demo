const {user2} = require("../model/usrTbl");
const localStrategy = require("passport-local").Strategy;

const authentication = (req, res, next) => {
  const { name, description } = req.body;
  if (name && description) {
    next();
  } else {
    console.log("invalid data");
    res.redirect("/");
  }
};

const userAuth = (req, res, next) => {
  const { name, password } = req.body;
  if (name && password) {
    next();
  } else {
    console.log("invalid data");
    res.redirect("back");
  }
};

const isAuth = (req, res, next) => {
  if (req.user) {
    // console.log(req.user);
    next();
  } else {
    res.redirect("/login");
  }
};

const localAuth = (passport) => {
  passport.use(
    new localStrategy(async (username, password, done) => {
      let User = await user2.findOne({ name:username });
      try {
        if (!User) {
          console.log('username invalid');
          return done(null, false);
        }
        if (User.password != password) {
          console.log('password invalid');
          return done(null, false);
        }
        return done(null, User);
      } catch (error) {
        return done(error,User);
      }
    })
  );

passport.serializeUser((User, done) => {
  return done(null, User.id);
});

 passport.deserializeUser(async (id, done) => {
  let User = await user2.findById(id);
  return done(null,User);
});
};

module.exports = { authentication, isAuth, userAuth,localAuth };
