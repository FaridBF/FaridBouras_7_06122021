/**
 * Chaque reducer est une fonction qui reçoit le state et une action en paramètre,
 * et qui retourne un nouveau state.
 */
import { ADD_COMMENTS } from '../actions/comment.action';

// State initialement égale à un objet vide
const initialState = {};

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_COMMENTS:
      return [action.payload, ...state];
    default:
      return state;
  }
}
