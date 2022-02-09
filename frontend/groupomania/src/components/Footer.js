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
  // function handleClick(e) {
  //   e.preventDefault();
  //   console.log('Le lien a été cliqué.');
  // }
  return (
    <Container className='footer-container' fluid>
      <Row className='footer-style'>
        <Col xs={12} md={12} lg={12} className='footer-position'>
          <div className='logo-footer-position'>
            <a
              aria-label='Lien permettant de se connecter à Facebook'
              target='_blank'
              href='https://www.facebook.com/'
            >
              <FontAwesomeIcon
                aria-label='Icône pour se connecter à Facebook'
                icon={['fab', 'facebook']}
                className='footer-icon'
              />
            </a>
            <a
              aria-label='Lien permettant de se connecter à Twitter'
              target='_blank'
              href='https://twitter.com/home'
            >
              <FontAwesomeIcon
                aria-label='Icône permettant de se connecter à Twitter'
                icon={['fab', 'twitter']}
                className='footer-icon'
              />
            </a>
            <a
              aria-label='Lien permettant de se connecter à Youtube'
              target='_blank'
              href='https://www.youtube.com/'
            >
              <FontAwesomeIcon
                aria-label='Icône permettant de se connecter à Youtube'
                icon={['fab', 'youtube']}
                className='footer-icon'
              />
            </a>
            <a
              aria-label='Lien permettant de se connecter à Github'
              target='_blank'
              href='https://github.com/FaridBF/FaridBouras_7_06122021'
            >
              <FontAwesomeIcon
                aria-label='Icône permettant de se connecter à Github'
                icon={['fab', 'github']}
                className='footer-icon'
              />
            </a>
          </div>
          <div>
            <ul className='total-link-footer'>
              <a className='link-footer' href='http://localhost:3001/signup'>
                <li>À propos</li>
              </a>
              <a className='link-footer' href='http://localhost:3001/signup'>
                <li>Confidentialité</li>
              </a>
              <a className='link-footer' href='http://localhost:3001/signup'>
                <li>Conditions générales</li>
              </a>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
