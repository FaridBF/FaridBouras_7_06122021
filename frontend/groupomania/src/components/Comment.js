import React, { useState, useEffect } from 'react';
import axios from '../api';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfilImage from '../assets/images/profile1.jpg';

const Comment = (comment) => {
  const currentCommentId = comment.data.id;
  console.log('commentId: ', currentCommentId);
  const [currentComment, setCurrentComment] = useState();
  // récupérer id de commentaire fourni en propriété par composant parent : CommentsList

  useEffect(() => {
    const getCommentById = async () => {
      await axios.get(`comment/${currentCommentId}`).then((res) => {
        console.log('RES.DATA du commentaire ', res.data);
        setCurrentComment(res.data);
      });
    };
    getCommentById();
  }, []);
  return (
    <>
      {/* Première publication */}
      <Row>
        <Card>
          <Card.Body>
            {/* Commentaires */}
            <Row className='d-flex align-items-center'>
              <Col xs={2} md={1} lg={1}>
                {/* <img
                  src={currentComment.picture}
                  className='picture-profile-comment img-fluid'
                  alt="Visuel de l'utilisateur"
                /> */}
              </Col>
              <Col className='comment-text' xs={8} md={8} lg={8}>
                {/* <p>
                  {currentComment.first_name} {currentComment.last_name} -{' '}
                  {currentComment.create_time}
                </p>
                <p className='mb-0'>{currentComment.content}</p> */}
              </Col>
              <Col>
                <Button className='button_danger' variant='danger'>
                  <FontAwesomeIcon icon='fa-solid fa-trash' />
                </Button>
              </Col>
            </Row>
            {/* Fin commentaires */}
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
