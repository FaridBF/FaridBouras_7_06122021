import React, { useState, useEffect } from 'react';
import axios from '../api';
import Comment from './Comment';

const CommentsList = (data) => {
  // récupérer id de publication fourni en propriété par composant parent : Post
  const post_id = data.post_id;
  const [comments, setComments] = useState([]);
  console.log('comments', comments);

  useEffect(() => {
    const getComments = async () => {
      await axios.get(`comment/${post_id}/all`).then((res) => {
        // console.log('RES.DATA ', res.data);
        setComments(res.data);
      });
    };
    getComments();
  }, []);
  return (
    <>
      {/* Parcourir la liste des commentaires pour afficher chaqun */}
      {comments.map((comment) => {
        return <Comment data={comment} key={comment.id} />;
      })}
    </>
  );
};

export default CommentsList;
