const ex = require('express');
const AuthController = require("../Controllers/AuthController");
const auth = require("../Middlewares/AuthMidd");
const router = ex.Router();

router.use('/Signup', auth.CheckUsername);

router.post('/Signup', AuthController.SignUpAuth);

module.exports = router;