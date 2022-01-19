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
