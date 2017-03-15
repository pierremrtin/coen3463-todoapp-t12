var session = require('express-session'),
    MongoDBStore = require('connect-mongodb-session')(session),
    assert = require('assert');
    
    const uri = process.env.MONGOLAB_URI || 'mongodb://pierremrtin:1107061288mlab@ds133279.mlab.com:33279/coen3463-t12';
    var store = new MongoDBStore(
      {
        uri: uri,
        collection: 'mySessions'
      },
        function(error){
            assert.ifError(error);
            assert.ok(true);
        }      
      );
 
    // Catch errors 
    store.on('error', function(error) {
      assert.ok(false);
      assert.ifError(error);
    });

module.exports = store;