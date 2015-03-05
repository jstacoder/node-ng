'use strict';

var app = angular.module('controller.app',['factory.app','service.app']);

app.controller('test',['testFactory',function(testService){
        var self = this;
        this.getScope = function(){
            return testService.getData();
        };
        this.remove = function(itm){
            return testService.remove(itm);
        };
}]);
app.controller('test2',['testFactory',function(testService){
        var self = this;

        this.manip = function(arg){
            return testService.addData(arg);
        };
        this.getScope = function(){
            return testService.getData();
        };
}]);
