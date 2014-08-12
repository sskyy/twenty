/**
 * Created by jiamiu on 14-6-12.
 */
module.exports = function( req, res, next){
    //force to use user session id to prevent fake request
  console.log( req.session.user.id)
    req.body['uid']= req.session.user.id
    next()
}