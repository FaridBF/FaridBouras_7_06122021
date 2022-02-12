import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

import { addComment } from '../actions/comment.actions';

/**
 * Représente le formulaire d'un nouveau commentaire
 * @param  {props}: objet représentant une publication
 */
const NewComment = (props) => {
  // récupérer id de commentaire fourni en propriété par composant parent : CommentsList
  const [commentContent, setCommentContent] = useState('');
  const userInfo = JSON.parse(localStorage.getItem('user_details'));
  const dispatch = useDispatch();

  /**
   * Gestion du submit d'un nouveau commentaire
   * @param  {e}: event
   */
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (commentContent.length > 0) {
      // objet représentant un nouveau commentaire
      const data = {
        user_id: userInfo.id,
        content: commentContent,
        post_id: props.post.id,
        // facultatif
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        picture: userInfo.picture
      };

      // ajouter commentaire via redux
      await dispatch(addComment(data));
      // ensuite, envoyer nouveau commentaire au composant parent (Post)
      props.setNouveauCommentaireContenu(commentContent);
      setCommentContent(''); // vider input
    }
  };

  return (
    <>
      <Row>
        <Card>
          <Card.Body>
            <Row className='d-flex align-items-center'>
              <Form onSubmit={handleSubmitComment}>
                <Form.Control
                  className='new-publication-comment'
                  as='textarea'
                  placeholder='Un commentaire à laisser ?'
                  value={commentContent}
                  onChange={(e) => {
                    setCommentContent(e.target.value);
                  }}
                />
                <Button
                  variant='primary'
                  type='submit'
                  aria-describedby='Publier'
                  disabled={commentContent.length === 0}
                >
                  Publier
                </Button>
              </Form>
            </Row>
          </Card.Body>
        </Card>
      </Row>
    </>
  );
};

export default NewComment;
