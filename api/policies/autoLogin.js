/**
 * Created by jiamiu on 14-6-19.
 */
var _ = require('lodash')

module.exports = function( req, res, next){
    if( !req.session.user ){
        User.find().limit(1).then(function(users){
          req.session.user = users[0]
          next()
        }).fail(function(err){
          console.log( err)
        })
    }else{
        console.log("already logged in")
        next()
    }

}