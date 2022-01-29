/**
 * Chaque reducer est une fonction qui reçoit le state et une action en paramètre,
 * et qui retourne un nouveau state.
 */
import {
  ADD_COMMENTS,
  GET_COMMENTS
  // GET_COMMENT_DETAILS
} from '../actions/comment.actions';

// State initialement égale à un objet vide
const initialState = {};

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_COMMENTS:
      return [action.payload, ...state];
    case GET_COMMENTS:
      // return [action.payload, ...state];
      return action.payload;
    // case GET_COMMENT_DETAILS:
    //   return action.payload;
    // return { list: [...state, action.payload] };
    default:
      return state;
  }
}
