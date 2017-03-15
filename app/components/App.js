import React, {Component} from 'react';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import { Header, Segment } from 'semantic-ui-react'

class App extends Component{
    constructor(props){
        super(props)
        this.state={
            count: 1
        }
    }

    render(){
        return(
            <div>
            <Segment inverted>
                <Header size='large' textAlign='center' as='h5' inverted color='blue'>TO-DOO-BI-DOO</Header>

            </Segment>


                    <Row>
                        <Col md="6" md-offset="3">
                        {this.props.children}
                        </Col>
                    </Row>

            </div>
        );
    }
}



export default App;
