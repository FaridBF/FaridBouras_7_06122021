import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

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
  // récupère (state) infos user depuis Store
  const userData = useSelector((state) => state.userReducer);
  const handleLogout = (e) => {
    e.preventDefault();
    axios.get(`${process.env.REACT_APP_API_URL}api/user/logout`);
    // Vider le store et faire la redirection vers page login
    window.location = `/login`;
  };
  return (
    <Container className='header-container' fluid>
      <Row>
        <Col xs={12} md={3} lg={3}>
          <Link to='/home'>
            <img
              src={Logo}
              className='img-fluid'
              alt='Illustration du logo de la société'
              height='180'
              width='180'
            />
          </Link>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={3} lg={3}>
          {/* Gestion des boutons connexion/déconnexion */}
          {userData.first_name !== undefined ? (
            <>
              <p>Hello, {userData.first_name}</p>
              {/* TODO: ajouter icone profil */}
              <Link to='/profile'>Profil</Link>
              <Button
                onClick={handleLogout}
                className='button_connexion'
                aria-label='Déconnexion'
                variant='primary'
                size='lg'
                active
              >
                <FontAwesomeIcon
                  className='icon_connexion'
                  icon='fa-solid fa-right-from-bracket'
                />
              </Button>
            </>
          ) : (
            <Link to='/login'>
              <Button
                aria-label='Connexion'
                variant='secondary'
                size='lg'
                active
              >
                Connexion
              </Button>
            </Link>
          )}
          {/* Fin gestion des boutons connexion/déconnexion */}
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
