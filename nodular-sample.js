/* nodular.js
 *  examples of getting data from angular environment:
 *
 *      get $timeout service:
 *        var $timeout = ng_load('$timeout');
 *      get $interval service:
 *        var $interval = ng_load('$interval');
 *      get custom service:
 *        var serv = ng_load('testService',['testApp']); <---additional modules refrenced are cached for later use
 *      get more custom services without refrenceing the app 
 *      like above, all ng_load calls are cached so any 
 *      modules only need to be loaded once.
 *        var fact = ng_load('testFactory');
 *      get the $controller service to load controllers
 *        var $c = ng_load('$controller');
 */
module.exports = function(){
    console.log(angular.version);
    /* load your modules by name here */
    // var app = angular.module('testApp',['service.app','factory.app','controller.app']);

    /* require module files here */
    // require('./service.js');
    // require('./factory.js');
    // require('./controllers.js');
};

