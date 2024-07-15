const { user2 } = require("../model/usrTbl");
const fs = require("fs");
const nodemailer = require("nodemailer");

const index = async (req, res) => {
  let myName = req.user;
  return res.render("layout", { myName });
};

const index2 = async (req, res) => {
  let myName = req.user;
  return res.render("index2", { myName });
};

const charts = async (req, res) => {
  let myName = req.user;
  return res.render("charts", { myName });
};

const tables = async (req, res) => {
  let myName = req.user;
  return res.render("tables", { myName });
};

const widgets = async (req, res) => {
  let myName = req.user;
  return res.render("widgets", { myName });
};

const changePasswdPage = (req, res) => {
  return res.render("changePasswd");
};

const changePasswd = async (req, res) => {
  let { id } = req.user;
  const User = await user2.findById(id);
  const { oldPassword, newPassword, confPassword } = req.body;

  if (oldPassword == User.password) {
    if (newPassword == oldPassword) {
      console.log("old and new password are same");
      return res.redirect("back");
    } else if (newPassword == confPassword) {
      await user2.findByIdAndUpdate(id, { password: confPassword });
      req.logOut((err) => {
        if (err) {
          console.log(err);
          return false;
        }
        console.log("password changed succcessfully");
        return res.redirect("/login");
      });
    } else {
      console.log("new and confirm password does not match");
      return res.redirect("back");
    }
  } else {
    console.log("invalid old password");
    return res.redirect("back");
  }
};

const changePasswdWithOtp = async (req, res) => {
  let { id } = req.user;
  const User = await user2.findById(id);
  const { newPassword, confPassword } = req.body;

  if (newPassword == confPassword) {
    await user2.findByIdAndUpdate(id, { password: confPassword });
    req.logOut((err) => {
      if (err) {
        console.log(err);
        return false;
      }
      console.log("password changed succcessfully");
      return res.redirect("/login");
    });
  } else {
    console.log("new and confirm password does not match");
    return res.redirect("back");
  }
};

const create2 = async (req, res) => {
  try {
    const { name, password } = req.body;
    await user2.create({ name, password });
    console.log("data inserted..");
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const loginPage = async (req, res) => {
  return res.render("login");
};

const signin = async (req, res) => {
  await user2
    .find({})
    .then((data) => {
      return res.render("signin", { data });
    })
    .catch((err) => {
      console.log(err);
    });
};

const logout = (req, res) => {
  req.logOut((err) => {
    if (err) {
      console.log(err);
      return false;
    }
    console.log("logout Successfully");
    return res.redirect("/login");
  });
};

const data = async (req, res) => {
  await user2.find({}).then((data) => {
    return res.send(data);
  });
};

let otp = Math.floor(100000 + Math.random() * 900000);

const resetPassword = (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "trigonx1212@gmail.com",
      pass: process.env.APP_PASS,
    },
  });

  const mailerOptions = {
    from: "trigonx1212@gmail.com",
    to: req.body.email,
    subject: "Reset Password",
    html: `${otp}`,
  };

  transporter.sendMail(mailerOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });

  res.redirect("/verifyPage");
};

const verifyOtp = (req, res) => {
  if (req.body.otp == otp) {
    return res.redirect("/changeOtpPage");
  } else {
    res.redirect("back");
  }
};

const changeWithPage = (req, res) => {
  return res.render("changeWithOtp");
};

const verifyPage = (req, res) => {
  return res.render("verifyOtp");
};

const resetPage = (req, res) => {
  return res.render("otpPassword.ejs");
};

module.exports = {
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
  changePasswdPage,
  changePasswd,
  resetPage,
  resetPassword,
  verifyPage,
  verifyOtp,
  changeWithPage,
  changePasswdWithOtp
};
