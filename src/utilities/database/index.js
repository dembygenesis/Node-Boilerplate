const database = require('../../services/database');

const utils = {
    hasEntry: async function(value, table, column, customErrorMessage) {
        const sql = `
            SELECT 
                COUNT(*) AS "count"
            FROM \`${table}\`
            WHERE 1 = 1
                AND \`${column}\` = '${value}'
        `;

        const result = await database.query(sql);
        const count = parseFloat(result[0]['count']);

        if (count === 0) {
            let errorMessage = "Entry does not exist";

            if (customErrorMessage) {
                errorMessage = customErrorMessage;
            }

            throw errorMessage;
        }

        return true;
    },
    hasNoEntry: async function(value, table, column, customErrorMessage) {
        const sql = `
            SELECT 
                COUNT(*) AS "count"
            FROM \`${table}\`
            WHERE 1 = 1
                AND \`${column}\` = '${value}'
        `;

        const result = await database.query(sql);
        const count = parseFloat(result[0]['count']);

        if (count !== 0) {
            let errorMessage = "Entry already exists";

            if (customErrorMessage) {
                errorMessage = customErrorMessage;
            }

            throw errorMessage;
        }

        return true;
    },
};

module.exports = utils;
