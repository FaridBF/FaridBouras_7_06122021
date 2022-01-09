/**
 * Chaque action décrit le type d'action et le payload (contenu des nouvelles données)
 */
import axios from 'axios';

export const GET_USER = 'GET_USER';
export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';

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
        // console.log(res);
        // on indique au reducer que l'action GET_USER contiendra cette data
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const uploadImage = (data, id) => {
  // dispatch : ce que l'on envoie au reducer
  return (dispatch) => {
    // appeler la req de changement d'image à l'api du back
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/user/upload/${id}`, data)
      .then((res) => {
        // chercher infos du chemin de la nouvelle image pr changer dans store
        return axios
          .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
          .then((res) => {
            // console.log('nouvelle img', res);
            dispatch({ type: UPLOAD_IMAGE, payload: res.data.picture });
          });
      })
      .catch((err) => console.log(err));
  };
};
