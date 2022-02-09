import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

/**
 * Représente le like d'un post
 * @param  {likersList} props: liste des id des utilisateurs qui ont liké ce post
 */
const Like = (props) => {
  const liked = props.liked;
  const totalLikes = props.totalLikes;
  const userInfo = JSON.parse(localStorage.getItem('user_details'));
  const currentPost = props.post;

  /**
   * Changer opinion en like
   */
  const changeOpinion = () => {
    // indique à Post (composant parent) que user connecté a liké ce post
    props.setLiked(true);
    // et que dislike ne doit plus être rouge si c'était le cas
    props.setDisliked(false);
  };

  /**
   * Ajouter like
   */
  const addLike = () => {
    const data = {
      user_id: userInfo.id,
      post_id: currentPost.id,
      type: 1
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/post/opinion/${currentPost.id}`,
        data
      )
      .then((res) => {
        // si ok
        if (res.status === 201) {
          changeOpinion();
        }
      })
      .catch((err) => console.log(err));
  };

  /**
   * Retirer like
   */
  const unLike = () => {
    const data = {
      user_id: userInfo.id,
      post_id: currentPost.id,
      type: 0
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/post/opinion/${currentPost.id}`,
        data
      )
      .then((res) => {
        // si ok
        if (res.status === 200) {
          // raffraichir les likes en appelant la fonction du composant parent (Post)
          props.setLiked(false);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <FontAwesomeIcon
        // couleur en fonction de si le post est liké ou non par le user connecté
        className={liked ? 'icon_thumbs_up_liked m-2' : 'icon_thumbs_up m-2'}
        icon='fa-solid fa-thumbs-up'
        onClick={() => (liked ? unLike() : addLike())}
      />
      <small className='total-opinion'>{totalLikes}</small>
    </>
  );
};

export default Like;
