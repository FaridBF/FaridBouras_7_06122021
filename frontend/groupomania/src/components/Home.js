import React from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import Header from './Header';
import NewPost from './NewPost';
import PostsList from './PostsList';
import NotLoggedIn from './NotLoggedIn';
import Footer from './Footer';

/**
 * Représente la page principale avec les publications
 */
const Home = () => {
  // Utilisateur connecté
  const userInfo = JSON.parse(localStorage.getItem('user_details'));

  return (
    <>
      <Header />
      {userInfo ? (
        <>
          <Container className='main-container justify-content-center'>
            <Col xs={11} md={10} lg={6}>
              <NewPost />
              <PostsList />
            </Col>
          </Container>
        </>
      ) : (
        <NotLoggedIn />
      )}
      <Footer />
    </>
  );
};

export default Home;
