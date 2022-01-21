import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import Header from './Header';
import Footer from './Footer';
import UploadImage from './UploadImage';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Représente la page profil
 */

const Profile = () => {
  // const userData = useSelector((state) => state.userReducer);
  // récupérer infos de l'utilisateur depuis localstorage
  const userInfo = JSON.parse(localStorage.getItem('user_details'));

  // useEffect(() => {
  //   // si picture modifiée dans redux, modifier dans localstorage
  //   // const userInfoLocalStorage = JSON.parse(localStorage.getItem('user_details'));
  //   const userInfoLocalStorage = JSON.parse(localStorage['user_details']);
  //   userInfoLocalStorage.picture = userData.picture;
  //   // console.log('userInfoLocalStorage.picture', userInfoLocalStorage.picture);
  //   // console.log('nvelle image dans localstorage', userInfo.picture);
  // }, [userData]);

  return (
    <>
      <Header />
      <Container className='main-container d-flex justify-content-center'>
        <Row className='profile-container'>
          <Col className='picture-container' xs={12} md={12} lg={4}>
            <img
              src={userInfo.picture}
              className='picture-profile img-fluid'
              alt="Visuel de l'utilisateur"
            />
            <UploadImage />
          </Col>
          <Col className='text-container' xs={8} md={8} lg={8}>
            <p>
              Prénom:
              <span className='style-text-container'>
                {' '}
                {userInfo.first_name}
              </span>
            </p>
            <p>
              Nom:
              <span className='style-text-container'>
                {' '}
                {userInfo.last_name}
              </span>
            </p>
            <p>
              Email:{' '}
              <span className='style-text-container'> {userInfo.email}</span>
            </p>
            {/* Début phrase pour les utilisateurs admin */}
            {userInfo.is_admin === 1 ? (
              <p title='Un compte admin permet de modérer des comptes, publications et commentaires.'>
                <small>Vous disposez d'un compte admin </small>
                <FontAwesomeIcon icon='fa-solid fa-circle-info' />
              </p>
            ) : (
              ''
            )}
            {/* Fin phrase pour les utilisateurs admin */}
            <Button
              variant='outline-danger'
              type='submit'
              aria-describedby='Suppression'
            >
              Supprimer mon compte
            </Button>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Profile;
