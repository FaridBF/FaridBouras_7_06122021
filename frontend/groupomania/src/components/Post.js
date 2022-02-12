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
import { deletePost } from '../actions/post.actions';
import NewComment from './NewComment';
import Like from './Like';
import Dislike from './Dislike';

/**
 * Représente le composant d'une publication
 * @param  {} props: objet représentant une publication
 */
const Post = (props) => {
  const currentPost = props.post;
  const [showComments, setShowComments] = useState(false);
  // Likes
  const [totalLikes, setTotalLikes] = useState(0);
  const [likersList, setLikersList] = useState([]); // list users qui ont liké ce post
  const [liked, setLiked] = useState(false);
  // Dislikes
  const [totalDislikes, setTotalDislikes] = useState(0);
  const [dislikersList, setDislikersList] = useState([]); // list users qui ont disliké ce post
  const [disliked, setDisliked] = useState(false);
  // récupérer infos de l'utilisateur connecté (depuis localstorage)
  const userInfo = JSON.parse(localStorage.getItem('user_details'));
  const dispatch = useDispatch();
  // const likes = useSelector((state) => state.postReducer); // récupérer likes du store
  // const comments = useSelector((state) => state.commentReducer);
  const [nouveauCommentaireContenu, setNouveauCommentaireContenu] =
    useState('');

  /**
   * Vérifier si user connecté a liké ce post
   */
  const checkUserLikePost = () => {
    // si la fonction JS some() trouve une fois le user id du user connecté
    // ds la liste des likers, setter le liked à true
    if (likersList.some((e) => e.user_id === userInfo.id)) {
      setLiked(true);
    }
  };

  /**
   * Vérifier si user connecté a disliké ce post
   */
  const checkUserDislikePost = () => {
    // si la fonction JS some() trouve une fois le user id du user connecté
    // ds la liste des dislikers, setter le disliked à true
    if (dislikersList.some((e) => e.user_id === userInfo.id)) {
      setDisliked(true);
    }
  };

  /**
   * Supprime une publication
   */
  const handleDeletePost = () => {
    dispatch(deletePost(currentPost.id));
  };

  /**
   * Récupère la liste des id des users qui ont liké cette publication
   * et le total de likes de celle-ci depuis le back
   */
  const getTotalLikes = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/post/total-likes/${currentPost.id}`
      )
      .then((res) => {
        setTotalLikes(res.data.totalLikes);
        setLikersList(res.data.likersList);
      })
      .catch((err) => console.log(err));
  };

  /**
   * Récupère la liste des id des users qui ont disliké cette publication
   * et le total de dislikes de celle-ci depuis le back
   */
  const getTotalDislikes = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/post/total-dislikes/${currentPost.id}`
      )
      .then((res) => {
        setTotalDislikes(res.data.totalDislikes);
        setDislikersList(res.data.dislikersList);
      })
      .catch((err) => console.log(err));
  };

  // au chargement et quand 'liked' et/ou 'disliked' est màj
  useEffect(() => {
    getTotalLikes();
    getTotalDislikes();
  }, [liked, disliked]);

  // au chargement et quand 'likersList' est màj
  useEffect(() => {
    checkUserLikePost();
  }, [likersList]);

  // au chargement et quand 'dislikersList' est màj
  useEffect(() => {
    checkUserDislikePost();
  }, [dislikersList]);

  return (
    <>
      <Row>
        <Card>
          <Card.Body>
            <Row className='d-flex align-items-center'>
              <Col xs={3} md={3} lg={2}>
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
                    className='delete-button'
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
                    <FontAwesomeIcon
                      icon='fa-solid fa-trash'
                      aria-label='Icône supprimer'
                    />
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
                  <img
                    className='publication-image'
                    src={currentPost.image}
                    alt={currentPost.image ? 'Image de publication' : ''}
                  />
                </>
              ) : (
                ''
              )}
              {/* Fin affichage image */}
              {/* Début affichage lien */}
              {currentPost.link !== undefined || currentPost.link !== null ? (
                <>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href={currentPost.link}
                  >
                    {currentPost.link}
                  </a>
                </>
              ) : (
                ''
              )}
              {/* Fin affichage lien */}
            </Row>
            {/* Début réactions à la publication */}
            <Row className='publication-icons'>
              <Col>
                <FontAwesomeIcon
                  onClick={() => setShowComments(!showComments)}
                  className='icon_add_comment m-2'
                  icon='fa-solid fa-message'
                  // aria-label="Ajouter un commentaire"
                />
                <Like
                  post={currentPost}
                  liked={liked}
                  setLiked={setLiked}
                  setDisliked={setDisliked}
                  getTotalLikes={getTotalLikes}
                  totalLikes={totalLikes}
                />

                <Dislike
                  post={currentPost}
                  disliked={disliked}
                  setDisliked={setDisliked}
                  setLiked={setLiked}
                  getTotalDislikes={getTotalDislikes}
                  totalDislikes={totalDislikes}
                />
              </Col>
            </Row>
            {showComments ? (
              <NewComment
                post={currentPost}
                setNouveauCommentaireContenu={setNouveauCommentaireContenu}
              />
            ) : (
              ''
            )}
            <CommentsList
              post_id={currentPost.id}
              nouveauCommentaireContenu={nouveauCommentaireContenu}
            />
            {/* Fin réactions à la publication */}
          </Card.Body>
        </Card>
      </Row>
    </>
  );
};

export default Post;
