import React from 'react';
// import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { date_options } from '../utils/date';

import { useDispatch } from 'react-redux';
import { deleteComment } from '../actions/comment.actions';

/**
 * Représente le composant d'un commentaire
 * @param {comment} props: objet représentant un commentaire
 * @param {getCommentsList} props: fonction du composant parent (CommentsList) qui appelle l'API pr récup liste commentaires
 */
const Comment = (props) => {
  // récupérer infos de l'utilisateur connecté
  const userInfo = JSON.parse(localStorage.getItem('user_details'));
  // récupérer id de commentaire fourni en propriété par composant parent : CommentsList
  const currentComment = props.comment;
  const dispatch = useDispatch(); // pr envoyer une action
  // const currentComment = useSelector((state) => state.commentReducer);

  /**
   * Supprime un commentaire
   */
  const handleDeleteComment = async () => {
    await dispatch(deleteComment(currentComment.id));
    // document.location.reload(); // TODO: remplacer cette solution de secours
    // appeler la fonction du composant parent (CommentsList) qui appelle l'API pr récup liste commentaires
    props.getCommentsList();
  };

  return (
    <>
      {currentComment ? (
        <Row>
          <Card>
            <Card.Body>
              <Row className='d-flex align-items-center'>
                {/* <Col xs={2} md={1} lg={1}> */}
                <Col className='img_mini_profil'>
                  <img
                    src={currentComment.picture}
                    className='picture-profile-comment'
                    alt='Visuel du profil'
                  />
                </Col>
                <Col className='comment-text' xs={8} md={8} lg={8}>
                  <p>
                    {currentComment.first_name} {currentComment.last_name} -
                    <span className='date-text'>
                      {new Date(currentComment.create_time).toLocaleDateString(
                        'fr-FR',
                        date_options
                      )}
                    </span>
                  </p>
                  <p className='mb-0'>{currentComment.content}</p>
                </Col>
                {/* Début suppression commentaire */}
                {userInfo.is_admin === 1 ||
                userInfo.id === currentComment.author_id ? (
                  <Col className='d-flex justify-content-end'>
                    <Button
                      className='delete-button'
                      onClick={() => {
                        // demande de confirmation avant de supprimer
                        if (
                          window.confirm(
                            'Êtes-vous certain(e) de vouloir supprimer ce commentaire ?'
                          )
                        ) {
                          handleDeleteComment();
                        }
                      }}
                    >
                      <FontAwesomeIcon
                        icon='fa-solid fa-trash'
                        aria-label='Icône supprimer'
                      />
                    </Button>
                  </Col>
                ) : (
                  ''
                )}
                {/* Fin suppression commentaire */}
              </Row>
            </Card.Body>
          </Card>
        </Row>
      ) : (
        ''
      )}
    </>
  );
};

export default Comment;
