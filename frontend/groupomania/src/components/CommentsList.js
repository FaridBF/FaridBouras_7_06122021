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

  //test
  const dispatch = useDispatch(); // pr envoyer une action
  // const comments = useSelector((state) => state.commentReducer); // récupérer comments du store

  // récupérer la liste des commentaires via redux
  // const getCommentsList = (post_id) => {
  //   if (post_id) {
  //     dispatch(getComments(post_id));
  //   }
  // };

  useEffect(() => {
    /**
     * Requête à l'api pour récupérer la liste des commentaires d'une publication
     */
    const getComments = async () => {
      await axios.get(`comment/${post_id}/all`).then((res) => {
        // const data = res.data;
        // setComments((prevState) => [...prevState, ...data]);
        setComments(res.data);
      });
    };
    // getCommentsList(post_id);
    // console.log('commentsList', comments);
    getComments();
    // }, [post_id]); // a tester
  }, []); // tableau vide car on veut que cela ne se déclenche qu'à l'affichage du composant

  // Dès que comments est màj, màj GET_COMMENTS dans le store
  useEffect(() => {
    dispatch(getComments(post_id));
  }, [comments]);

  return (
    <>
      {!isEmpty(comments[0]) &&
        comments.map((comment) => {
          return <Comment comment={comment} key={comment.id} />;
        })}
    </>
  );
};

export default CommentsList;
