import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CommentsList from './CommentsList';
import { date_options } from '../utils/date';

/**
 * Représente le composant d'une publication
 * @param  {} props: objet représentant une publication
 */
const Post = (props) => {
  const currentPost = props.post;

  return (
    <>
      {/* Première publication */}
      <Row>
        <Card>
          <Card.Body>
            <Row className='d-flex align-items-center'>
              {/* <Card.Img variant='top' src='holder.js/100px180' /> */}
              <Col xs={2} md={1} lg={1}>
                <img
                  src={currentPost.picture}
                  className='picture-profile-publication img-fluid'
                  alt="Visuel de l'utilisateur"
                />
              </Col>
              <Col className='author-date-publication'>
                <small className='publication-author'>
                  {`${currentPost.first_name} ${currentPost.last_name}`}
                </small>
                <small className='publication-date'>
                  {new Date(currentPost.create_time).toLocaleDateString(
                    'fr-FR',
                    date_options
                  )}
                </small>
              </Col>
            </Row>
            <Row className='publication-content'>
              <Card.Text>{currentPost.content}</Card.Text>
            </Row>
            <Row className='publication-icons'>
              <Col>
                <FontAwesomeIcon
                  className='icon_thumbs'
                  color='blue'
                  icon='fa-solid fa-thumbs-up'
                />
                <FontAwesomeIcon color='blue' icon='fa-solid fa-message' />
              </Col>
            </Row>
            <CommentsList post_id={currentPost.id} />
          </Card.Body>
        </Card>
      </Row>
      {/* Fin Première publication */}
    </>
  );
};

export default Post;
