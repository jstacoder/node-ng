#!/usr/bin/env node
'use strict';
var use_angular = require('./index.js');

use_angular(function(){
        var path = require('path');
        require(path.join(path.resolve('./'),process.argv[2]))();
});
