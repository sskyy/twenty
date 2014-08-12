/**
 * Created by jiamiu on 14-6-12.
 */
var _ = require('lodash')
exports.pick = function(map, ref, req){
    var validated = true

        _.forEach( map, function(spec, name){
            if(_.isArray( map ) ){
                name = spec
                ref[name] = req.param(name)
            }else{
                var alias = typeof spec == "string" ? spec : (spec.alias||name)
                ref[alias] = req.param(name)
            }

            if( req.param(name) === undefined && !spec.unRequired){
                validated = false
            }
        })

    return validated

}