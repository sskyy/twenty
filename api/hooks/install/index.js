var installAddr = '/page/static/install'


function handleInstallRedirect( req, res, next){
  if( sails.config.cms.installed ){
    return req.path == installAddr ? res.redirect("/") : next()
  }else{
    User.find().then( function(users){
      if( users.length == 0){
        return req.path == installAddr ? next() : redirect(installAddr)
      }else{
        sails.config.cms.installed = true
        return req.path == installAddr ? res.redirect("/") : next()
      }
    })
  }
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
        "/page/static/login" : handleInstallRedirect,
        "/page/static/admin" : handleInstallRedirect,
        "/page/static/install" : handleInstallRedirect
      }

    }
  }
}