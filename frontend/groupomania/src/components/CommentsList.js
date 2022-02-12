import React, { useState, useEffect } from 'react';
import axios from '../api';
import Comment from './Comment';
import { isEmpty } from '../utils/isEmpty';

/**
 * Représente le composant de la liste des commentaires d'une publication
 * @param  {} props : id d'une publication
 */
const CommentsList = (props) => {
  // récupérer id de publication fourni en propriété par composant parent : Post
  const post_id = props.post_id;
  const [comments, setComments] = useState([]);
  const nouveauCommentaireContenu = props.nouveauCommentaireContenu;

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

  // Dès que comments est màj, màj GET_COMMENTS dans le store
  useEffect(() => {
    // dispatch(getComments(post_id));
  }, [comments]);

  // Dès que nouveauCommentaireContenu est màj
  useEffect(() => {
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
