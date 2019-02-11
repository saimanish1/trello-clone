import React, {PureComponent} from 'react';

import {connect} from 'react-redux';
import classes from './Board.module.scss';
import List from "../List/List";
import { getAllLists} from "../../store/actions/listActions";
class Board extends PureComponent {

state={
    title:'',
    list:null
};

    componentDidMount() {

        this.props.getAllLists(this.props.match.params.boardId);
    }



    render() {
        return (
            <div className={classes.board}>

                <List boardId={this.props.match.params.boardId}/>
            </div>
        );
    }
}

export default connect(null,{getAllLists})(Board);