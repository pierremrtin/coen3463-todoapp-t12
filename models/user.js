let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose'); 

var User = new Schema({
	username:  {
    type:String,
	},
	first_name:{
    type:String,
  },  
  last_name:{
    type:String,
  },
	email: {
		type: String,
		validate: {
          validator: function(v) {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
          },
          message: 'Invalid Email!'
        },
  },
  todos: [{type: Schema.Types.ObjectId, ref: 'Todo'}]    
    
});


User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);