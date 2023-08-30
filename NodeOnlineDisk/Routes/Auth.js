const ex = require('express');
const AuthController = require('../Controllers/AuthController');
const AuthMiddleware = require('../Middlewares/AuthMiddleware');
const auth = ex.Router();

////////////// Middleware //////////////

auth.use('/register/member', AuthMiddleware.UsernameIsExist);
auth.use('/SendEmailVerification/:username', AuthMiddleware.GetUserEmail);
auth.use('/login', AuthMiddleware.IsUsernameOrEmail);


////////////// Api //////////////

auth.post('/register/member', AuthController.register);
auth.get('/userIsExist/:username', AuthController.UserIsExist);
auth.get('/SendEmailVerification/:username', AuthController.SendEmailVerification);
auth.get('/EmailVerification/:username', AuthController.EmailVerification);
auth.get('/isAuth', AuthController.IsAuth);
auth.post('/login', AuthController.login);
auth.get('/emailIsExist/:email', AuthController.emailIsExist);
auth.get('/logout', AuthController.LogOut);

module.exports = auth;