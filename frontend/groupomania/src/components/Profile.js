import React, { useEffect } from 'react';
import axios from 'axios';
// import { useSelector } from 'react-redux';
// import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import UploadImage from './UploadImage';
import NotLoggedIn from './NotLoggedIn';

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

  /**
   * Permet de supprimer le compte du User connecté
   */
  const deleteAccount = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}api/user/${userInfo.id}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          // vider le localstorage
          localStorage.clear();
          alert('Votre compte a été supprimé avec succès.');
          // rediriger vers la page d'inscription
          window.location = '/signup';
        }
      })
      .catch((err) => {
        alert("Impossible d'accéder au serveur");
      });
  };

  const handleDeleteAccount = () => {
    // demande de confirmation avant de supprimer
    if (
      window.confirm('Êtes-vous certain(e) de vouloir supprimer votre compte ?')
    ) {
      // si confirme, continuer et supprimer le compte
      deleteAccount();
    }
  };

  return (
    <>
      <Header />
      {userInfo ? (
        <>
          <Container className='profile-main-container'>
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
                  <span className='style-text-container'>
                    {' '}
                    {userInfo.email}
                  </span>
                </p>

                {/* Début phrase + bouton pour les utilisateurs admin */}
                {userInfo.is_admin === 1 ? (
                  <>
                    <p title='Un compte admin permet de modérer des comptes, publications et commentaires.'>
                      <small>Vous disposez d'un compte admin </small>
                      <FontAwesomeIcon icon='fa-solid fa-circle-info' />
                    </p>
                    <Link to='/admin'>
                      <Button
                        variant='outline-primary'
                        type='submit'
                        aria-label='Permet de gérer les droits administrateurs'
                      >
                        Gestion des droits admin
                      </Button>
                    </Link>
                  </>
                ) : (
                  ''
                )}
                {/* Fin phrase + bouton pour les utilisateurs admin */}

                <Button
                  className='profile-delete-button'
                  variant='outline-danger'
                  type='submit'
                  aria-label='Permet la suppression du compte'
                  onClick={handleDeleteAccount}
                >
                  Supprimer mon compte
                </Button>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <NotLoggedIn />
      )}
      <Footer />
    </>
  );
};

export default Profile;
