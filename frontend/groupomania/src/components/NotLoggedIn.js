import React from 'react';
// import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

const NotLoggedIn = () => {
  return (
    <Container className='notlogged-access-container'>
      <Row className='notlogged-container'>
        <p>Connectez-vous pour accéder à cette page.</p>
        {/* <Link to='/login'>Me connecter</Link> */}
      </Row>
    </Container>
  );
};

export default NotLoggedIn;
