import React, {PropTypes} from 'react';
import { Button } from 'semantic-ui-react'
import { Segment, Divider } from 'semantic-ui-react'



const Header = (props)=>{
    let s3 = {position: "relative", float: "right", top: "-17px"}
  	return(
			<Segment>
                {props.user.username}&nbsp;
                <Divider fitted />  
                {props.user.email}
                <Button secondary size="medium" style={s3}  onClick={props.onLogout}>Logout</Button>
            </Segment>

    );
}
Header.propTypes={
    onLogout: PropTypes.func.isRequired,
}
export default Header;

