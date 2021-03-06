import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  // récupérer infos de l'utilisateur depuis localstorage
  const userInfo = JSON.parse(localStorage.getItem('user_details'));
  // récupérer chemin de l'URL en cours pour savoir sur quelle route on est côté front
  const location = useLocation();
  const currentURLPathname = location.pathname;

  const handleLogout = (e) => {
    e.preventDefault();
    axios.get(`${process.env.REACT_APP_API_URL}api/user/logout`);
    // vider le localstorage
    localStorage.clear();
    // Vider le store et faire la redirection vers page login
    window.location = `/login`;
  };

  return (
    <Container className='header-container' fluid>
      <Row>
        <Col xs={12} md={3} lg={3}>
          <Link to={userInfo ? '/home' : '/signup'}>
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
      <Row className='header_nav_bar'>
        <Col className='header_position_nav_bar' xs={12} md={3} lg={3}>
          {/* Gestion des boutons connexion/déconnexion */}
          {userInfo ? (
            <>
              <p className='header_hello_user'>
                Bienvenue, {userInfo.first_name}
              </p>
              <Link className='header_link' to='/profile'>
                <img
                  src={userInfo.picture}
                  className='picture-profile img-fluid'
                  alt="Visuel de l'utilisateur"
                />
              </Link>
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
          ) : currentURLPathname !== '/login' ? (
            // si on est ailleurs que sur login sans user connecté
            <>
              <Link
                aria-label='Lien permettant la connexion'
                alt='Illustration de connexion'
                to='/login'
              >
                <Button
                  aria-label='Connexion'
                  variant='secondary'
                  size='lg'
                  active
                >
                  <FontAwesomeIcon icon='fa-solid fa-right-to-bracket' />
                </Button>
              </Link>
            </>
          ) : (
            ''
          )}
          {/* Fin gestion des boutons connexion/déconnexion */}
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
