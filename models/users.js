'use strict';
const md5 = require('md5');
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    mobile_no:{
      type:DataTypes.STRING(11),
      validate:{
        is:{args:["^[0-9]+$",'i'],msg:"mobile_no should be only number"},
      }
    },
    email:{
      type:DataTypes.STRING(100),
      allowNull: false,
      validate:{
        isEmail:{ args:[true],msg:"emial formate wrong" },
        isUnique: function (email, done) {
          users.find({ where: { email: email}}).done(function(err,user){
            if (err) {
              done('code already registered');
            }
            done();
          })
        }
      }
    },
    password:{
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{ args:[true],msg:"password should not empty string"},  
      }
    },
    status:{
      type:DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };

  // declare hook.
  users.beforeCreate((user,options)=>{
    user.password  = md5(user.password)
  })
  return users;
};