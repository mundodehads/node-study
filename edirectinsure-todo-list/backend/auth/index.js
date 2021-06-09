const { Router } = require('express');
const authController = require('./controllers/auth');
const loginController = require('./controllers/login');

const router = Router();

router.post('/', authController);
router.post('/login', loginController);

module.exports = router;
