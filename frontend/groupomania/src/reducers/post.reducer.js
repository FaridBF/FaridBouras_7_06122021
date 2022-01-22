/**
 * Chaque reducer est une fonction qui reçoit le state et une action en paramètre,
 * et qui retourne un nouveau state.
 */
import { ADD_POSTS, GET_POSTS, DELETE_POST } from '../actions/post.actions';

// State initialement égale à un objet vide
const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      // on incrémente initial state avec la data de payload dispo pour l'ensemble des composants
      return action.payload;
    // la gestion du addpost
    case ADD_POSTS:
      // récupération de l'ensemble des données du state
      return [action.payload, ...state];
    case DELETE_POST:
      // retourner tous les posts sauf celui que l'on supprime
      return state.filter((post) => post.id !== action.payload.postId);
    default:
      return state;
  }
}
