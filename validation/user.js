const commonHelper = require('../helper/common');



module.exports = {
    loginValidation: loginValidation
}

function loginValidation(req,res,next){
    return new Promise(function(resolve,reject){
        req.checkBody('email','Email is missing').notEmpty();
        req.checkBody('password','Password is missing').notEmpty();
        
        // check validation.
        req.getValidationResult().then(function(result){
            if(!result.isEmpty()){
                commonHelper.sendJson(res,401,401,result.array(),'Validation Error',true);
            }
            next()
        }).catch(function(error){
            commonHelper.sendJson(res,500,500,error,'Validation Error',true);
        });
            
       
    })
}
