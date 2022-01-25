/**
 * Chaque action décrit le type d'action et le payload (contenu des nouvelles données)
 */
import axios from 'axios';

export const ADD_COMMENTS = 'ADD_COMMENTS';

/**
 * action qui crée un commentaire et l'envoie au reducer
 * le reducer va ensuite modifier l'état actuel du store
 * @param  {data} : représente le commentaire à envoyer au reducer
 */
export const addComment = (data) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/comment/create`, data)
      .then((res) => {
        dispatch({ type: ADD_COMMENTS, payload: data });
      })
      .catch((err) => console.log(err));
  };
};
