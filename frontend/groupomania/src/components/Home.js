import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

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
  const [newPost, setNewPost] = useState('');
  // récupérer infos de l'utilisateur depuis localstorage
  const userInfo = JSON.parse(localStorage.getItem('user_details'));
  const dispatch = useDispatch();

  /**
   * Gestion du submit d'une nouvelle publication
   * @param  {} e: event
   */
  const handleSubmitPost = async (e) => {
    e.preventDefault();
    // si l'input n'est pas vide, envoyer la nvelle publication via le store
    if (newPost.length > 0) {
      const data = {
        content: newPost,
        user_id: userInfo.id
      };
      await dispatch(addPost(data));
      setNewPost(''); // reset l'input
      // rappeler de nouveau les posts via le store y compris le nouveau
      dispatch(getPosts(5));
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
                        value={newPost}
                        onChange={(e) => {
                          setNewPost(e.target.value);
                        }}
                      />
                    </FloatingLabel>
                    <Button
                      variant='primary'
                      type='submit'
                      aria-describedby='Publier'
                      disabled={newPost.length === 0}
                    >
                      Publier
                    </Button>
                  </Form>
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
