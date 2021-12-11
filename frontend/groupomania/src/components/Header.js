import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import Logo from '../assets/images/logo-groupomania.png';

/**
 * Représente le header sur toutes les pages
 */
const Header = () => {
  return (
    <Container className='header-container' fluid>
      <Row>
        <Col xs={12} md={3} lg={3}>
          <img
            src={Logo}
            className='img-fluid'
            alt='Illustration du logo de la société'
            height='180'
            width='180'
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
