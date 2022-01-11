import React, { useState, useEffect } from 'react';
import axios from '../api';
import Comment from './Comment';

/**
 * Représente le composant de la liste des commentaires d'une publication
 * @param  {} props : id d'une publication
 */
const CommentsList = (props) => {
  // récupérer id de publication fourni en propriété par composant parent : Post
  const post_id = props.post_id;
  const [comments, setComments] = useState([]);

  useEffect(() => {
    /**
     * Requête à l'api pour récupérer la liste des commentaires d'une publication
     */
    const getComments = async () => {
      await axios.get(`comment/${post_id}/all`).then((res) => {
        setComments(res.data);
      });
    };
    getComments();
  }, []); // tableau vide car on veut que cela ne se déclenche qu'à l'affichage du composant

  return (
    <>
      {/* Parcourir la liste des commentaires pour afficher chaqun */}
      {comments.map((comment) => {
        return <Comment comment={comment} key={comment.id} />;
      })}
    </>
  );
};

export default CommentsList;
