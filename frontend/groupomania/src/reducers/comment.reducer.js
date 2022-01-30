/**
 * Chaque reducer est une fonction qui reçoit le state et une action en paramètre,
 * et qui retourne un nouveau state.
 */
import {
  ADD_COMMENTS,
  GET_COMMENTS,
  DELETE_COMMENT
  // GET_COMMENT_DETAILS
} from '../actions/comment.actions';

// State initialement égale à un objet vide
const initialState = {};

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_COMMENTS:
      // retourne state mis à jour (state précédent + nveau commentaire)
      return (state = [...state, action.payload]);
    case GET_COMMENTS:
      // return [action.payload, ...state];
      return action.payload;
    // case GET_COMMENT_DETAILS:
    //   return action.payload;
    // return { list: [...state, action.payload] };
    case DELETE_COMMENT:
      // retourner tous les commentaires sauf celui que l'on supprime
      return state.filter((comment) => comment.id !== action.payload.commentId);
    default:
      return state;
  }
}
