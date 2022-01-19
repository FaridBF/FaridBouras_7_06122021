import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fab);

/**
 * Représente le footer sur toutes les pages
 */

const Footer = () => {
  function handleClick(e) {
    e.preventDefault();
    console.log('Le lien a été cliqué.');
  }
  return (
    <Container className='footer-container' fluid>
      <Row className='footer-style'>
        <Col xs={12} md={3} lg={3} className='footer-position'>
          Développé par Bouras Farid - Openclassrooms
          <a
            onClick={handleClick}
            href='https://github.com/FaridBF/FaridBouras_7_06122021'
          >
            <FontAwesomeIcon icon={['fab', 'github']} className='footer-icon' />
          </a>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
