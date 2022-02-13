/**
 * Chaque reducer est une fonction qui reçoit le state et une action en paramètre,
 * et qui retourne un nouveau state.
 */
import { GET_USER, UPLOAD_IMAGE } from '../actions/user.actions';

// State initialement égale à un objet vide
const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      // on incrémente initial state avec la data de payload dispo pour l'ensemble des composants
      return action.payload;
    // si action est UPLOAD IMAGE, on màj l'image
    case UPLOAD_IMAGE:
      return {
        ...state,
        picture: action.payload
      };
    default:
      return state;
  }
}
