const models = require('../models/index');
const jwt = require('jsonwebtoken');
const config  = require('../config/');
const helper = require('../helper/common');
const constants = config.constants;
const md5 = require('md5');
module.exports = {
    login:login,
    cartDetails:cartDetails
}

/**
 * Name:login
 * Desc: This function help to login and create token for each user.
 * Author: Ankit Tiwari
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function login(req,res,next){
    let respon_data = {};
    try{
        let result = await models.users.findAll({
            where:{
                email:req.body.email,
                password:md5(req.body.password),
                
            }
        });
        // no record found.
        if(!result.length){
            respon_data.error_code = constants.AUTH_FAIL;
            respon_data.error_msg = " User email and password is wrong";
            throw respon_data;
        }
        
        // if user exist then create token.
        const { id, email } = result[0]
        const token = jwt.sign({id,email},config.config.secret,{expiresIn: 84400})
      
       
        return helper.sendJson(res,config.constants.SUCCESS,true,{'token':token},'login sucesfully',false);
        
    }catch(error){
        return helper.sendJson(res,error.error_code,false,error,error.error_msg,true)
        
    }
}


/**
 * Name:cartDetails
 * Desc: This function help to get all details of cart of user.
 * Author: Ankit Tiwari
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function cartDetails(req,res,next){
    let respon_data = {};
    try{

        models.carts.belongsTo(models.products,{foreignKey: 'product_id'});

        let result = await models.carts.findAll({
            include: [{
              model: models.products,
              
             }],
             where:{
                user_id:req.user_id,
            }
          });
         
        // no record found.
        if(!result.length){
            respon_data.error_code = 200;
            respon_data.error_msg = " No product found in cart of this user";
            throw respon_data;
        }
        
      
       
        return helper.sendJson(res,config.constants.SUCCESS,true,result,'list of product in cart',false);
        
    }catch(error){
        return helper.sendJson(res,error.error_code,false,error,error.error_msg,true)
        
    }
}

