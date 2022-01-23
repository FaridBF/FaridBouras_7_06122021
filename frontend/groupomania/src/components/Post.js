import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CommentsList from './CommentsList';
import { date_options } from '../utils/date';
// import Card from 'react-bootstrap/Card';

import { deletePost, getTotalPostLikes } from '../actions/post.actions';
// import CardComments from './CardComment';

/**
 * Représente le composant d'une publication
 * @param  {} props: objet représentant une publication
 */
const Post = (props) => {
  const currentPost = props.post;
  const [totalLikes, setTotalLikes] = useState(0);
  // const [showComments, setShowComments] = useState(false);
  // récupérer infos de l'utilisateur depuis localstorage
  const userInfo = JSON.parse(localStorage.getItem('user_details'));
  const dispatch = useDispatch();
  // const likes = useSelector((state) => state.postReducer); // récupérer likes du store

  /**
   * Supprime une publication
   */
  const handleDeletePost = () => {
    dispatch(deletePost(currentPost.id));
  };

  /**
   * Récupère le total de likes de la publication depuis le store
   * TODO: à revoir
   */
  // const handleTotalPostLikes = () => {
  //   dispatch(getTotalPostLikes(currentPost.id));
  // };

  /**
   * Récupère le total de likes de la publication depuis le back
   */
  const getTotalLikes = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/post/total-likes/${currentPost.id}`
      )
      .then((res) => {
        setTotalLikes(res.data.TotalLikes);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // handleTotalPostLikes();
    getTotalLikes();
  }, []);

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
                  <a target='_blank' href={currentPost.link}>
                    {currentPost.link}
                  </a>
                </>
              ) : (
                ''
              )}
              {/* Fin affichage lien */}
            </Row>
            <Row className='publication-icons'>
              <Col>
                <FontAwesomeIcon
                  // onClick={() => setShowComments(!showComments)}
                  className='icon_add_comment m-2'
                  icon='fa-solid fa-message'
                />
                <FontAwesomeIcon
                  className='icon_thumbs_up m-2'
                  icon='fa-solid fa-thumbs-up'
                />
                <small>{totalLikes}</small>
                <FontAwesomeIcon
                  className='icon_thumbs_down m-2'
                  icon='fa-solid fa-thumbs-down'
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
