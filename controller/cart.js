const sequlize = require('sequelize');
const models = require('../models/index');
const config  = require('../config/');
const helper = require('../helper/common');
const constants = config.constants;
module.exports = {
    addProductInCart:addProductInCart
}

/**
 * name: signUpSeller
 * Desc: This funciton help to create seller.
 * Auther: Ankit Tiwari.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function addProductInCart(req,res,next){

    const { SUCCESS } = config.constants;
    // define a function for insert seller in db.
    try{
        // get user id from requst
        const {user_id,body} = req;
        const { product_id } = body;

        // get price of products.
        let { price } = await getProductDetails(product_id)
 
        req.body.user_id = user_id;
        req.body.price = price;

        // build all request data with field
        const cart = models.carts.build(req.body);
        
        // cart value save into database. 
        let result = await cart.save();
        // if data saved in cart tabel.
        if(!result.id){
            throw "product not add in cart";
        }
        return helper.sendJson(res,SUCCESS,true,"added data",'product added in cart sucesfully',false);
        
    }catch(error){
        const { SERVER_ERROR, VALIDATION_ERROR } = config.constants
        let err_code = SERVER_ERROR;
        let error_msg = 'server error';
        if(typeof error.errors['0'].type != 'undefined' &&  error.errors['0'].type == 'Validation error')
        {
            err_code =VALIDATION_ERROR;
            error_msg = 'Validation error';
        }
        return helper.sendJson(res,err_code,false,error,error_msg,true)
    }
    
}

/**
 * Name: getProductDetails
 * Description: This function get all product details.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function getProductDetails(product_id){

    try{
        let result = await models.products.findAll({
            where:{
                id:product_id
            },
            attributes:['id','name','price']
        });
        return result[0];

        
    }catch(error){
        throw error;
    }
}