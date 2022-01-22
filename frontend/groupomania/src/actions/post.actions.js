/**
 * Chaque action décrit le type d'action et le payload (contenu des nouvelles données)
 */
import axios from 'axios';

export const GET_POSTS = 'GET_POSTS';

/**
 * action qui récupère les publications et les envoie au reducer
 * le reducer va ensuite modifier l'état actuel du store
 * @param  {num} : représente la quantité de publications à envoyer au reducer
 */
export const getPosts = (num) => {
  // dispatch : ce que l'on envoie au reducer
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/all/`)
      .then((res) => {
        const array = res.data.slice(0, num);
        dispatch({ type: GET_POSTS, payload: array });
      })
      .catch((err) => console.log(err));
  };
};

export const ADD_POSTS = 'ADD_POSTS';

/**
 * action qui crée une publication et l'envoie au reducer
 * le reducer va ensuite modifier l'état actuel du store
 * @param  {data} : représente la publication à envoyer au reducer
 */
export const addPost = (data) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/post/create`, data)
      .then((res) => {
        dispatch({ type: ADD_POSTS, payload: data });
      })
      .catch((err) => console.log(err));
  };
};

export const DELETE_POST = 'DELETE_POST';

/**
 * action qui supprime une publication et l'envoie au reducer
 * le reducer va ensuite modifier l'état actuel du store
 * @param  {postId} : représente l'id de la publication à envoyer au reducer pr màj le store
 */
export const deletePost = (postId) => {
  return (dispatch) => {
    return axios
      .delete(`${process.env.REACT_APP_API_URL}api/post/${postId}`)
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};
