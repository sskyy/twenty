/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var _ = require('lodash'),
  view = sails.config.cms.view.default,
  fs = require('fs'),
  path = require('path')

var pageHook = function( req ){
  sails.emit("hook:page:render",req)
}

var exports = {
	//render page
  page : function( req, res){
    var page = req.param('page') || 'index',
      file = view + '/'+page

      res.view(file,{user:req.session.user||{}})
  },
  //render a single node
  node : function(req, res){
    var model = req.param('model'),
      modelIns =  global[UtilService.upperCapital(model)],
      id = req.param('id'),
      file = view + '/' + model

      modelIns.findOne( id).then(function( record ){
        if( !record ){
          res.notFound()
        }else{
          res.view(file, _.zipObject([model,'user'],[record,req.session.user||{}]))
        }
      }).fail(function(err){
        sails.error(err)
        res.serverError()
      })
  },
  //render a node list
  nodes : function(req, res){
    var model = req.param('model'),
      modelIns =  global[UtilService.upperCapital(model)],
      limit = req.param('limit') || sails.config.cms.model.limit,
      offset = req.param('offset') || 0,
      sort=req.param('sort') || {createdAt:"desc"},
      file = view + '/' + model+ sails.config.cms.model.listSuffix

    modelIns.find().skip(offset).limit(limit).sort(sort).then(function( records){

      res.view(file, _.zipObject([model,'user'],[records,req.session.user||{}]))

    }).fail(function(err){
      sails.error(err)
      res.serverError()
    })
  }
};

//module.exports = _.map( exports, function( func ){
//  //add hooks here, actually you may use hook to do the same thing
//  return UtilService.naiveDecorate( pageHook, func  )
//})
module.exports = exports
