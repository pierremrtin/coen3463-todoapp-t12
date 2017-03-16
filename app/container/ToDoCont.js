import React, {PropTypes} from 'react';
import ReactDom from 'react-dom';
import TDAdd from '../components/TDAdd';
import TDItem from '../components/TDItem';
import Header from '../components/Header';
import TodoApi from '../api/TodoApi';
import AuthApi from '../api/AuthApi';
import _ from 'lodash';

class ToDoCont extends React.Component{
    constructor(props){
        super(props);
        this.handleOnAddItem = this.handleOnAddItem.bind(this);
        this.handleOnDelete = this.handleOnDelete.bind(this);
        this.handleOnComplete = this.handleOnComplete.bind(this);
        this.handleClearList = this.handleClearList.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleGetCompleted = this.handleGetCompleted.bind(this);
        this.handleGetOpen = this.handleGetOpen.bind(this);
        this.handleGetAll = this.handleGetAll.bind(this);        
        this.state = {
            items:[],
            user: '',
            completedCount: 0,
            isLoading: false,
            isLoadingItem: false,
            isUpdating: false,
            count: 0
        }
        
    }

    componentDidMount(){
        this.setState({isLoading:true});
        var dom = ReactDom.findDOMNode(this)
        let lastUserState = this.state.user; //get last state of user
        let lastItemState = this.state.items; //get last state of items
        console.log(dom);
        if(lastUserState===''){
            AuthApi.onGetUser().then((res)=>{
                if(res.data.response){
                    this.setState({
                        user: res.data.response//access the user using res.data.response.firstName, res.data.reponse.lastName,res/data.username for email
                    });
                    //then getowntodos
                    TodoApi.onGetOwnTodo(res.data.response._id)
                    .then((todos)=>{
                        const completedCount = todos.todos.filter(todo=>todo.isCompleted===true);
                        this.setState({
                            completedCount:completedCount.length,
                            count: todos.todos.length
                        });
                        if(this.props.routeParams.mode==='completed'){
                            this.setComplete(todos);
                        }
                        else if(this.props.routeParams.mode==='open'){
                            this.setOpen(todos);
                        } else {
                            this.setState({
                                items:[...lastItemState,...todos.todos],
                            });
                        }
                        this.setState({isLoading:false});
                    });
                }else{
                    console.log('user not found')
                    this.context.router.push('/login');
                }
            });
        }   
    }   

    handleOnDelete(index,todo){
        console.log(todo);
        this.setState({isUpdating: true});
        let lastItemState = this.state.items;
        TodoApi.onDelete(todo._id).then(res=>{
            if(res.data.success){                  
                console.log("item deleted")     
                lastItemState.splice(index,1);
                this.setState({
                    items: [...lastItemState],
                    isUpdating: false,
                    count: this.state.count-1<1?0:this.state.count-1,
                });
                if(this.state.count-1===0){
                    this.setState({
                        completedCount:0
                    })
                }
                return;
            }
            this.setState({isUpdating: false});
            console.log(res.data.response);
        });         
    }

    handleOnAddItem(e) {
        e.preventDefault();
        this.setState({isLoadingItem:true});
        var lastState = this.state.items; //get last state of item
        let toDo = { //create a todo object to be saved
            name: e.target.elements[0].value,
            user: this.state.user,
            createDate: Date.now(),
        }
        TodoApi.onAdd(toDo).then(res=>{
            if(res.data.success){
                this.setState({ //update items
                    items :[...lastState,Object.assign({},res.data.response)]
                });
                console.log('Todo Added')
                this.setState({isLoadingItem:false,count:this.state.count+1});
                return;
            }
            this.setState({isLoadingItem:false,count:this.state.count+1});
            console.log(res.data.response);
        }).catch(err=>{
            this.setState({isLoadingItem:false});         
        }); 
    }

    handleOnComplete(todo,index){
        this.setState({isUpdating: true});
        let lastItems = this.state.items;
        TodoApi.onEdit(todo._id,"isCompleted",!todo.isCompleted)
            .then(res=>{
                if(res.data.success){
                    if(this.props.routeParams.mode==='completed' || this.props.routeParams.mode==='open'){
                        lastItems.splice(index,1);
                    } else {
                        lastItems.splice(index,1,res.data.response);
                    }
                    this.setState({
                        items: [...lastItems],
                        completedCount: todo.isCompleted ? this.state.completedCount - 1 : this.state.completedCount + 1,
                        isUpdating: false
                    });
                    return;
                }
                this.setState({isUpdating:false});
                console.log(res.data.response);
            }).catch(err=>{
            });;
    }
    setAll(res){
        this.setState({items: [...res.todos]});
    }

    setComplete(res){
        const completed = res.todos.filter(todo=>todo.isCompleted===true);
        this.setState({items: [...completed]});
    }

    setOpen(res){
        const open = res.todos.filter(todo=>todo.isCompleted===false);
        this.setState({items: [...open]});
    }

    handleGetAll(){
        this.setState({isUpdating:true});
        this.context.router.push('/todos');
        TodoApi.onGetOwnTodo(this.state.user._id)
        .then(res=>{
            this.setAll(res);
            this.setState({isUpdating:false});
        }).catch(err=>{

        });
    }

    handleGetCompleted(){
        this.context.router.push('/todos/completed');
        this.setState({isUpdating:true});
        TodoApi.onGetOwnTodo(this.state.user._id)
        .then(res=>{
            this.setState({isUpdating:false});
            this.setComplete(res);
        }).catch(err=>{

        });
    }

    handleGetOpen(){
        this.setState({isUpdating:true});
        this.context.router.push('/todos/open');
        TodoApi.onGetOwnTodo(this.state.user._id)
        .then(res=>{
            this.setState({isUpdating:false});
            this.setOpen(res);
        }).catch(err=>{
        });
    }    
    handleClearList(e){
        this.setState({isUpdating:true});
        TodoApi.onDeleteAll(this.state.user._id)
        .then(res=>{
            console.log(res.data.todo)
            if(res.data.success){
                console.log("clear completed")
                this.setState({
                    items: [...res.data.todo],
                    isUpdating: false,
                    completedCount:0,
                    count: res.data.todo.length
                });
                return;
            }
            this.setState({isUpdating:falses});
            console.log(res.data.response);
        }).catch(err=>{
          
        });
    }


    handleLogout(){
        AuthApi.onLogout();
    }
    
    render(){
        if(this.state.isLoading===true){
            return(
                <div>
                </div>
            )
        }        
            return(
                <div>
                    <Header 
                        onLogout={this.handleLogout}
                        user={this.state.user} 
                    />
                    <TDAdd
                            onAddItem= {this.handleOnAddItem}
                            todos= {this.state.items}
                            onDeleteTodo= {this.handleOnDelete}
                            onClickTodo= {this.handleOnComplete}
                            onClear= {this.handleClearList}
                            onCount={this.state.count}
                            onCompletedCount={this.state.completedCount}
                            isLoadingItem={this.state.isLoadingItem}
                            getCompleted={this.handleGetCompleted}
                            getOpen={this.handleGetOpen}
                            getAll={this.handleGetAll}
                            isUpdating={this.state.isUpdating}
                    />
                </div>
         )
     }
 
    
}
ToDoCont.contextTypes = {
    router: PropTypes.object.isRequired
};


export default ToDoCont;