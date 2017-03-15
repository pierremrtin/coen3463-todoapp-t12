import React, {PropTypes} from 'react';
import Divider from 'muicss/lib/react/divider';
import { Button, Segment, Menu } from 'semantic-ui-react'

function Status(props){
    let completed={color:"#ffb300"}

    return(
        <div>
  
                <Menu>
                <Menu.Item >
                    <Button   size="small" onClick={props.onGetAll}>All</Button>
                </Menu.Item>
                <Menu.Item>
                    <Button    size="small"  onClick={props.onGetOpen}>Open</Button>
                </Menu.Item>
                <Menu.Item>
                    <Button    size ="small" onClick={props.onGetCompleted}>Completed</Button>
                </Menu.Item>
                <Menu.Item >
                    <Button  negative size ="small" onClick={props.onClear}>Clear Completed</Button>
                </Menu.Item>
                <Menu.Item fitted>
                    <h3>{props.onCompletedCount} / {props.onCount} completed</h3>
                </Menu.Item>
                </Menu>

        </div>


    )
}

Status.PropTypes={
    onClear: PropTypes.func.isRequired,
    onCount: PropTypes.number.isRequired,
    onCompletedCount: PropTypes.number.isRequired,
    onGetCompleted: PropTypes.func.isRequired,
    onGetOpen: PropTypes.func.isRequired,
    onGetAll: PropTypes.func.isRequired
}

export default Status;
