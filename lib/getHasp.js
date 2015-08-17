'use strict';

var download = require('download');
var HASP_URL = 'https://raw.githubusercontent.com/djanowski/hasp/master/bin/hasp';

(function () {
  console.log('Downloading latest hasp lib...');
  
  new download({mode: '755'})
  .get(HASP_URL)
  .dest(__dirname)
  .run(function (error) {
    if (error) {
      throw new Error('hasp download', error.message); 
    }
    
    console.log('...download completed!');
  });
})();
