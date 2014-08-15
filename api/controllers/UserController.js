/**
 * UserController
 *
 * @module      :: Controller
 * @description    :: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
module.exports = {
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {},
  connect: function (req, res) {
    if (req.session.user && req.session.user.id) {

      //force to reload user data
      var where = {
        where : {
          id : req.session.user.id
        },
        field :{name:1,email:1,avatar:1}
      }

      User.findOne( where ).then(function( user){
        req.session.user = user
        return res.json( req.session.user )

      }).fail(_.partialRight(ErrorRespondService.handle,res))

    }else{
      return res.json(404,{msg:"you are not logged in"})
    }
  },
  me : function( req, res ){
//    if (req.session.user && req.session.user.id) {
//
//      //load full user data
//      User.findOne(req.session.user.id).then(function( user){
//        return res.json( user )
//      }).fail(_.partialRight(ErrorRespondService.handle,res))
//
//    }else{
//      return res.json(404,{msg:"you are not logged in"})
//    }

    User.find().limit(1).then(function(users){
      return res.json(users[0])
    })
  },
  login: function (req, res) {
    var time1 = (new Date).getTime()
    if (req.session.user && req.session.user.id) {
      return res.send(200, req.session.user)
    }

    var email = req.param('email'),
      password = req.param('password')

    if (!email || !password) {
      return res.send(406)
    } else {
      var where = {
        where: {email: email, password: EncryptService.encrypt(password)},
        field :{name:1,email:1,avatar:1}
      }

      //Notice! User record may contains large data,
      // It's very necessary to specify field to retrieve
      User.findOne(where).then(function ( user) {
        var time2 = (new Date).getTime()
        sails.log("[FIND USER TIME]:",time2 - time1)
        if (!user) {
          throw [404, {msg: 'user not found'}]
        }

        req.session.user = user
        user.lastLogin = new Date()


        User.update({id:user.id},{lastLogin: new Date()}).then(function(){
          var time3 = (new Date).getTime()
          sails.log("[UPDATE USER TIME]:",time3 - time2)
          sails.log("[USER LOGIN]:",user.name)
          return res.send(200, _.pick(user, "id", "name", "email"))
        })

      }).fail(_.partialRight(ErrorRespondService.handle,res))
    }
  },
  register: function (req, res) {
    var userParam = {},
      validated = ParamService.pick(['name','password','email'],userParam,req)

    if (!validated) {
      return res.send(406, {msg: "information not enough"})
    }

    User.find({or:[{name: userParam.name},{email:userParam.email}]}).then(function ( users) {
      if (users.length == 0) {

        User.create(userParam).then(function (user) {
          req.session.user = user
          res.send(200, _.pick(user, "id", "name", "email"))
        })
      } else {
        throw [409, {msg: "username or email already exist"}]
      }
    }).fail(_.partialRight(ErrorRespondService.handle,res))
  },
  checkname: function (req, res) {
    var name = req.param('name')
    if( !name ){
      return res.send(500,{msg:'email can not be undefined'})
    }

    User.findOne({name: name}).then(function (user) {
      if( !user ){ throw [404, {msg: 'name not found'}]}

      return res.send(200)

    }).fail(_.partialRight(ErrorRespondService.handle,res))
  },
  checkemail: function (req, res) {
    var email = req.param('email')

    if (!email){
      return res.send(500,{msg:'email can not be undefined'})
    }

    User.findOne({email: email}).then( function (err, user) {
      if( !user ){ throw [404, {msg: 'email not found'}]}

      return res.send(200)

    }).fail(_.partialRight(ErrorRespondService.handle,res))
  },
  logout: function (req, res) {
    if (!req.session.user || !req.session.user.id) {
      res.redirect('/')
    } else {
      var name = req.session.user.name
      req.session.user = null
      console.log("[USER LOGOUT]:", name )

      res.redirect('/')
    }
  }
};
