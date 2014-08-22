var installAddr = '/page/static/install'


function isAssets( path ){
  return /\.(js|css|jpg|png|ico|gif)$/.test(path)
}

module.exports = function(sails){
  return {
    routes : {
      before : {
        "/" : function(req, res, next){
          if( !sails.config.cms.installed ){
            User.find().then( function(users){
              if( users.length == 0){
                return res.redirect(installAddr)
              }else{
                sails.config.cms.installed = true
                next()
              }
            })
          }else{
            next()
          }
        },
        "/page/static/install" : function( req, res, next){
          if( sails.config.cms.installed ){
            res.redirect("/")
          }else{
            User.find().then( function(users){
              if( users.length == 0){
                return next()
              }else{
                sails.config.cms.installed = true
                res.redirect("/")
              }
            })
          }
        }
      }

    }
  }
}