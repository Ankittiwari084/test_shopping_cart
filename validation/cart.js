const commonHelper = require('../helper/common');



module.exports = {
    validation: validation
}

function validation(req,res,next){
    return new Promise(function(resolve,reject){
        req.checkBody('product_id','Product id is missing').notEmpty();
        req.checkBody('iteamCount','Iteam Count is missing').notEmpty();
        
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
