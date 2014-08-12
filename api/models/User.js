/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

  },
  beforeCreate: function(values, next) {
    //allow empty password for users logged in with openid
    if( values.password ){
      values.password = EncryptService.encrypt(values.password)
    }
    next()
  }
};

