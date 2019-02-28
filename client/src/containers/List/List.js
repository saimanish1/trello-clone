import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import classes from './List.module.scss';
import Column from '../Column/Column';
import {
  addColumn,
  getAllCards,
  reorderCard,
  reorderList,
} from '../../store/actions/listActions';
import Backdrop from '../../components/Backdrop/Backdrop';
import { ReactComponent as CloseIcon } from '../../assets/images/close-icon.svg';

class List extends Component {
  state = {
    areAllCardsReceived: false,
    newColumnTitle: '',
    isNewColumnTitleInEdit: false,
  };

  onAddColumnHandler = () => {
    this.setState({ isNewColumnTitleInEdit: true });
  };

  onColumnTitleChangeHandler = e => {
    this.setState({ newColumnTitle: e.target.value });
  };

  onColumnTitleOutsideClicked = () => {
    this.setState({ isNewColumnTitleInEdit: false });
  };
  onKeyDownColumnTitleHandler = e => {
    if (e.keyCode === 13 || e.target.name === 'addcard') {
      if (this.state.newColumnTitle.trim().length > 0) {
        this.onColumnTitleChangeHandler(e);
        this.onColumnTitleOutsideClicked();
        this.props.addColumn(this.props.boardId, this.state.newColumnTitle);
        this.setState({ newColumnTitle: '' });
      }
    }
  };
  onColumnTitleCloseIconHandler = () => {
    this.setState({ isNewColumnTitleInEdit: false });
  };

  addColumnWrapper = () => {
    if (this.state.isNewColumnTitleInEdit) {
      return (
        <div className={classes.add_list__wrapper}>
          <input
            type={'text'}
            value={this.state.newColumnTitle}
            placeholder={'Enter list title...'}
            className={classes.list_title__inedit}
            onChange={this.onColumnTitleChangeHandler}
            onKeyDown={this.onKeyDownColumnTitleHandler}
          />
          <div className={classes.add_list__controls}>
            <button
              className={classes.add_list__controls__button}
              onClick={this.onKeyDownColumnTitleHandler}
              name="addcard"
            >
              Add a list
            </button>
            <span onClick={this.onColumnTitleCloseIconHandler}>
              <CloseIcon className={classes.add_list__controls__close_icon} />
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <button className={classes.add_list} onClick={this.onAddColumnHandler}>
          <span className={classes.add_list__addicon}>+</span>
          <span className={classes.add_list__text}>
            {this.props.list.columnOrder.length > 0
              ? 'Add another list'
              : 'add a list'}
          </span>
        </button>
      );
    }
  };

  onDragEnd = result => {
    const { destination, draggableId, source, type } = result;
    const payload = {
      destination,
      draggableId,
      source,
    };
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
      if (source.index !== destination.index) {
        this.props.reorderList(
          { ...payload, columnOrder: this.props.list.columnOrder },
          this.props.boardId
        );
        return;
      }

      return;
    }

    this.props.reorderCard({ ...payload, columns: this.props.list });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.list.columns && this.props.list.columnOrder) {
      if (!this.state.areAllCardsReceived) {
        const columnIds = this.props.list.columnOrder;
        this.props.getAllCards(columnIds);
        this.setState({ areAllCardsReceived: true });
      }
    }
    // console.log('prevProps',prevProps,'this.props',this.props);
  }

  render() {
    let listData;

    if (this.props.list.columns && this.props.cards.cards) {
      console.log(this.props.list, this.props.cards);
      if (this.props.list.columnOrder.length === 0) {
        listData = (
          <React.Fragment>
            <p>Your Board appears to be Empty. Start Creating Lists</p>
            <div style={{ width: '30rem' }}>
              <Backdrop clickedOutside={this.onColumnTitleOutsideClicked}>
                {this.addColumnWrapper()}
              </Backdrop>
            </div>
          </React.Fragment>
        );
      } else {
        listData = (
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable
              droppableId={'all-columns'}
              direction={'horizontal'}
              type={'column'}
            >
              {provided => (
                <div
                  className={classes.listcontainer}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {this.props.list.columnOrder.map((columnId, index) => {
                    const column = this.props.list.columns[columnId];
                    const cards = column.cardIds.map(
                      cardId => this.props.cards.cards[cardId]
                    );

                    return (
                      <Column
                        key={column.id}
                        column={column}
                        cards={cards}
                        index={index}
                      />
                    );
                  })}

                  <Backdrop clickedOutside={this.onColumnTitleOutsideClicked}>
                    {this.addColumnWrapper()}
                  </Backdrop>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        );
      }
    } else {
      listData = <p>Please Wait</p>;
    }
    return listData;
  }
}

const mapStateToProps = state => {
  return {
    cards: state.cards,
    list: state.list,
  };
};

export default connect(
  mapStateToProps,
  { reorderCard, reorderList, getAllCards, addColumn }
)(List);
