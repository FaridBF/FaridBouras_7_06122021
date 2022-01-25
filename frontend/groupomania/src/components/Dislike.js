import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Représente le 'dislike' d'un post
 * @param  {dislikersList} props: liste des id des utilisateurs qui ont disliké ce post
 */
const Dislike = (props) => {
  const [disliked, setDisliked] = useState(false);
  const dislikersList = props.dislikersList;
  const userInfo = JSON.parse(localStorage.getItem('user_details'));

  useEffect(() => {
    // vérifier si user connecté a disliké ce post
    dislikersList.map((user) => {
      if (user.user_id === userInfo.id) {
        setDisliked(true);
      }
    });
  });
  return (
    <>
      <FontAwesomeIcon
        // couleur en fonction de si le post est disliké ou non par le user connecté
        className={
          disliked ? 'icon_thumbs_down_disliked m-2' : 'icon_thumbs_down m-2'
        }
        icon='fa-solid fa-thumbs-down'
      />
    </>
  );
};

export default Dislike;
