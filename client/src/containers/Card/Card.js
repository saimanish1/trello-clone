import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Draggable} from "react-beautiful-dnd";
import classes from './Card.module.scss'
import Backdrop from "../../components/Backdrop/Backdrop";
import {ReactComponent as EditLogo} from '../../assets/images/pencil.svg';
import {editCardTitle} from "../../store/actions/cardActions";
class Card extends Component {
state={
  cardTitle:'',
  isCardInEdit:false
};

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.card.id!==this.props.card.id){
            this.setState({cardTitle:this.props.card.content});
        }
    }

    componentDidMount() {
        this.setState({cardTitle:this.props.card.content});
    }

    onChangeCardTitleHandler = (e)=>{
    this.setState({cardTitle:e.target.value});
};


 cardTitleEditIconHandler= (e)=>{
    this.setState({isCardInEdit: true});
};


 onCardTitleOutsideClicked = () => {
        console.log('card clicked outside');
        this.setState({isCardInEdit: false});

    };

    onKeyDownCardTitleHandler = (e) => {
        if (e.keyCode === 13) {
            this.onChangeCardTitleHandler(e);
            this.onCardTitleOutsideClicked();

            this.props.editCardTitle(this.state.cardTitle, this.props.card.id)
        }
    };



cardTitleWrapper = ()=>{
  let cardTitle;
  if(this.state.isCardInEdit){
      return (<input type={"text"} className={classes.cardtitle} onChange={this.onChangeCardTitleHandler} onKeyDown={this.onKeyDownCardTitleHandler} value={this.state.cardTitle}/>)
  }
  else {
     return  (<React.Fragment>{this.state.cardTitle} <span className={classes.cardtitleEditIcon} onClick={this.cardTitleEditIconHandler}><EditLogo/></span></React.Fragment>);
  }


};
    render() {

        return (
            <Draggable
            draggableId={this.props.card.id}
            index={this.props.index}
            >
                {(provided)=>
                    (<div
                        className={classes.container}
                        {...provided.draggableProps}

                        ref={provided.innerRef}
                    >
                        <Backdrop provided={provided} clickedOutside={this.onCardTitleOutsideClicked}>{this.cardTitleWrapper()}</Backdrop>

                </div>)}
            </Draggable>
        );
    }
}

export default connect(null, {editCardTitle})(Card);