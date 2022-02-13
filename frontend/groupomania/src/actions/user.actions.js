/**
 * Chaque action décrit le type d'action et le payload (contenu des nouvelles données)
 */
import axios from 'axios';

export const GET_USER = 'GET_USER';
export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';

/**
 * action qui récupère les données du USER, les enregistrer dans le localstorage et les envoie au reducer
 * le reducer va ensuite modifier l'état actuel du store
 * @param  {userId} : représente l'id de l'utilisateur
 */
export const getUser = (userId) => {
  // dispatch : ce que l'on envoie au reducer
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`)
      .then((res) => {
        // enregistrer les infos du user dans le localstorage pour conserver données
        localStorage.setItem(
          'user_details',
          JSON.stringify({
            id: res.data.id,
            email: res.data.email,
            is_admin: res.data.is_admin,
            first_name: res.data.first_name,
            last_name: res.data.last_name,
            picture: res.data.picture,
            create_time: res.data.create_time,
            update_time: res.data.update_time
          })
        );
        // on indique au reducer que l'action GET_USER contiendra cette data
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

/**
 * Changer image de profil
 * @param  {} data : image
 * @param  {} id: id de l'utilisateur
 */
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
            // récupérer infos user du localstorage actuel
            const userInfoLocalStorage = JSON.parse(
              localStorage.getItem('user_details')
            );
            // màj de l'image du localstorage
            localStorage.setItem(
              'user_details',
              JSON.stringify({
                ...userInfoLocalStorage,
                picture: res.data.picture
              })
            );
            window.location.reload();
          });
      })
      .catch((err) => console.log(err));
  };
};
