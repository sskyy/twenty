/**
 * Created by jiamiu on 14-6-11.
 */
var request = require('request'),
    _services = {},
    _ = require('lodash'),
    login_redirect_uri = "http://www.bianchengxia.com:1337/page/ordinary"




function registerService( name, opts ){

    _services[name] = _.defaults( opts, {
        getCode :function ( req){
            return req.query.code
        },
        getTokenRequestData : function( req ){
            var self = this
            return {
                uri : self.token_uri,
                method : "POST",
                headers :{
                    Accept: 'application/json'
                },
                form:{
                    client_id: self.client_id,
                    client_secret: self.secret,
                    redirect_uri: encodeURIComponent(opts.redirect_uri),
                    grant_type: "authorization_code",
                    code: self.getCode(req)
                }
            }
        },
        getUserInfoRequestData : function( tokenBody ){
            return {
                url : opts.user_info_uri,
                    headers : {
                    "Authorization": "Bearer "+tokenBody.access_token,
                    "Accept" : "application/json"
                }
            }
        },
        handlerOauthLogin : function( req, res, user){
            var self = this,snsId= name + user.id

            Oauth.findOne({snsId:snsId},function(err,oauthUser){
                if( oauthUser ){
                    console.log("user already logged in")

                    User.findOne(oauthUser.localId).then(function( localUser){
                        if( localUser ){
                            req.session.user = localUser
                            console.log("user already created local user")
                            res.redirect(login_redirect_uri)
                        }else{
                            res.send(404,"record error, local user not found")
                            //TODO deal with data mistake
                        }
                    }).catch(function(err){
                        res.send(500,"find user record error")
                    })

                }else{

                    var newUser = self.mapUserInfo( user )
                    newUser.lastLogin = new Date()
                    User.create(newUser).then(function(localUser){

                        user.snsId = snsId
                        user.localId = localUser.id
                        Oauth.create( user).then(function( oauthUser){
                            req.session.user = localUser
                            res.redirect(login_redirect_uri)
                        })

                    }).catch(function(err){
                        return res.send(500,"create local user failed")
                    })
                }
            })
        },
        parseTokenBody : function( tokenBody ){
            return (typeof tokenBody == 'object') ? tokenBody :JSON.parse( tokenBody )
        },
        parseInfobody : function( infoBody ){
            return (typeof infoBody == 'object') ? infoBody : JSON.parse(infoBody)
        }

    })
}

function authCallback(from, req, res){

    if( !from || !_services[from]) return false

    var service = _services[from]

    if( !service.getCode(req) ){
        return  res.send(401,"user not authorized.")
    }

    //get token
//    console.log( "trying to get access token", JSON.stringify(service.getTokenRequestData(req)))
    request(service.getTokenRequestData(req),function( err, response, tokenBody){
        if( err || response.statusCode !== 200 ){
            return res.send(401,{msg:"sending request for access token failed",err:err})
        }

        tokenBody = service.parseTokenBody( tokenBody )

        //get user info
//        console.log('tring to get user info', service.getUserInfoRequestData(tokenBody))
        request(service.getUserInfoRequestData(tokenBody),function( err, response, infoBody){
            if( err || response.statusCode !== 200 ){
//                console.log( err, infoBody)
                return res.send(401,{msg:"get user info failed",err:err})
            }

            var user= service.parseInfobody(infoBody)
            if( user.code ){
                return res.send(401,{msg:user.msg})
            }

            //handle login
            service.handlerOauthLogin( req, res, user )

        })

    })
}






//register Oauth services
registerService('douban',{
    client_id : "0be4d525ee8ea80523ae7f71cbabf80f",
    secret : "6121e4cc409c9b1c",
    token_uri :'https://www.douban.com/service/auth2/token',
    redirect_uri :"http://www.buxiache.com:1337/oauth/douban",
    user_info_uri :"https://api.douban.com/v2/user/~me",
    mapUserInfo : function( user ){
        var newUser = _.pick( user, 'name','avatar')
        newUser.sign = user.desc

        newUser.sns = {
            douban : user.alt
        }
        return newUser
    }
})

registerService('github',{
    client_id : "f7049e14d8bfb9384d7f",
    secret : "071cb1ec3b5507547b13fcd5cba65aa87d632037",
    token_uri :'https://github.com/login/oauth/access_token',
    redirect_uri :"http://www.bianchengxia.com:1337/oauth/github",
    user_info_uri :"https://api.github.com/user",
    mapUserInfo : function( user ){
        var newUser = {
            name : user["login"],
            avatar : user["avatar_url"]
        }
        newUser.sign = user["bio"]


        newUser.sns = {
            github : user["html_url"]
        }
        return newUser
    },
    getTokenRequestData : function( req ){
        var self = this
        return {
            uri : self.token_uri,
            method : "POST",
            headers : {
                "Accept" : "application/json"
            },
            form:{
                client_id: self.client_id,
                client_secret: self.secret,
                redirect_uri: self.redirect_uri,
                code: self.getCode(req)
            }
        }
    },
    getUserInfoRequestData : function( tokenBody ){
        var self = this
        return {
            url : self.user_info_uri,
            headers : {
                "Authorization": "token "+tokenBody.access_token,
                "Accept" : "application/json",
                "User-Agent" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36"
            }
        }
    }
})





//export
exports.services = function(){
    return _.mapValues( _services, function( service, name ){
        return _.partial( authCallback, name )
    })
}

