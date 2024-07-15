const { Router } = require("express");
const multer = require("multer");
const {
  index,
  create2,
  signin,
  logout,
  loginPage,
  data,
  index2,
  charts,
  tables,
  widgets,
  changePasswd,
  changePasswdPage,
  resetPage,
  resetPassword,
  verifyPage,
  verifyOtp,
  changeWithPage,
  changePasswdWithOtp,
} = require("../controllers/admin_controller");
const { authentication, isAuth, userAuth } = require("../middleware/middleware");
const passport = require('passport');
const adminrouter = Router();

adminrouter.get("/",isAuth, index);

adminrouter.get("/index2",isAuth, index2);

adminrouter.get("/charts",isAuth, charts);

adminrouter.get("/tables",isAuth, tables);

adminrouter.get("/widgets",isAuth, widgets);

adminrouter.get("/changePassword",isAuth, changePasswdPage);

adminrouter.post("/changePasswd",isAuth, changePasswd);

adminrouter.post("/changePasswdWithOtp",isAuth, changePasswdWithOtp);

adminrouter.post("/create2",userAuth, create2);

adminrouter.get("/data",data)

adminrouter.get("/signin", signin);

adminrouter.get("/logout", logout);

adminrouter.get("/login",loginPage);

adminrouter.post('/resetPassword', isAuth,resetPassword )

adminrouter.get('/resetPassPage',isAuth, resetPage)

adminrouter.get('/verifyPage',isAuth ,verifyPage)

adminrouter.get('/changeOtpPage', isAuth,changeWithPage)

adminrouter.post('/verifyOtp',isAuth ,verifyOtp)

adminrouter.post("/local",passport.authenticate('local',{
  successRedirect:'/',
  failureRedirect:'/login'
}));

module.exports = adminrouter;