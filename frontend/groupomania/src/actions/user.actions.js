/**
 * Chaque action décrit le type d'action et le payload (contenu des nouvelles données)
 */
import axios from 'axios';

export const GET_USER = 'GET_USER';

/**
 * action qui récupère les données du USER et les envoie au reducer
 * le reducer va ensuite modifier l'état actuel du store
 * @param  {userId} : représente l'id de l'utilisateur
 */
export const getUser = (userId) => {
  // dispatch : ce que l'on envoie au reducer
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`)
      .then((res) => {
        // on indique au reducer que l'action GET_USER contiendra cette data
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
