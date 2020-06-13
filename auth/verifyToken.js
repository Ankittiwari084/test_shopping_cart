var jwt = require('jsonwebtoken');
var config = require('../config/');

module.exports = {
    verifyToken:verifyToken,
    isValid:isValid
}


function verifyToken(req,res,next){
    //openApi not check header

      
        var token = req.headers['x-access-token'];

        if(!token){

            return res.status(403).send({ auth: false, message: 'No token provided.' });
       
        } 
        jwt.verify(token,config.config.secret,function(err,decoded){
            
            if(err){
                return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            }

            req.user_id = decoded.id;
           // next();

        })

    next();
}

function isValid(req,res,next){
    
    if(req.userId){
        return res.status(200).send({ auth: true, message: 'valid token.' });
        
    }
}
