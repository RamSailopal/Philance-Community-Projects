var express = require('express');
var router = express.Router({mergeParams: true});

const UserController = require('./users.controller');
const authMiddleware=require('../helpers/middlewares/authMiddleware')
const verify=authMiddleware.verifyJWT_MW
router.post("/", UserController.createProfile);
router.get("/notifications/:userId", UserController.getUserNotifications);
router.put("/1", UserController.updateProfile);
// This is called for getting the user details
router.get("/:userId", verify,UserController.getProfile);
router.get("/image/:userId/uploads/:filename", UserController.getUserImage);
// This is called for User Login
router.post("/login", UserController.login);
router.post("/passwordReset/create/:_userId", UserController.createPasswordResetToken);
router.post("/passwordReset/", UserController.passwordReset);
router.post("/search", UserController.search);
//router.post("/userUpdate/:_userId", checkAuth, UserController.userUpdate);

router.post("/passwordReset/:_userId", UserController.passwordReset);
// This is called for getting the user details
router.get("/:userId/projects", UserController.getProjects);
// This is called to update auth token using refreshtoken
router.get("/:userId/refresh", verify,UserController.refreshAuthToken);
router.get("/:userId/logout", verify,UserController.userLogout);
router.get("/:userId/settings", UserController.getUserSettings);
router.put("/:userId/settings", UserController.updateUserSettings);

module.exports = router;
