const models = require('../models/index');
const config  = require('../config/');
const helper = require('../helper/common');
const constants = config.constants;
module.exports = {
    productList:productList,
}


/**
 * Name: productList
 * Description: This function get all list of products.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function productList(req,res,next){

    try{
        // get all details of products
        let result = await models.products.findAll();

        return helper.sendJson(res,config.constants.SUCCESS,true,result,'Get all products',false);

        
    }catch(error){
        return helper.sendJson(res,constants.SERVER_ERROR,false,error,'record could not be find',true)
        
    }
}
