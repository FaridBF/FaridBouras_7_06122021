import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Représente le like d'un post
 * @param  {likersList} props: liste des id des utilisateurs qui ont liké ce post
 */
const Like = (props) => {
  const [liked, setLiked] = useState(false);
  const likersList = props.likersList;
  const userInfo = JSON.parse(localStorage.getItem('user_details'));

  useEffect(() => {
    // vérifier si user connecté a liké ce post
    likersList.map((user) => {
      if (user.user_id === userInfo.id) {
        setLiked(true);
      }
    });
  });
  return (
    <>
      <FontAwesomeIcon
        // couleur en fonction de si le post est liké ou non par le user connecté
        className={liked ? 'icon_thumbs_up_liked m-2' : 'icon_thumbs_up m-2'}
        icon='fa-solid fa-thumbs-up'
      />
    </>
  );
};

export default Like;
