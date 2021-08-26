var express = require('express');
var router = express.Router();
let controller = require('../controllers/login');
let auth = require('../lib/auth');

//criando minhas rotas
router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.post('/logout', auth.jwtVerify ,controller.logout);

module.exports = router;