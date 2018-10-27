import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";

import classes from './Boards.module.scss';
import {connect} from 'react-redux';
import {getAllBoards} from "../store/actions/listActions";
import Backdrop from "../components/Backdrop/Backdrop";
import {addBoard} from "../store/actions/boardActions";

class Boards extends Component {

    state = {
        newBoardTitle: '',
        isNewBoardTitleInEdit: false
    };

    onAddBoardHandler = () => {

        this.setState({isNewBoardTitleInEdit: true});


    };

    onBoardTitleChangeHandler = (e) => {
        this.setState({newBoardTitle: e.target.value});
    };
    onBoardTitleOutsideClicked = () => {
        this.setState({isNewBoardTitleInEdit: false});
    };
    onKeyDownAddBoardTitleHandler =(e)=>{
       if(e.keyCode===13){
          this.onBoardTitleChangeHandler(e);
          this.onBoardTitleOutsideClicked();
          this.props.addBoard(this.state.newBoardTitle,this.props.history);
           this.setState({newBoardTitle:''});
       }
    };

    componentDidMount() {

        this.props.getAllBoards();
    }
    

    boardWrapper = () => {
        if (this.state.isNewBoardTitleInEdit) {
            return (<textarea ref={this.myRef} value={this.state.newBoardTitle} placeholder={"add a board title"}
                         autoFocus   onChange={this.onBoardTitleChangeHandler} className={classes.add_board__input}
                              onKeyDown={this.onKeyDownAddBoardTitleHandler}
            />)
        }
        else {
            return (
                <p className={classes.board__item} onClick={this.onAddBoardHandler}><span
                    className={classes.board__item__title}>Add a board</span></p>
            )
        }
    };

    render() {

        const {boards} = this.props;
        let boardList = <p>Not yet retrieved</p>;
        if (boards) {
            if (boards.length > 0) {
             boardList = boards.map((board, index) => (<Link key={board._id} to={`/boards/${board._id}`}
                                                                className={classes.board__item}>{board.title}</Link>))
            }
            else {
                boardList= (
                    <React.Fragment>
                        <h3 className={classes.board__empty__title}>No boards were created</h3>
                        <Backdrop
                            clickedOutside={this.onBoardTitleOutsideClicked}> {this.boardWrapper()}</Backdrop>

                    </React.Fragment>)
            }
        }

        return (
            <div>

                <div className={classes.board}>
                    {boardList}
                    <Backdrop
                        clickedOutside={this.onBoardTitleOutsideClicked}> {this.boardWrapper()}</Backdrop>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        boards: state.boards
    }
};

export default withRouter(connect(mapStateToProps, {getAllBoards,addBoard})(Boards));