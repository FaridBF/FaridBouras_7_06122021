import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

/**
 * Représente le 'dislike' d'un post
 * @param {dislikersList} props: liste des id des utilisateurs qui ont disliké ce post
 * @param {disliked} props: boolean pour savoir si user connecté a disliké ce post
 * @param {totalDislikes} props: nombre total de dislike à ce post
 */
const Dislike = (props) => {
  const disliked = props.disliked;
  const totalDislikes = props.totalDislikes;
  const currentPost = props.post;
  const userInfo = JSON.parse(localStorage.getItem('user_details'));

  /**
   * Changer opinion en dislike
   */
  const changeOpinion = () => {
    // indique à Post (composant parent) que user connecté a disliké ce post
    props.setDisliked(true);
    // et que like ne doit plus être bleu si c'était le cas
    props.setLiked(false);
  };

  /**
   * Ajouter dislike
   */
  const addDisLike = async () => {
    const data = {
      user_id: userInfo.id,
      post_id: currentPost.id,
      type: -1
    };
    await axios
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
   * Retirer dislike
   */
  const unDislike = async () => {
    const data = {
      user_id: userInfo.id,
      post_id: currentPost.id,
      type: 0
    };
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}api/post/opinion/${currentPost.id}`,
        data
      )
      .then((res) => {
        // si ok
        if (res.status === 200) {
          // indiqué à Post (composant parent) que user connecté ne dislike plus ce post
          props.setDisliked(false);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <FontAwesomeIcon
        // couleur en fonction de si le post est disliké ou non par le user connecté
        className={
          disliked ? 'icon_thumbs_down_disliked m-2' : 'icon_thumbs_down m-2'
        }
        icon='fa-solid fa-thumbs-down'
        // si user a déjà disliké ce post, appeler unDislike(), sinon, appeler addDislike()
        onClick={() => (disliked ? unDislike() : addDisLike())}
      />
      <small className='total-opinion'>{totalDislikes}</small>
    </>
  );
};

export default Dislike;
