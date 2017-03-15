import React, {PropTypes} from 'react';
import Tabs from 'muicss/lib/react/tabs';
import Tab from 'muicss/lib/react/tab';
import LoginForm from '../components/Login';
import RegisterForm  from '../components/Register';

function LogiRegi(props){
    return(
        <Tabs justified={true}>
            <Tab value="login" label="Login" onActive={props.handleLogClick}>
                    <LoginForm 
                        onLogin={props.onLogin} 
                        />
                </Tab>
            <Tab value="register" label="Register" onActive={props.handleRegClick}>
                <RegisterForm
                    onRegister={props.onRegister} 
                />
            </Tab>
        </Tabs>
    );
}



LogiRegi.PropTypes = {
    onLogin: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired,
    handleLogClick: PropTypes.func.isRequired,
    handleRegClick:PropTypes.func.isRequired,
}

export default LogiRegi;