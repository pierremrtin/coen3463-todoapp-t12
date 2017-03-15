import React, {PropTypes} from 'react';
import '../components/App.css';
import { Segment, Button, List } from 'semantic-ui-react';
import Panel from 'muicss/lib/react/panel';
import Form from 'muicss/lib/react/form';
import Container from 'muicss/lib/react/container';
import Input from 'muicss/lib/react/input';
import Row from 'muicss/lib/react/Row';
import Col from 'muicss/lib/react/Col';

function TDItem(props){
    return (
        <Segment
            color={props.todo.isCompleted?'red':'blue'}
            >
            <Form>
                <Row>
                    <Col md="1">
                        <Container>
                            <h4>{props.todo.name}</h4>
                        </Container>
                    </Col>
                    <List floated="right" >
                        <Button size="small"  name="done"
                                style={{backgroundColor:(props.todo.isCompleted?'rgb(88, 88, 85)':'rgb(33, 150, 243)')}}
                                    onClick={(e)=>{
                                        e.preventDefault()
                                        props.onClick(props.todo, props.index);
                                    }}
                                    >Done</Button>
                        <Button color="red" size="small"  name="delete"
                                    onClick={(e)=>{
                                        e.preventDefault()
                                        props.onDelete(props.index,props.todo)}
                                    }>Delete</Button>
                    </List>
                </Row>
            </Form>
        </Segment>
    )
}

TDItem.PropTypes = {
    todo: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    isLoadingItem: PropTypes.bool.isRequired,
    isUpdating: PropTypes.bool.isRequired
}


export default TDItem ; 