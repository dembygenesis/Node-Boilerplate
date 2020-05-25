/**
 * We split utilities on whether they involve strings, arrays, database, etc...
 */
const authUtil    = require('./auth');
const databaseUtil  = require('./database');
const responseUtil  = require('./response');

module.exports = {
    auth: {...authUtil},
    database: {...databaseUtil},
    response: {...responseUtil},
};




