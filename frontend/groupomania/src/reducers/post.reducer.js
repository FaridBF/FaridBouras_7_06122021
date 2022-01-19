/**
 * Chaque reducer est une fonction qui reçoit le state et une action en paramètre,
 * et qui retourne un nouveau state.
 */
import { GET_POSTS } from '../actions/post.actions';

// State initialement égale à un objet vide
const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      // on incrémente initial state avec la data de payload dispo pour l'ensemble des composants
      return action.payload;
    default:
      return state;
  }
}
