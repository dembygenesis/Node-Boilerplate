const database = require('../database');
const utils = require('../../utilities');

const service = (function() {
    async function get() {
        return await database.query('SELECT * FROM user');
    }

    function getOne() {

    }

    async function add(data) {
        try {
            const {
                firstname,
                lastname,
                email,
                mobile_number: mobileNumber,
                password,
                user_type_id: userTypeId,
                created_by: createdBy,
            } = data;

            const hashedPassword = await utils.auth.getHashed(password);

            const result = await database.query('CALL user_create(?, ?, ?, ?, ?, ?, ?)', [
                firstname,
                lastname,
                email,
                mobileNumber,
                hashedPassword,
                userTypeId,
                createdBy,
            ]);

            return true;
        } catch (e) {
            throw e;
        }
    }

    function update() {

    }

    function deleteOne() {
        
    }

    async function login(data) {
        try {
            const {email, password} = data;
            const user = await database.query('CALL user_get_by_email(?)', [email]);

            const hashedPassword = user[0]['password'];
            const userId = user[0]['id'];

            const passwordValid = await utils.auth.compareHashed(password, hashedPassword);

            let token = false;

            if (passwordValid) {
                token = utils.auth.getJWT(userId, process.env.SECRET)
            }

            return token;
        } catch (e) {
            throw e;
        }
    }

    async function getById(id) {
        try {
            const data = await database.query('CALL user_get_by_id(?)', [id]);

            return data;
        } catch (e) {
            throw e;
        }
    }

    async function getByEmail(email) {
        try {
            const data = await database.query('CALL user_get_by_email(?)', [email]);

            return data;
        } catch (e) {
            throw e;
        }
    }

    async function getByEmailAndPassword(email, password) {

    }

    return {
        login,
        get,
        getById,
        getByEmailAndPassword,
        getByEmail,
        getOne,
        add,
        update,
        deleteOne,
    }
})();

module.exports = service;
