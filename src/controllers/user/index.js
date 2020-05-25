const service = require('../../services/user'),
    utils = require('../../utilities')
;

const controller = (function() {

    async function add(req, res) {
        try {
            await service.add(req.body);

            return res.status(200).send(utils.response.responseBuilder(
                200,
                'Errors',
                ['Successfully Added A User!']
            ));
        } catch (e) {
            return res.status(404).send(utils.response.responseBuilder(
                422,
                'Errors',
                {
                    error: [e]
                }
            ));
        }
    }

    async function login(req, res) {
        try {
            const token = await service.login(req.body);

            if (!token) {
                return res.status(404).send(utils.response.responseBuilder(
                    422,
                    'Errors',
                    {
                        error: ['Login Failed. Invalid email/password']
                    }
                ));
            }

            return res.status(404).send(utils.response.responseBuilder(
                422,
                "Here's your token",
                {
                    token
                }
            ));
        } catch (e) {
            return res.status(404).send(utils.response.responseBuilder(
                422,
                'Errors',
                {
                    error: e
                }
            ));
        }
    }

    async function get(req, res) {
        try {
            const data = await service.get();

            console.log(req.user);

            if (!data) {
                return res.status(404).send(utils.response.responseBuilder(
                    422,
                    'Errors',
                    {
                        error: ['Login Failed. Invalid email/password']
                    }
                ));
            }

            return res.status(404).send(utils.response.responseBuilder(
                422,
                "Here's your users",
                {
                    data
                }
            ));
        } catch (e) {
            return res.status(404).send(utils.response.responseBuilder(
                422,
                'Errors',
                {
                    error: e
                }
            ));
        }
    }

    return {
        add,
        login,
        get,
    }

})();

module.exports = controller;
