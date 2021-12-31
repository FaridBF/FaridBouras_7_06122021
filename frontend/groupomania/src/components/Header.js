import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import Logo from '../assets/images/logo-groupomania.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Représente le header sur toutes les pages
 */
const Header = () => {
  const userIsConnected = true;
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
      <Row>
        <Col xs={12} md={3} lg={3}>
          {/* Gestion des boutons connexion/déconnexion */}
          {userIsConnected === true ? (
            <Button
              className='button_connexion'
              variant='primary'
              size='lg'
              active
            >
              <FontAwesomeIcon
                className='icon_connexion'
                icon='fa-solid fa-right-from-bracket'
              />
            </Button>
          ) : (
            <Button variant='secondary' size='lg' active>
              Connexion
            </Button>
          )}
          {/* Fin gestion des boutons connexion/déconnexion */}
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
