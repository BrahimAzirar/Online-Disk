const ex = require('express');
const AuthController = require('../Controllers/AuthController');
const AuthMiddleware = require('../Middlewares/AuthMiddleware');
const auth = ex.Router();

////////////// Middleware //////////////

auth.use('/register/member', AuthMiddleware.UsernameIsExist);
auth.use('/SendEmailVerification/:username', AuthMiddleware.GetUserEmail);


////////////// Api //////////////

auth.post('/register/member', AuthController.register);
auth.get('/userIsExist/:username', AuthController.UserIsExist);
auth.get('/SendEmailVerification/:username', AuthController.SendEmailVerification);

module.exports = auth;