const sequelize = require('sequelize');
const models = require('../models/index');
module.exports = {
    sendJson:sendJson,
}
/**
 * Name:sendJson
 * Description: this is create json response and send to client.
 * Auther:Ankit Tiwari
 */
function sendJson(res,statusCode,statusFlage,data,message,error = false){
    return res.status(statusCode)
        .json({
            data: data,
            error:error,
            message:message,
            statusCode: statusFlage
            
        });
}