const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const UserModel = require("../models/user.js");
const jwtStrategy = require("passport-jwt").Strategy;

const { secret } = require("../config/jwtSecret.js");

passport.use(new jwtStrategy({
  jwtFromRequest: req => req.cookies.jwt,
  secretOrKey: secret,
}, async (token, done) =>  {
  const user = await UserModel.findOne({ "email": token.user });
  if (!user){
    return done(null, false, { message: "User not found", success: false, code: 404 });
  }
  console.log(user);
  const safePayload = { "createdAt": user.createdAt, "email": user.email, "_id": user._id, "name": user.name }
  return done(null, user, { message: "Logged in successfully", success: true, code: 200 });
}))

passport.use("register", new localStrategy({
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
}, async (req, email, password, done) => {
  try {
    const user = await UserModel.create({ email, password, name: req.body.name });
    return done(null, user);
  }
  catch (e) {
    console.log(e);
    done(e)
  }
}));

passport.use("login", new localStrategy({
  usernameField: "email",
  passwordField: "password"
}, async (email, password, done) => {

  try {
    const user = await UserModel.findOne({ email }).select("createdAt email password name isAdmin");
    console.log("USER");
    console.log(user);
    if (!user){
      return done(null, false, { message: "User not found", success: false, code: 404 });
    }
    const validate = await user.isValidPassword(password);
    if (!validate){
      return done(null, false, { message: "Wrong Password", success: false, code: 401 });
    }
    const safePayload = { "createdAt": user.createdAt, "email": user.email, "_id": user._id, "name": user.name, "isAdmin": user.isAdmin }
    console.log("SAFE")
    console.log(safePayload);
    return done(null, safePayload, { message: "Logged in successfully", success: true, code: 200 });
  }
  catch (e) {
    console.log("ERROR");
    console.log(e);
    return done(e);
   }
}));

passport.use("isAdmin", new jwtStrategy({
  jwtFromRequest: req => req.cookies.jwt,
  secretOrKey: secret,
}, async (token, done) =>  {
  const user = await UserModel.findOne({ "email": token.user });
  if (!user){
    return done(null, false, { success: false, code: 404 });
  }
  else {
    if (user.isAdmin){
      return done(null, user, { success: true, code: 200 });
    }
    else {
      return done(null, false, { success: false, code: 401 });
    }
  }
}));
