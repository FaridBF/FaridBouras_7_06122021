import React, { useState, useEffect } from 'react';
import axios from '../api';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Représente le composant d'un commentaire
 * @param  {} props: objet représentant un commentaire
 */
const Comment = (props) => {
  // récupérer id de commentaire fourni en propriété par composant parent : CommentsList
  const currentCommentId = props.comment.id;
  const [currentComment, setCurrentComment] = useState();

  useEffect(() => {
    /**
     * Requête à l'api pour récupérer un commentaire par son id et des infos de l'auteur
     */
    const getCommentById = async () => {
      await axios.get(`comment/${currentCommentId}`).then((res) => {
        setCurrentComment(res.data);
      });
    };
    getCommentById();
  }, []); // tableau vide car on veut que cela ne se déclenche qu'à l'affichage du composant

  return (
    <>
      {/* Première publication */}
      <Row>
        <Card>
          <Card.Body>
            {/* Commentaire */}
            {currentComment ? (
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
                    {currentComment.create_time}
                  </p>
                  <p className='mb-0'>{currentComment.content}</p>
                </Col>
                <Col>
                  <Button className='button_danger' variant='danger'>
                    <FontAwesomeIcon icon='fa-solid fa-trash' />
                  </Button>
                </Col>
              </Row>
            ) : (
              ''
            )}
            {/* Fin commentaire */}
            {/* Commentaire à écrire */}
            <Row>
              <FloatingLabel
                controlId='floatingTextarea'
                label='Entrez votre commentaire'
                className='mb-2 mt-3'
              >
                <Form.Control
                  className='new-publication'
                  as='textarea'
                  placeholder='Leave a comment here'
                />
              </FloatingLabel>
            </Row>
            {/* Fin commentaire à écrire */}
          </Card.Body>
        </Card>
      </Row>
      {/* Fin Première publication */}
    </>
  );
};

export default Comment;
