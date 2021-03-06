var express = require('express'),
    router = express.Router(),
    Todo = require('../models/todos'),
    User = require('../models/user');

router.get('/',(req,res)=>{
    console.log(req.user);
    console.log("ongetowntodo");
    Todo.find((err,docs)=>{
        if(err){
            return res.json({
                response: 'Error retrieving todos' 
            });
        }
        let filtered=[];
        console.log(docs);
        for(let x=0;x<docs.length;x++){
            if(req.user._id.toString()===docs[x].user.toString()){
                filtered.push(docs[x]);
            }
        }
        res.status(200).json({
            todos:filtered
        });
    });
});

router.post('/', (req,res)=>{
    User.findById(req.body.user, (err, user)=>{
        if(!req.user){
            return res.json({
                success: false,
                title: 'Unauthorized'
            });
        }
        if(!user || err){
             return res.json({
                success: false,
                title: 'Error',
                response: 'Error occured'
            });
        }
        console.log("user found");
        console.log(user);
        const todo = new Todo({
            name: req.body.name,
            user: user,
            createDate: req.body.createDate,
        });
        todo.save((err,todo)=>{
            if(err){
                console.log(err)
               res.json({
                    success: false,
                    title: 'Error',
                    response: err.errors.name.message
                });
                return; 
            }
            user.todos.push(todo);
            user.save();
            console.log("todo saved");
            res.status(201).json({
                success:true,
                title: 'Success',
                response: todo
            });
        });
    });
});

router.delete('/:id',(req,res)=>{
    Todo.findById(req.params.id,(err,todo)=>{
        if(err){
           return res.json({
                success: false,
                title: 'Error',
                response: 'Error occured'
            });
        }
        if(!todo){
            return res.json({
                success: false,
                title: 'Error',
                response: 'Todo not found'
            });
        }
        if(!req.user){
            return res.json({
               success:false,
               title: 'Error',
               response: 'Unauthorized' 
            })
        }
        todo.remove((err,todo)=>{
            if(err){
                return res.json({
                    success: false,
                    title: 'Error',
                    response: 'Error occured'
                }); 
            }
            res.status(200).json({
                success: true,
                title: 'Success',
                response: todo
            });
        });
    });
});

router.delete('/deleteAll/:id', (req,res)=>{
    console.log("here");
    Todo.find((err,todos)=>{
        if(err){
            return res.json({
                success:false,
                response: 'Error occured'
            });
        }
        if(!req.user){
            return res.json({
                success:false,
                response: 'Unauthorized'
            });
        }
        todos.map((todo, index)=>{
            if(todo.user.toString()===req.params.id){
                if(todo.isCompleted===true){
                    todo.remove(err=>{
                        if(err){
                            return res.json({
                                success:false,
                                response: 'Error occured'
                            });
                        }
                        if(!req.user){
                            return res.json({
                                success:false,
                                response: 'Unauthorized'
                            });
                        }
                    });
                }
            }
        });
        Todo.find((err,todos)=>{
            let filtered=[];
            for(let x=0;x<todos.length;x++){
                if(req.params.id===todos[x].user.toString()){
                    filtered.push(todos[x]);
                }
            }
            res.json({
                success:true,
                todo: filtered
            });
        }); 
    });
});

router.patch('/:id/:field/:value', (req, res)=>{
    Todo.findById(req.params.id, (err, todo)=>{
        if(err){
            return res.json({
                success:false,
                response: 'Error occured'
            });
        }
        if(!req.user){
            return res.json({
                success:false,
                response: 'User not found'
            })
        }
        if(!todo){
            return res.json({
                success:false,
                reponse: 'Todo not found'
            });
        }
        console.log(req.params.value);
        todo[req.params.field]=req.params.value;
        todo.save((err, todo)=>{
            if(err){
                return res.json({
                    success:false,
                    response: 'Error occured!'
                })
            }
            res.json({
                success:true,
                response: todo
            });
        });

    });
});

module.exports = router;