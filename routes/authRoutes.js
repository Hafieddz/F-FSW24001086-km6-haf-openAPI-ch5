const router = require('express').Router();
const authController = require('../controllers/authController');
const authorization = require('../middleware/authorization')

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);
router.route('/admin/register').post(authorization, authController.registerAdmin);

module.exports = router