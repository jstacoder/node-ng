for an explanation of usage see: [the blog post](https://www.codementor.io/angularjs/tutorial/angular-node-building-a-command-line-tool-to-generate-projects)

##NOW RUN YOUR ENTIRE Angular App $digest-loop via node-ng !!!!

Node-Ng is now a full featured angular test environment. use any test runner you want!!! No more being forced to use karma and jasmine.
examples use tape test runner, but any can be used.

run / test :
    - controllers via `$controller` service
    - services/factorys via `ng_injector` convience function
    - directives via `$compile` service
    - emulate `$scope.$digest` by simply getting `$rootScope` and calling its `$digest` function

convience functions included:
    * `ng_load(name)` - replacement for angular.inject(name,[appName])
    * `ng_bootstrap(app)` - boostraps angular app for use
    * `ng_injector(app)` - returns injector function for use in testing, ie:
    
    ```nodejs
    var injector = ng_injector('app');
    // load needed depedencys easily here
    injector(function($controller,$rootScope,$interpolate){
        tape = require('tape');
        tape.test('example',function(t){
            t.ok();
            t.end();
        });
    });
    ```
