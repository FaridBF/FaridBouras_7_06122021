import React from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import Header from './Header';
import NewPost from './NewPost';
import PostsList from './PostsList';
import Footer from './Footer';

/**
 * Représente la page principale avec les publications
 */
const Home = () => {
  return (
    <>
      <Header />
      <Container className='main-container justify-content-center'>
        <Col xs={10} md={10} lg={10}>
          <NewPost />
          <PostsList />
        </Col>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
