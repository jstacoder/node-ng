#!/usr/bin/env node
'use strict';

var get_mod = function(name){
    return require(require('path').join(require('process').env['HOME'],'.node','lib','node_modules',name));
};
var get_benv = function(){
    return require('benv');
};
var use_angular = function(callback){
    get_benv().setup(function(){
        get_benv().expose({        
            angular:get_benv().require('./angular.js','angular'),
            ng_mod_cache:[],
            cache_mods:function(mods){
                angular.forEach(mods,function(itm){
                    ng_mod_cache.push(itm);
                });
            },
            ng_load:function(name,extraModules){
                var mods = (ng_mod_cache && ng_mod_cache.length) ? ng_mod_cache : ['ng'];
                if(extraModules && extraModules.length){
                    angular.forEach(extraModules,function(itm){
                        mods.indexOf(itm) === -1 ? mods.push(itm) : false;
                    });
                }
                cache_mods(mods);
                return angular.injector(mods).get(name);
            },
            ng_bootstrap:function(app){
                var _app = angular.isString(app) ? angular.module(app) : app;
                _app.config(function($locationProvider){
                    $locationProvider.html5Mode(false);
                });
                return angular.bootstrap(angular.element(document.createElement('body')),[_app.name]);
            },
            ng_injector:function(app){ 
                return ng_bootstrap(app).invoke;
            },
            promisify:function(asyncFn,context){         
                var $q = ng_load('$q');                
                return function(){
                    var defer = $q.defer(),
                    args = Array.prototype.slice.call(arguments);        
                    args.push(function(err,val){
                        if(err !== null){
                            return defer.reject(err);
                        }
                        return defer.resolve(val);
                    });
                    asyncFn.apply(context || {}, args);        
                    return defer.promise;
                };
            }
        });
        return callback();
    });
};

use_angular(function(){
        var path = require('path');
        require(path.join(path.resolve('./'),process.argv[2]))();
});
