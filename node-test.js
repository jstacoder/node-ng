module.exports = function(){
    var fs = require('fs'),
    $q = ng_load('$q'),
    readdir = promisify(fs.readdir),
    writeFile = promisify(fs.writeFile),
    readFile = promisify(fs.readFile),
    forEach = angular.forEach;
    var run = function(){  
        readdir('./').then(function(result){
            forEach(result,function(itm){
                readFile(itm).then(function(data){
                    console.log(itm,data.toString());
                });
            });    
        }); 
    };

    var app = angular.module('cli.app',[]);

    app.factory('writeFile',[function(){
        return function(name,data){
            return writeFile(name,data);
        };
    }]);

    app.factory('readJson',['readFile','$q',function(readFile,$q){
        return function(name){
            var defer = $q.defer();
            readFile(name).then(function(res){
                if(res){
                    defer.resolve(res.toJson());
                }else{
                    defer.reject('error');
                }
            });
            return defer.promise;
        };
    }]);

    app.factory('readFile',[function(){
        return function(name){
            return readFile(name);
        };  
    }]);

    app.factory('render',['$interpolate','readFile','$q',function($interpolate,readFile,$q){
        return function(template,context){
            var defer = $q.defer();
            var dataQuery = readFile(template).then(function(res){
                if(res){
                    var txt = res.toString();
                    var f = $interpolate(txt);
                    defer.resolve(f(context));
                }else{
                    defer.reject('error');
                }
            });
            return defer.promise;
        };
    }]);

        var render = ng_load('render',['cli.app']);
        var readJson = ng_load('readJson');
        var context = {app:'testApp',d:['x','r','x']};
        render('./template.js',context).then(function(res){writeFile('new.js',res);});

        readJson('./tst.json').then(function(){console.log(arguments);});

 /*   readFile('./template.js').then(function(res){
        console.log(res.toString());
        var context = {app:'testApp',d:['x','r','x']};
        var intFunc = $interpolate(res.toString());
        //console.log(intFunc);
        //console.log(context);
        var r = intFunc(context);
        console.log(r);
    });*/


};

