const express        = require('express'),
    router           = express.Router(),
    middleware       = require('../../middlewares/user'),
    passportService  = require('../../services/passport'),
    passport         = require('passport'),
    controller       = require('../../controllers/user')
;

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignIn = passport.authenticate('local', {session: false});

router.post('/', middleware.getCreateUserValidations(), controller.add);
router.post('/login', requireSignIn, controller.login);
router.get('/', requireAuth, controller.get);

module.exports = router;
