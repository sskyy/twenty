/**
 * Created by jiamiu on 14-8-10.
 */

var Repo = require('git').Repo,
  Git = require('git').Git,
  fs = require('fs'),
  fsExtra  = require('fs-extra'),
  async = require('async'),
  _  = require('lodash'),
  path = require('path'),
  tosource = require('tosource'),
  bundlePath = './bundle',
  args = process.argv.splice(2),
  repo,
  mergePaths = ['config','api']


//node ./zoro.js bundle install
if( args[0] == 'bundle' && args[1] == 'install' ){

  new Repo('./',function(err, r){
    if( err ){
      console.log("begin to init repo")
      initZoroRepo( installBundle )
    }else{
      console.log("begin to save curent status")
      repo = r
      saveCurrentStatus( installBundle)
    }
  })

}

//TODO node ./zoro.js bundle uninstall [bundle_name]




//functions
function initZoroRepo( cb ){
  createRepo( function(err, r){
    if( err ){
      return console.log("create repo err", err)
    }
    repo = r
    addGitIgnore( function(){
      saveCurrentStatus( cb )
    })
  })
}

function installBundle(){
  var parallelTasks=[]

  var bundles = fs.readdirSync( bundlePath).filter(function(b){return !/^\./.test(b)})
  _.each( bundles, function( bundle ){
    findFile( path.join(bundlePath, bundle), function(err, files){
      console.log("begin to install bundle ", bundle)
      files.forEach(function( bundleFilePath ){
        //the file path is the same as the initial sails app
        var filePath =path.relative( path.join( bundlePath,bundle) , bundleFilePath )

        if( !fs.existsSync( filePath ) ){
          parallelTasks.push(_.partial(fsExtra.copy,path.join( bundlePath,bundle,filePath) , filePath ))
        }else{
          if( _.any(mergePaths, function(p){ return (new RegExp('^'+p)).test(filePath)})){
            var originContent = require( './'+filePath),
              bundleContent = require( './'+ path.join( bundlePath,bundle,filePath) )

            for( var i in bundleContent ){
              if(originContent[i]){
                console.log( "module conflict detected, we will not modify origin: ",filePath)
              }else{
                originContent[i] = bundleContent[i]
                parallelTasks.push(_.partial( fs.writeFile,filePath, "module.exports = "+ tosource(originContent)))
              }
            }
          }else{
            console.log( "file conflict detected, we will not modify origin: ",filePath)
          }
        }
      })

      async.parallel(parallelTasks,function(err){
        console.log("bundle file installed, begin to save",err)
        saveCurrentStatus( function(){
          tagHead(bundles.join('-'),function(err,res){
            console.log("tag", err, res)
            console.log("install bundle finished")
          })
        })
      })
    })
  })

}

function findFile( dir, done ){
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          findFile(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
}

function saveCurrentStatus( cb ){
  //call status failed
  repo.git.git('add',{},'--all',function(err, res){
    repo.git.git('commit',{},'-m', 'auto commit',function(err,res){
      console.log("commit:",err,res)
      cb()
    })
  })
}

function createRepo( cb ){
  var git = new Git('./.git')
  git.git('init',{},function(err, res){
    console.log( "init err", err,res)
    new Repo('./',cb)
  })
}

function addGitIgnore( cb ){
  var content = [
    "config/local.js",
    "node_modules",
    "bower_components",
    ".tmp",
    "dump.rdb",
    "lib-cov",
    "*.seed",
    "*.log",
    "*.out",
    "*.pid",
    "npm-debug.log",
    "*~",
    "*#",
    ".DS_STORE",
    ".netbeans",
    "nbproject",
    ".idea",
    ".node_history",
    ".editorconfig",
    "bundle"].join("\n")

  fs.writeFile('./.gitignore', content, cb )
}

function tagHead( tag, cb ){
  console.log( "begin to tag HEAD", tag)
  repo.git.git('tag',{},tag,'HEAD',function(err,res){
    console.log( err, res)
    cb()
  })
}
