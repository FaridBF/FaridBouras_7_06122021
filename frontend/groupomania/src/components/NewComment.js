import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { addComment } from '../actions/comment.action';

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
      // objet représentant un commentaire
      const data = {
        user_id: userInfo.id,
        content: commentContent,
        post_id: props.post.id
      };
      await dispatch(addComment(data));
      // resetNewCommentInputs();
      setCommentContent(''); // reset l'input de content
    }
  };

  return (
    <>
      <Row>
        <Card>
          <Card.Body>
            <Row className='d-flex align-items-center'>
              <Form onSubmit={handleSubmitComment}>
                <FloatingLabel
                  controlId='floatingTextarea'
                  label='Entrez votre commentaire'
                  className='mb-2 mt-3 d-flex'
                >
                  <Form.Control
                    className='new-publication'
                    as='textarea'
                    placeholder='Leave a comment here'
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
                </FloatingLabel>
              </Form>
            </Row>
          </Card.Body>
        </Card>
      </Row>
    </>
  );
};

export default NewComment;
