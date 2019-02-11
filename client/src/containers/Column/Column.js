import React, {PureComponent} from 'react';
import {Droppable, Draggable} from "react-beautiful-dnd";
import {connect} from 'react-redux';
import {ReactComponent as EditLogo} from '../../assets/images/pencil.svg';
import classes from './Column.module.scss'
import Card from "../Card/Card";
import Backdrop from "../../components/Backdrop/Backdrop";
import {editColumnTitle} from "../../store/actions/listActions";
import {ReactComponent as CloseIcon} from '../../assets/images/close-icon.svg';
import {addCard} from "../../store/actions/cardActions";

class Column extends PureComponent {
    state = {
        isColumnTitleInEdit: false,
        columnTitle: this.props.column.title,
        newCardTitle: '',
        isNewCardTitleInEdit: false
    };

    columnTitleEditIconHandler = () => {
        this.setState((prevState => ({isColumnTitleInEdit: true})));

    };

    onTitleOutsideClicked = () => {
        console.log('clicked outside');
        this.setState({isColumnTitleInEdit: false});

    };

    onTitleChangeHandler = (e) => {

        this.setState({columnTitle: e.target.value});
    };

    onKeyDownTitleHandler = (e) => {
        if (e.keyCode === 13) {
            debugger;
            this.onTitleChangeHandler(e);
            this.onTitleOutsideClicked();
            this.props.editColumnTitle(this.state.columnTitle, this.props.column.id)
        }
    };


    columnTitleWrapper = () => {
        if (this.state.isColumnTitleInEdit) {
            return (<input type={"text"} className={classes.title__edit} value={this.state.columnTitle}
                           onChange={this.onTitleChangeHandler} onKeyDown={this.onKeyDownTitleHandler}/>)
        }
        else {

            return (<h3 className={classes.title}>{this.state.columnTitle} <span
                className={classes.title__editIcon} onClick={this.columnTitleEditIconHandler}><EditLogo/></span></h3>);
        }
    };

    onNewCardTitleChangeHandler = (e) => {
        this.setState({newCardTitle: e.target.value});
    };

    onAddCardClickedHandler = (e) => {
        this.setState({isNewCardTitleInEdit: true});
    };

    onAddCardOutsideClicked = () => {
        this.setState({isNewCardTitleInEdit: false});
    };
    onAddCardCloseIconHandler = ()=>{
        this.setState({isNewCardTitleInEdit: false});
    };

    onAddCardKeyDownHandler = (e)=>{
      if (e.keyCode===13 || e.target.name==='addcard'){
          if(this.state.newCardTitle.trim().length>0)
          {
              this.onNewCardTitleChangeHandler(e);
              this.onAddCardOutsideClicked();
              this.props.addCard(this.state.newCardTitle,this.props.column.id);
              this.setState({newCardTitle:''});
          }
      }
    };

    cardtTitleWrapper = () => {
        if (this.state.isNewCardTitleInEdit) {
            return (
                <React.Fragment>
                    <textarea placeholder={"Enter a title for this card..."} className={classes.card_title__inedit}
                              value={this.state.newCardTitle}
                              onChange={this.onNewCardTitleChangeHandler}
                              onKeyDown={this.onAddCardKeyDownHandler}
                    />
                    <button className={classes.card_title__addcard} onClick={this.onAddCardKeyDownHandler} name={"addcard"}>Add Card</button>
                    <span className={classes.card_title__closeicon} onClick={this.onAddCardCloseIconHandler}> <CloseIcon/></span>
                </React.Fragment>

            )
        }

        else {
            return (
                <React.Fragment>
                    <span className={classes.addcard_title__addicon}>+</span>
                    <p onClick={this.onAddCardClickedHandler} className={classes.addcard_title}>{this.props.cards.length > 0 ? 'Add another card' : 'Add a card'}</p>
                </React.Fragment>)
        }
    };


    render() {


        return (
            <Draggable
                draggableId={this.props.column.id}
                index={this.props.index}
            >
                {(provided) => (
                    <div
                        className={classes.columncontainer}
                        {...provided.draggableProps}
                        ref={provided.innerRef}

                    >
                        <Backdrop provided={provided} clickedOutside={this.onTitleOutsideClicked}>
                            {this.columnTitleWrapper()}
                        </Backdrop>
                        <Droppable
                            droppableId={this.props.column.id}
                            type={"task"}
                        >
                            {(provided) =>
                                (<div className={classes.cardlist__container}>

                                    <div className={classes.cardlist} {...provided.droppableProps}
                                         ref={provided.innerRef}>
                                        {this.props.cards.map((card, index) => <Card key={index} card={card}
                                                                                     index={index}/>)}
                                        {provided.placeholder}
                                    </div>
                                </div>)}

                        </Droppable>
                        <Backdrop clickedOutside={this.onAddCardOutsideClicked}>{this.cardtTitleWrapper()}</Backdrop>
                    </div>)}
            </Draggable>
        );
    }
}

export default connect(null, {editColumnTitle,addCard})(Column);