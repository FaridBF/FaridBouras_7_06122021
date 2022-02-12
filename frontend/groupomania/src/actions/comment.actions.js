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

export const GET_COMMENTS = 'GET_COMMENTS';

/**
 * action qui récupère les commentaires et les envoie au reducer
 * le reducer va ensuite modifier l'état actuel du store
 * @param  {} : représente ... à envoyer au reducer
 */
export const getComments = (postId) => {
  // export const getComments = (data) => {
  // dispatch : ce que l'on envoie au reducer
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/comment/${postId}/all`)
      .then((res) => {
        const array = res.data;
        console.log('getComments actions', res.data);
        dispatch({ type: GET_COMMENTS, payload: array });
      })
      .catch((err) => console.log(err));
  };
};

export const DELETE_COMMENT = 'DELETE_COMMENT';

/**
 * action qui supprime un commentaire et l'envoie au reducer
 * le reducer va ensuite modifier l'état actuel du store
 * @param  {postId} : représente l'id du commentaire à envoyer au reducer pr màj le store
 */
export const deleteComment = (commentId) => {
  return (dispatch) => {
    return axios
      .delete(`${process.env.REACT_APP_API_URL}api/comment/${commentId}`)
      .then((res) => {
        dispatch({ type: DELETE_COMMENT, payload: { commentId } });
      })
      .catch((err) => console.log(err));
  };
};
