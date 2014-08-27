module.exports = function (sails) {
  var q = require('q')
  var nodes = {},
    indexes = {},
    nodeIndexMap = {},
    allIndex = []

  function generateBeforeCreateCallback(indexName) {
    return function (val, cb) {
      sails.log( "before create")

      if (!val[indexName]) return cb()

      //TODO: validation
//      if( indexes[indexName].config.limit ){}

      var indexIns = UtilService.getModelInstance(indexName)

      return cb( q.allSettled( val[indexName].map(function (index, key) {

        //may need to build index
        if (!index.id) {
          //same name check
          return indexIns.findOne({name: index.name}).then(function (i) {
            if (i) {
              //to support query from browser.
              //when using `category.id=2` from browser, waterline look for key name of 'category.id' to match query
              val[indexName+'.id'] = i.id
              val[indexName][key] = _.pick(i, ['id', 'name'])
              return val
            } else {
              return indexIns.create(index).then(function (savedIndex) {
                //TODO provide config options to decide which field should be cached

                //to support query from browser.
                //when using `category.id=2` from browser, waterline look for key name of 'category.id' to match query
                val[indexName+'.id'] = savedIndex.id
                val[indexName][key] = _.pick(savedIndex, ['id', 'name'])
                return val
              })
            }
          })
        }else{
          val[indexName][key] = _.pick(index, ['id', 'name'])

          //to support query from browser.
          //when using `category.id=2` from browser, waterline look for key name of 'category.id' to match query
          val[indexName+'.id'] = index.id
          return val
        }
      }).filter(q.isPromise)))
    }
  }

  function generateAfterCreateCallback(indexName, type) {
    return function (val, cb) {
      sails.log( "after create")

      if (!val[indexName]) return cb()

      var indexIns = UtilService.getModelInstance(indexName)

      return cb (q.allSettled( val[indexName].map(function (index, key) {
        //need to push nodes
        return indexIns.findOne( index.id).then(function( index){
          var nodes = index.nodes
          if( !nodes[type] ) nodes[type] = {}

          //TODO we need to improve this, because the 'nodes' field may grow very big
          nodes[type][val.id] = _.pick(val,['id','title'])

          return indexIns.update(index.id, {nodes: nodes})
        })

      }).filter(q.isPromise)))
    }
  }

  function generateBeforeUpdateCallback(indexName,type) {
    return function (val, cb) {
      sails.log( "before update")

      if (!val[indexName]) return cb()

      //TODO: validation
//      if( indexes[indexName].config.limit ){}

      var indexIns = UtilService.getModelInstance(indexName)

      return cb( q.allSettled( val[indexName].map(function (index, key) {

        //may need to build index
        if (!index.id) {
          //same name check
          return indexIns.findOne({name: index.name}).then(function (i) {
            if (i) {

              //to support query from browser.
              //when using `category.id=2` from browser, waterline look for key name of 'category.id' to match query
              //TODO : this do not support multiple index
              val[indexName+'.id'] = i.id
              val[indexName][key] = _.pick(i, ['id', 'name'])

              var nodes = i.nodes
              if( !nodes[type] ) nodes[type] = {}

              //TODO we need to improve this, because the 'nodes' field may grow very big
              nodes[type][val.id] = _.pick(val,['id','title'])

              return indexIns.update(i.id, {nodes: nodes})

            } else {

              index.nodes = {}
              index.nodes[type] = {}
              index.nodes[type][val.id] = _.pick(val,['id','title'])

              return indexIns.create(index).then(function (savedIndex) {
                //TODO provide config options to decide which field should be cached

                //to support query from browser.
                //when using `category.id=2` from browser, waterline look for key name of 'category.id' to match query
                val[indexName+'.id'] = savedIndex.id
                val[indexName][key] = _.pick(savedIndex, ['id', 'name'])

                return val
              })
            }
          }).fail(function(err){
            console.log( err)
          })
        }else{
          val[indexName][key] = _.pick(index, ['id', 'name'])

          //to support query from browser.
          //when using `category.id=2` from browser, waterline look for key name of 'category.id' to match query
          val[indexName+'.id'] = index.id
          return val
        }
      }).filter(q.isPromise) ) )
    }
  }

  function setHooks(type, indexName) {
    sails.on('hook:' + type + ':beforeCreate', generateBeforeCreateCallback(indexName))
    sails.on('hook:' + type + ':afterCreate', generateAfterCreateCallback(indexName,type))
    sails.on('hook:' + type + ':beforeUpdate', generateBeforeUpdateCallback(indexName,type))
  }

  return {
    configure: function () {
      _.forEach(sails.models, function (model, name) {
        if (model.isNode) {
          nodes[name] = model
        } else if (model.isIndex) {
          indexes[name] = model
          indexes[name].config = (sails.config.cms.index && sails.config.cms.index[name]) ? sails.config.cms.index[name] : {}
        }
      })

      _.forEach(indexes, function (index, name) {
        if (index.config.nodeTypes) {
          index.config.nodeTypes.forEach(function (type) {
            nodeIndexMap[type] = nodeIndexMap[type] ? nodeIndexMap[type].concat(name) : [name]
          })
        } else {
          allIndex.push(name)
        }
      })

      _.forEach(nodeIndexMap, function (indexNames, type) {
        indexNames.forEach(function (indexName) {
          setHooks(type, indexName)
        })
        nodeIndexMap.all.forEach(function (indexName) {
          setHooks(type, indexName)
        })
      })

      if (allIndex.length) {
        allIndex.forEach(function (indexName) {
          _.forEach(nodes, function (node, type) {
            setHooks(type, indexName)
          })
        })
      }

    }
  }


}