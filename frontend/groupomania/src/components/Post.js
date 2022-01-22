import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CommentsList from './CommentsList';
import { date_options } from '../utils/date';
// import Card from 'react-bootstrap/Card';

import { deletePost } from '../actions/post.actions';
// import CardComments from './CardComment';

/**
 * Représente le composant d'une publication
 * @param  {} props: objet représentant une publication
 */
const Post = (props) => {
  const currentPost = props.post;
  // const [showComments, setShowComments] = useState(false);
  // récupérer infos de l'utilisateur depuis localstorage
  const userInfo = JSON.parse(localStorage.getItem('user_details'));
  const dispatch = useDispatch();

  /**
   * Supprime une publication
   */
  const handleDeletePost = () => {
    dispatch(deletePost(currentPost.id));
  };

  return (
    <>
      <Row>
        <Card>
          <Card.Body>
            <Row className='d-flex align-items-center'>
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
              {/* Début suppression publication */}
              {userInfo.is_admin === 1 ||
              userInfo.id === currentPost.user_id ? (
                <Col className='d-flex justify-content-end'>
                  <Button
                    className='button_danger'
                    variant='danger'
                    onClick={() => {
                      // demande de confirmation avant de supprimer
                      if (
                        window.confirm(
                          'Êtes-vous certain(e) de vouloir supprimer cette publication ?'
                        )
                      ) {
                        handleDeletePost();
                      }
                    }}
                  >
                    <FontAwesomeIcon icon='fa-solid fa-trash' />
                  </Button>
                </Col>
              ) : (
                ''
              )}
              {/* Fin suppression publication */}
            </Row>
            <Row className='publication-content'>
              <Card.Text>{currentPost.content}</Card.Text>
              {/* Début affichage image */}
              {currentPost.image !== undefined || currentPost.image !== null ? (
                <>
                  <img className='publication-image' src={currentPost.image} />
                </>
              ) : (
                ''
              )}
              {/* Fin affichage image */}
              {/* Début affichage lien */}
              {currentPost.link != undefined || currentPost.link != null ? (
                <>
                  <Link to={currentPost.link}>{currentPost.link}</Link>
                </>
              ) : (
                ''
              )}
              {/* Fin affichage lien */}
            </Row>
            <Row className='publication-icons'>
              <Col>
                <FontAwesomeIcon
                  className='icon_thumbs'
                  color='blue'
                  icon='fa-solid fa-thumbs-up'
                />
                <FontAwesomeIcon
                  // onClick={() => setShowComments(!showComments)}
                  color='blue'
                  icon='fa-solid fa-message'
                />
              </Col>
            </Row>
            <CommentsList post_id={currentPost.id} />
          </Card.Body>
        </Card>
      </Row>
      {/* {showComments && <CardComments post={Post} />} */}
    </>
  );
};

export default Post;
