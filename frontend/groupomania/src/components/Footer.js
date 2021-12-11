import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

/**
 * Représente le footer sur toutes les pages
 */
const Footer = () => {
  return (
    <Container className='footer-container' fluid>
      <Row>
        <Col xs={12} md={3} lg={3}>
          Footer
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
