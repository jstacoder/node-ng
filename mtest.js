var use_angular = require('./index');
var expect = require('chai').expect;



describe('first tests',function(){
    it('should work',function(){
        use_angular(
            function(){
                var app = angular.module('app',[]);
                app.value('items',[1,2,3,4,5]);
                app.value('newItems',[]);
                app.factory('transferItems',transferItems);

                transferItems.$inject = [];
                
                function transferItems(){
                    return function(collA,collB){
                        angular.forEach(collA,function(i){
                            collB.push(i);
                        });
                    }
                }
                app.factory('doTransfer',doTransfer);

                doTransfer.$inject = ['items','newItems','transferItems'];

                function doTransfer(items,newItems,transferItems){
                    return function(){
                        transferItems(items,newItems);
                    };
                }
                var doTransfer = ng_load('doTransfer',['app']);
                var items = ng_load('items');
                var newItems = ng_load('newItems');
                doTransfer();
                expect(newItems).to.equal(items);
                done();
        });
    });
});
