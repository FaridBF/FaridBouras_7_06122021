import React, { useState, useEffect } from 'react';
// import axios from '../api';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { date_options } from '../utils/date';

import { useDispatch, useSelector } from 'react-redux';
import {
  getComments,
  getCommentDetails,
  deleteComment
} from '../actions/comment.actions';

/**
 * Représente le composant d'un commentaire
 * @param  {} props: objet représentant un commentaire
 */
const Comment = (props) => {
  // récupérer infos de l'utilisateur connecté
  const userInfo = JSON.parse(localStorage.getItem('user_details'));
  // récupérer id de commentaire fourni en propriété par composant parent : CommentsList
  // const [currentComment, setCurrentComment] = useState({});
  const currentComment = props.comment;
  const dispatch = useDispatch(); // pr envoyer une action
  // const currentComment = useSelector((state) => state.commentReducer);

  /**
   * Requête à l'api pour récupérer un commentaire par son id et des infos de l'auteur
   */
  // const getCommentById = () => {
  //   await axios
  //     .get(`${process.env.REACT_APP_API_URL}api/comment/${currentCommentId}`)
  //     .then((res) => {
  //       setCurrentComment(res.data);
  //     });
  //
  // dispatch(getCommentDetails(currentCommentId));
  // };

  // useEffect(() => {
  // getCommentById();
  // }, []); // tableau vide car on veut que cela ne se déclenche qu'à l'affichage du composant

  /**
   * Supprime un commentaire
   */
  // const handleDeleteComment = async () => {
  //   await dispatch(deleteComment(currentComment.id));
  //   document.location.reload(); // TODO: remplacer cette solution de secours
  // };
  const handleDeleteComment = () => {
    dispatch(deleteComment(currentComment.id));
    document.location.reload(); // TODO: remplacer cette solution de secours
    // dispatch(getComments(currentComment.post_id));
  };

  return (
    <>
      {currentComment ? (
        <Row>
          <Card>
            <Card.Body>
              <Row className='d-flex align-items-center'>
                <Col xs={2} md={1} lg={1}>
                  <img
                    src={currentComment.picture}
                    className='picture-profile-comment img-fluid'
                    alt="Visuel de l'utilisateur"
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
                      className='button_danger'
                      variant='danger'
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
                      <FontAwesomeIcon icon='fa-solid fa-trash' />
                    </Button>
                  </Col>
                ) : (
                  ''
                )}
                {/* Fin suppression commentaire */}
                {/* <Col>
                  <Button className='button_danger' variant='danger'>
                    <FontAwesomeIcon icon='fa-solid fa-trash' />
                  </Button>
                </Col> */}
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
