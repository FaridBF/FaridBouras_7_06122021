import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React, { useState } from 'react';

import Header from './Header';
import PostsList from './PostsList';
import Footer from './Footer';
import { useDispatch } from 'react-redux';
import { addPost, getPosts } from '../actions/post.actions';

/**
 * Représente la page principale avec les publications
 */
const Home = () => {
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [displayLinkInput, setDisplayLinkInput] = useState(false);
  const [postLink, setPostLink] = useState('');
  // récupérer infos de l'utilisateur depuis localstorage
  const userInfo = JSON.parse(localStorage.getItem('user_details'));
  const dispatch = useDispatch();

  /**
   * Vider les inputs et reset les affichages
   */
  const resetNewPostInputs = () => {
    setPostContent(''); // reset l'input de content
    setPostImage(null); // reset image à poster
    setPostLink(''); // reset le lien
    setDisplayLinkInput(false); // ne plus afficher l'input de lien
  };

  /**
   * Gestion du submit d'une nouvelle publication
   * @param  {} e: event
   */
  const handleSubmitPost = async (e) => {
    e.preventDefault();
    // si l'input n'est pas vide, envoyer la nvelle publication via le store
    if (postContent.length > 0) {
      // objet JS pr mettre dans un formData contenu du post
      const data = new FormData();
      data.append('user_id', userInfo.id);
      data.append('content', postContent);
      data.append('image', postImage);
      data.append('link', postLink);
      await dispatch(addPost(data));
      // rappeler de nouveau les posts via le store y compris le nouveau
      dispatch(getPosts(5));
      // reset les champs
      resetNewPostInputs();
    }
  };

  return (
    <>
      <Header />
      <Container className='main-container justify-content-center'>
        <Col xs={10} md={10} lg={10}>
          {/* Création publication */}
          <Row>
            <Card>
              <Card.Body>
                <Row className='d-flex align-items-center'>
                  <Col xs={2} md={1} lg={1}>
                    <img
                      src={userInfo.picture}
                      className='picture-profile-publication img-fluid'
                      alt="Visuel de l'utilisateur"
                    />
                  </Col>
                  <Col className='author-date-publication'>
                    <small className='publication-author'>
                      {userInfo.first_name} {userInfo.last_name}
                    </small>
                  </Col>
                </Row>
                <Row>
                  <Form onSubmit={handleSubmitPost} className='what-s-up'>
                    <FloatingLabel
                      controlId='floatingTextarea'
                      label="Quoi de neuf aujourd'hui ?"
                      className='new-publication'
                    >
                      <Form.Control
                        className='new-publication'
                        as='textarea'
                        placeholder='Entrez votre message'
                        name='email'
                        value={postContent}
                        onChange={(e) => {
                          setPostContent(e.target.value);
                        }}
                      />
                    </FloatingLabel>
                    <Button
                      variant='primary'
                      type='submit'
                      aria-describedby='Publier'
                      disabled={postContent.length === 0}
                    >
                      Publier
                    </Button>
                  </Form>
                  {/* Début affichage image à poster */}
                  {postImage !== null ? (
                    <>
                      <p>Image ajoutée : {postImage.name}</p>
                      <Button
                        className='button_danger'
                        variant='danger'
                        onClick={() => setPostImage(null)}
                      >
                        <FontAwesomeIcon icon='fa-solid fa-trash' />
                      </Button>
                    </>
                  ) : (
                    ''
                  )}
                </Row>
                {/* Fin affichage image à poster */}
                {/* Début ajout image au post */}
                <Row>
                  <label htmlFor='file-post'>
                    <FontAwesomeIcon
                      icon='fa-solid fa-image'
                      color='grey'
                      className='upload-post-image'
                    />
                  </label>
                  <input
                    id='file-post'
                    name='file'
                    type='file'
                    accept='.jpg, .jpeg, .png'
                    onChange={(e) => setPostImage(e.target.files[0])}
                  />
                </Row>
                {/* Fin ajout image au post */}
                <Row>
                  <label htmlFor='link-post'>
                    <FontAwesomeIcon
                      icon='fa-solid fa-link'
                      color='grey'
                      className='upload-post-link'
                      onClick={() => setDisplayLinkInput(!displayLinkInput)}
                    />
                  </label>
                  {displayLinkInput ? (
                    <input
                      id='link-post'
                      name='link-post'
                      type='url'
                      // pattern={'http://.*' || 'https://.*'}
                      placeholder='Exemple de lien: https://groupomania.com'
                      value={postLink}
                      onChange={(e) => setPostLink(e.target.value)}
                    />
                  ) : (
                    ''
                  )}
                </Row>
              </Card.Body>
            </Card>
          </Row>
          {/* Fin création publication */}
          <PostsList />
        </Col>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
