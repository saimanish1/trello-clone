import axios from '../../axios-users';
import { ADD_CARD, EDIT_CARD_TITLE } from './actionTypes';
import uuid from 'uuid';

export const editCardTitle = (editedCardTitle, cardId) => {
  return dispatch => {
    axios
      .post(`/cards/card/${cardId}?title=true`, { title: editedCardTitle })
      .then(res => {
        console.log(res.data);
        dispatch({
          type: EDIT_CARD_TITLE,
          payload: { editedCardTitle, cardId },
        });
      })
      .catch(err => console.log(err.response.data));
  };
};

export const addCard = (newCardTitle, columnId) => {
  return async dispatch => {
    const payload = {
      title: newCardTitle,
      cardId: uuid(),
      columnId,
    };
    console.log(payload);

    dispatch({
      type: ADD_CARD,
      payload: { ...payload },
    });

    const res = await axios.post('/cards', { ...payload });
    console.log(res.data);
  };
};
