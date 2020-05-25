const utils = {
    responseBuilder: function(httpCode, responseMessage, data) {
        return {
            httpCode,
            responseMessage,
            data
        }
    }
};

module.exports = utils;
