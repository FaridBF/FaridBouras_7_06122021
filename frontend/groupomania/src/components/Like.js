import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

/**
 * Représente le like d'un post
 * @param  {likersList} props: liste des id des utilisateurs qui ont liké ce post
 */
const Like = (props) => {
  // const [liked, setLiked] = useState(false);
  const liked = props.liked;
  const totalLikes = props.totalLikes;
  // const likersList = props.likersList;
  const userInfo = JSON.parse(localStorage.getItem('user_details'));
  const currentPost = props.post;

  /**
   * Vérifier si user connecté a liké ce post
   */
  // const checkUserLikePost = () => {
  //   console.log(`liked? before check: ${liked} - post: ${currentPost.id}`);
  //   console.log(likersList);
  //   likersList.map((user) => {
  //     if (user.user_id === userInfo.id) {
  //       setLiked(true);
  //     } else {
  //       setLiked(false);
  //     }
  //   });
  //   // console.log(`liked? after check: ${liked} - post: ${currentPost.id}`);
  // };

  /**
   * Ajouter like
   */
  const addLike = () => {
    // await checkUserLikePost();
    const data = {
      user_id: userInfo.id,
      post_id: currentPost.id,
      type: 1
      // type: liked ? 0 : 1
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/post/opinion/${currentPost.id}`,
        data
      )
      .then((res) => {
        // si ok
        if (res.status === 201) {
          props.setLiked(true);
          // raffraichir les likes en appelant la fonction du composant parent (Post)
          // props.getTotalLikes();
          // checkUserLikePost();
        }
      })
      .catch((err) => console.log(err));
  };

  /**
   * Retirer like
   */
  const unLike = () => {
    // await checkUserLikePost();
    const data = {
      user_id: userInfo.id,
      post_id: currentPost.id,
      type: 0
      // type: liked ? 0 : 1
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
          // checkUserLikePost();
          // props.getTotalLikes();
        }
      })
      .catch((err) => console.log(err));
  };

  // au chargement du composant
  // useEffect(() => {
  //   // vérifier si user connecté a liké ce post au chargement du composant
  //   checkUserLikePost();
  //   // props.getTotalLikes();
  //   console.log('LIKEEED', liked);
  // }, []);

  // dès que 'liked' change de valeur
  // useEffect(() => {
  //   // raffraichir les likes en appelant la fonction du composant parent (Post)
  //   props.getTotalLikes();
  // }, [liked]);

  return (
    <>
      <FontAwesomeIcon
        // couleur en fonction de si le post est liké ou non par le user connecté
        className={liked ? 'icon_thumbs_up_liked m-2' : 'icon_thumbs_up m-2'}
        icon='fa-solid fa-thumbs-up'
        onClick={() => (liked ? unLike() : addLike())}
      />
      <small>{totalLikes}</small>
    </>
  );
};

export default Like;