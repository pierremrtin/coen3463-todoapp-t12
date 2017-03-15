import React, {PropTypes} from 'react';
import { Button, Form } from 'semantic-ui-react'

function RegisterForm(props){
  return (
    <Form onSubmit={props.onRegister}>
        <Form.Field>
            <label>Username</label>
            <input placeholder='Username' required={true} />
        </Form.Field>
        <Form.Field>
            <label>First Name</label>
            <input placeholder='First Name' required={true}  />
        </Form.Field>
        <Form.Field>
            <label>Last Name</label>
            <input placeholder='Last Name' required={true}  />
        </Form.Field>
        <Form.Field>
            <label>Email</label>
            <input placeholder='Email' required={true} type="email"  />
        </Form.Field>
        <Form.Field>
            <label>Password</label>
            <input placeholder='Password' required={true} type="password"  />
        </Form.Field>

        <Button primary type='submit' id="submitButton" >Submit</Button>
    </Form>
  );
}

RegisterForm.PropTypes={
  onRegister: PropTypes.func.isRequired 
}

export default RegisterForm ;