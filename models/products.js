'use strict';
const md5 = require('md5');
module.exports = (sequelize, DataTypes) => {
  var products = sequelize.define('products', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name:{
      type:DataTypes.STRING(80),
      allowNull: true,
      validate:{
        is:{args:["^[a-zA-Z]+$",'i'],msg:"name should be only alphabet"},
   
      }
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: true,
      validate:{
        notEmpty:{ args:[true],msg:"description should not empty string"},  
      }
    },
    price:{
      type: DataTypes.FLOAT,
      
    },
    status:{
      type:DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  products.associate = function(models) {
    // associations can be defined here
  };
  return products;
};