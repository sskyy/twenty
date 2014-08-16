/**
 * Created by jiamiu on 14-8-9.
 */

angular.module('util',['ngResource'])
  .filter('time',function(){
    return function( input,format){
      return moment(input).format( format || 'MM-DD hh:mm:ss')
    }
  })
  .filter('countChildren',function(){
    function count( input ){
      var num = 0
      _.forEach( input, function( child ){
        if(_.isObject( child ) ){
          num += count( child)
        }else{
          num++
        }
      })
      return num
    }

    return count
  })
  .factory('crud',function( $resource,$http,pagination ){

    function append( arr1, arr2 ){
      arr2.forEach(function(i){
        arr1.push(i)
      })
    }

    function replace( arr1, arr2 ){
      arr1.splice(0)
      append( arr1, arr2)
    }
    /**
     * @param options object. keys:{
     *  resource : object,
     *  removeCallback : function,
     *  edit : function
     * }
     */
    return function( options ){
      options = _.defaults(options,{
        limit:10,
        sort : 'id DESC',
        withPage : true
      })

      var crud = _.defaults( options, {
        Resource :  $resource( '/'+options.type+'/:id',{limit:options.limit,sort:options.sort,id:'@id'}),
        page : 0,
        records : [],
        total : null,
        pagination : null,
        query : function(){
          crud.records =  crud.Resource.query({skip:crud.page*crud.limit})
          return crud.records
        },
        edit : function(){
          console.log("you need to implement crud function")
        },
        remove : function( r, $index){
          crud.Resource.remove({id:r.id}).$promise.then(function(){
            crud.records.splice($index,1)
          })
        },
        create : function( item ){
          $http.post('/'+options.type,item).success(function( saved ){
            //this way is faster then re query
            crud.records.unshift( saved )
          }).error(function(err){
            console.log(err)
          })
        },
        next:function( append ){
          page++
          crud.Resource.query({skip:crud.page*crud.limit}).then(function(data){
            append ? append( crud.records, data ) : replace(crud,records, data)
          })
        },
        count : function( cb ){
          $http({method:'get',url:'/'+options.type+'/count'}).success(function(data){
            crud.total = data.count
            if( cb ) cb(crud.total)
          })
        },
        prev : function(){
          console.log("TODO")
        },
        goto : function( page ){
          crud.page = page
          crud.Resource.query({skip:page*crud.limit}).$promise.then(function(data){
            replace(crud.records, data)
          })
        },
        current : function(){
          return crud.page
        },
        pages : function(){
          var _pages = []
          if( !crud.total ){
            crud.count(function(){
              setPages( _pages )
            })
          }else{
            setPages( _pages )
          }

          return _pages

          function setPages( _pages ){
            if( !crud.pagination){
              crud.pagination = pagination( crud.limit, crud.total, crud.range, crud.page )
            }
            replace(_pages,crud.pagination.list())

            console.log( _pages, crud.limit, crud.total, crud.range)
          }
        }
      })
      return crud
    }
  })
.factory('pagination',function(){
    /**
     * options : {
     *  limit,
     *  count,
     *  range,
     *  current
     *  }
     */
    return function( limit, count, range,current ){
      current  = current || 0
      var options = {
        limit : limit,
        count : count,
        range:range,
        current : current
      }
      var pagination = _.defaults(options,{
        pages : [],
        last : Math.ceil( options.count/options.limit)-1,
        page : options.current,
        next : function(){
          if( pagination.page < pagination.last ){
            pagination.calculate()
            pagination.page++
          }
        },
        prev : function(){
          if( pagination.page > 0 ){
            pagination.calculate()
            pagination.page--
          }
        },
        goto : function(page){
          if( page < pagination.last+1 && page > -1){
            pagination.calculate()
            pagination.page = page
          }
        },
        list : function(){
          pagination.calculate()
          return pagination.pages
        },
        calculate : function(){

          pagination.pages.splice(0)
          pagination.pages.push( pagination.page )
          var min = pagination.page - 1,
            max = pagination.page +1

          while( min > -1 && min > (pagination.page - option.range)){
            pagination.pages.unshift(min)
            min--
          }

          while( max < pagination.last + 1 && max < (pagination.page + options.range)){
            pagination.pages.push(max)
            max++
          }
        }
      })
      return pagination
    }
  })
  .factory('session',function(){
    console.log("should run only once")
    var session = {},
      registered = {}
    return {
      item : function( name, setObj ){
        if( setObj ){

          if(_.isObject( session[name])){
            _.forEach( session[name],function(v,k){
              delete session[name][k]
            })
            _.extend( session[name], setObj )

          }else if(_.isArray(session[name])){
            session[name].splice(0)
            setObj.forEach(function(o){
              session[name].push(o)
            })

          }else{
            session[name] = setObj
          }

          return session[name]
        }else{

          if( session[name] === undefined ){
            console.log("no handler registered for ",name,session)
            return false
          }
          //need construct
          if( session[name] === null ){
            session[name] = registered[name].origin
            registered[name].handler( session[name] )
            return (_.isObject(session[name]) || _.isArray(session[name])) ? session[name]: session

          }else{
            return session[name]
          }
        }
      },
      register : function(name , origin, handler){
        registered[name] = {
          origin : origin,
          handler : handler
        }
        session[name] = null
      }
    }
  })