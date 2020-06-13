'use strict';
module.exports = (sequelize, DataTypes) => {
  var carts = sequelize.define('carts', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id:{
      type:DataTypes.INTEGER,
      allowNull: false,

    },
    user_id:{
      type:DataTypes.INTEGER,
      allowNull: false,

    },
    price:{
      type: DataTypes.FLOAT,
      allowNull: false,
      
    },
    iteamCount:{
      type: DataTypes.INTEGER(2),
      allowNull: false,
      
    },
    status:{
      type:DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  carts.associate = function(models) {
    // associations can be defined here
  };


  return carts;
};