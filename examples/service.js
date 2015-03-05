'use strict';

var app = angular.module('service.app',[]);

app.service('testService',function(){
        var self = this;
        self.data = ['x','5','4'];

        self.getData = function(){
            return self.data;
        };

        self.addData = function(itm){
            self.data.push(itm);            
            return self.data;
        };
        self.remove = function(itm){
            var idx = self.data.indexOf(itm);
            if(idx > -1){
                self.data.splice(idx,1);
                return true;
            }else{
                return false;
            }
        };
});

//module.exports = app;
