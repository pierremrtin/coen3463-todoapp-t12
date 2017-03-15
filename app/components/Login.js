import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { Button, Form } from 'semantic-ui-react'
    
function LoginForm(props){
    return (
      <Form onSubmit={props.onLogin}>
            <Form.Field>
                <label>Username</label>
                <input placeholder='Username' name="username" id="username" required={true} />
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input placeholder='Password' name="password" id="password" type="password" />
            </Form.Field>
            <Button primary type='submit'>Submit</Button>
        </Form>
    );
}

LoginForm.PropTypes={
  onLogin: PropTypes.func.isRequired
}

export default LoginForm;