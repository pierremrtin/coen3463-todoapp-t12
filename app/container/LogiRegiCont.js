
import React, { PropTypes } from 'react';
import LogiRegi from '../components/LogiRegi';
import AuthApi from '../api/AuthApi';
import {browserHistory} from 'react-router';

class LogiRegiCont extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleLogClick = this.handleLogClick.bind(this);
        this.handleRegClick = this.handleRegClick.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.onRegister = this.onRegister.bind(this);

        this.state = {
            user: {},
            error: "",
            isLoading: false
        }
    }
    componentWillMount(){
        this.setState({isLoading:true});
        if(this.props.routeParams.mode){
            this.setState({isLoading:false});
            alert("Please login first");
            return;
        }
        AuthApi.onGetUser().then(res=>{
            this.setState({isLoading:false});
            if(res.data.response){
                this.context.router.push('/todos');
            } else {
                this.context.router.push('/');
            }
        });
    }
    handleRegClick(){
        this.context.router.push('/register');
    }
    handleLogClick(){
        this.context.router.push('/login');
    }

    redirect(path){
        browserHistory.push(path);
    }

    onLogin(e){
        e.preventDefault();
        let data = {
            username: e.target.elements[0].value,
            password: e.target.elements[1].value
        }
        AuthApi.onLogin(data).then((res)=>{
            const data = res.data;
            if(data.success===true){
                this.setState({
                    user: data.response._id
                });
                this.redirect(res.data.redirect);
                console.log('login success')
                return;
            }
            alert(res.data.response)
            console.log('login failed')
        });
       
    }

    onRegister(e){
        e.preventDefault();
        let elements = e.target.elements;
        if(elements[4].value>6){
            alert("Password is too short. Please try another.");
            return;
        }
        let data={
            username: elements[0].value,
            first_name: elements[1].value,
            last_name: elements[2].value,
            email: elements[3].value,
            password: elements[4].value
        }
        AuthApi.onRegister(data).then((res)=>{
            console.log(res.data.redirect); //access data here //check the console
            if(res.data.success===false){
                alert(res.data.response.message);
                return; 
            }
            window.location = res.data.redirect;
        }).catch((err)=>{
            alert("Try Again!");
            throw(err);
        });
    }

    render() { 

        return(

            <LogiRegi
                handleLogClick={this.handleLogClick}
                handleRegClick={this.handleRegClick}
                onLogin={this.onLogin}
                onRegister={this.onRegister}
             />
        )
    }
}

LogiRegiCont.contextTypes = {
    router: PropTypes.object.isRequired
};

export default LogiRegiCont;