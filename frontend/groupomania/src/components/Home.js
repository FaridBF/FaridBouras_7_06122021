import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import React, { useState, useEffect } from 'react';

import Header from './Header';
import PostsList from './PostsList';
import Footer from './Footer';
import ProfilImage from '../assets/images/profile1.jpg';
import axios from '../api';

/**
 * Représente la page principale avec les publications
 */
const Home = () => {
  const [newPost, setNewPost] = useState('');

  const handleSubmitPost = (e) => {
    e.preventDefault();
    console.log('newPost: ', newPost);
    // posts.append(newPost)
    // console.log("newPostsList: ", posts)
  };

  // useEffect(() => {
  //   const getPost = async () => {
  //     await axios.get('post/17').then((res) => {
  //       console.log('RES.DATA ', res.data);
  //       setPosts(res.data[0]);
  //       console.log(posts);
  //     });
  //   };
  //   getPost();
  // }, []);
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
                      src={ProfilImage}
                      className='picture-profile-publication img-fluid'
                      alt="Visuel de l'utilisateur"
                    />
                  </Col>
                  <Col className='author-date-publication'>
                    <small className='publication-author'>Marie Dupont</small>
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
                      aria-describedby='Connexion'
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
