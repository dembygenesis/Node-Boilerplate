const expressValidator = require('express-validator');
const utils = require('../../utilities');
const service = require('../../services/user');
const validationResult = expressValidator.validationResult;

const middleware = (function () {

    const check = expressValidator.check;

    /**
     * Login Validation
     */

    function getLoginValidations() {
        const validations =  [
            check('email').notEmpty()
                .isEmail()
                .withMessage('Field should be a valid email')
                .bail()
                .custom(async value =>
                    await utils.database.hasEntry(value, 'user', 'email', 'Email does not exist')
                ),
            check('password').notEmpty(),
        ];

        return async function(req, res, next) {
            await Promise.all(validations.map(validation => validation.run(req)));

            const errors = validationResult(req);

            if (errors.isEmpty()) {
                return next();
            }

            return res.status(200).send(utils.response.responseBuilder(
                200,
                'Something went wrong when trying to login',
                errors
            ));
        };
    }

    /**
     * Create User Validation
     */

    function getCreateUserValidations() {
        const validations =  [
            check('firstname').notEmpty(),
            check('lastname').notEmpty(),
            check('email').notEmpty()
                .isEmail()
                .withMessage('Field should be a valid email')
                .bail()
                .custom(async value =>
                    await utils.database.hasNoEntry(value, 'user', 'email', 'Email already exists')
                ),
            check('mobile_number').notEmpty(),
            check('password').notEmpty(),
            check('created_by')
                .notEmpty()
                .bail()
                .custom(async value =>
                    await utils.database.hasEntry(value, 'user', 'id', 'User does not exist')
                ),
            check('user_type_id')
                .notEmpty()
                .bail()
                .custom(async value =>
                    await utils.database.hasEntry(value, 'user_type', 'id', 'User Type does not exist')
                ),
        ];

        return async function(req, res, next) {
            await Promise.all(validations.map(validation => validation.run(req)));

            const errors = validationResult(req);

            if (errors.isEmpty()) {
                return next();
            }

            return res.status(200).send(utils.response.responseBuilder(
                200,
                'Something went wrong when trying to add a new user',
                errors
            ));
        };
    }

    return {
        getCreateUserValidations,
        getLoginValidations,
    }

})();

module.exports = middleware;
