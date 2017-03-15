var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/login', function(req, res, next) {
  User.authenticate()(req.body.username, req.body.password,(err, user, options)=>{
    if (err) return res.status(500).json({
      success:false,
      title:'Error',
      response: err
    });
    if (user === false) {
      console.log("failed")
      res.json({
        success: false,
        title: 'Error',
        response: options.message
      });
    } else {
        req.login(user,(err)=>{
           if (err) return res.status(500).json({
            success:false,
            title:'Error',
            response:err
          });
          console.log(req.user);
          res.status(200).json({
            success: true,
            title: 'Success',
            response: user,
            redirect:'/todos'
          });
        });
      }
  });
});

router.post('/register', function(req, res){    
  User.register(new User({username: req.body.username, first_name: req.body.first_name, last_name:req.body.last_name, email:req.body.email
    }),req.body.password, function(err, user) {
      if(err) {
      console.log(err);
      return res.send({
        success: false,
        title: 'ERROR',
        response: err
      }); 
    }
    return res.status(201).json({
      success: true,
      redirect: '/login'
    });
  });
});


router.get('/getUser', (req, res)=>{
  const user = req.user;
  console.log(user);
  res.json({
    response: user
  });
});

router.post('/logout', (req, res)=>{
  req.logout();
  req.session.destroy();
  res.json({
    redirect:'/'
  });
});

module.exports = router;