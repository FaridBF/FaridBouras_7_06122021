import React, { useState, useEffect } from 'react';
import axios from '../api';
import Comment from './Comment';
import { isEmpty } from '../utils/isEmpty';

import { useDispatch, useSelector } from 'react-redux';
import { getComments } from '../actions/comment.actions';
/**
 * Représente le composant de la liste des commentaires d'une publication
 * @param  {} props : id d'une publication
 */
const CommentsList = (props) => {
  // récupérer id de publication fourni en propriété par composant parent : Post
  const post_id = props.post_id;
  const [comments, setComments] = useState([]);
  // const [nouveauCommentaireContenu, setNouveauCommentaireContenu] =
  //   useState('');
  const nouveauCommentaireContenu = props.nouveauCommentaireContenu;
  // const userInfo = JSON.parse(localStorage.getItem('user_details'));

  // récupérer la liste des commentaires via redux
  // const getCommentsList = (post_id) => {
  //   if (post_id) {
  //     dispatch(getComments(post_id));
  //   }
  // };

  /**
   * Requête à l'api pour récupérer la liste des commentaires d'une publication
   */
  const getCommentsList = async () => {
    await axios.get(`comment/${post_id}/all`).then((res) => {
      // const data = res.data;
      // setComments((prevState) => [...prevState, ...data]);
      setComments(res.data);
    });
  };

  // au chargement du composant
  // useEffect(() => {
  //   // récupérer liste des commentaires du back (API)
  //   getCommentsList();
  // }, []); // tableau vide car on veut que cela ne se déclenche qu'à l'affichage du composant

  // Dès que comments est màj, màj GET_COMMENTS dans le store
  useEffect(() => {
    // dispatch(getComments(post_id));
  }, [comments]);

  // Dès que nouveauCommentaireContenu est màj
  useEffect(() => {
    // addCommentaire();
    // getComments();
    // récupérer liste des commentaires du back (API)
    getCommentsList();
    console.log('récupération commentaires');
  }, [nouveauCommentaireContenu]);

  return (
    <>
      {!isEmpty(comments[0]) &&
        comments.map((comment) => {
          return (
            <Comment
              comment={comment}
              key={comment.id}
              getCommentsList={getCommentsList}
            />
          );
        })}
    </>
  );
};

export default CommentsList;
