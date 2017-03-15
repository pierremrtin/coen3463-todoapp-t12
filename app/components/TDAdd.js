import React, {PropTypes} from 'react';
import { Form, Button, Input, Segment } from 'semantic-ui-react';
import Container from 'muicss/lib/react/container';
import Panel from 'muicss/lib/react/panel';
import TDItem from '../components/TDItem';
import Status from '../components/Status';



function TDAdd(props){

    return (
        <div>
            
                <Segment inverted>

                    <Form onSubmit={props.onAddItem}>
                        <Form.Field>
                            <Input size='large' placeholder="What`s on your mind?">
                                <input />
                                <Button primary type="submit" size="medium" >Add</Button>
                            </Input>
                        </Form.Field>
                    </Form>
                </Segment>
       

            <Status onClear={props.onClear}
                    onCount={props.onCount}
                    onCompletedCount={props.onCompletedCount}
                    onGetCompleted={props.getCompleted}
                    onGetOpen={props.getOpen}
                    onGetAll={props.getAll}/>
            {props.todos.map((todo, index)=>
                <TDItem 
                    key={index}
                    onDelete={props.onDeleteTodo}
                    index={index}
                    todo={todo}
                    onClick={props.onClickTodo}
                    isLoadingItem={props.isLoadingItem}
                    isUpdating={props.isUpdating}
                />
            )}
        </div>
    )
  }


TDAdd.propTypes={
    onAddItem: PropTypes.func.isRequired,
    todos: PropTypes.array.isRequired,
    onDeleteTodo: PropTypes.func.isRequired,
    onClickTodo: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
    onCount: PropTypes.number.isRequired,
    onCompletedCount: PropTypes.number.isRequired,
    getCompleted: PropTypes.func.isRequired,
    getOpen: PropTypes.func.isRequired,
    getAll: PropTypes.func.isRequired,
    isLoadingItem: PropTypes.bool.isRequired,
    isUpdating: PropTypes.bool.isRequired,
}


export default TDAdd ;