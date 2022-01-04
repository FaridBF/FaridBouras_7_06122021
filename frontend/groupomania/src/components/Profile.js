import React from 'react';
import { useSelector } from 'react-redux';
// import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import ProfilImage from '../assets/images/profile1.jpg';
import Header from './Header';
import Footer from './Footer';
import UploadImage from './UploadImage';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Représente la page profil
 */

const Profile = () => {
  const userData = useSelector((state) => state.userReducer);

  return (
    <>
      <Header />
      <Container className='main-container d-flex justify-content-center'>
        <Row className='profile-container'>
          <Col className='picture-container' xs={12} md={12} lg={4}>
            <img
              src={userData.picture}
              // src={ProfilImage}
              className='picture-profile img-fluid'
              alt="Visuel de l'utilisateur"
            />
            <UploadImage />
          </Col>
          <Col xs={8} md={8} lg={8}>
            <p>
              Prénom:
              {userData.first_name}
            </p>
            <p>Nom: {userData.last_name}</p>
            <p>Email: {userData.email}</p>
            <p>Id: {userData.id}</p>
            <div className='d-flex'>
              <InputGroup className='mb-3'>
                <FormControl
                  placeholder='Profession'
                  aria-label='Profession du profil'
                  aria-describedby='Profession du profil'
                />
                <Button variant='outline-secondary' id='button-addon2'>
                  Modifier
                </Button>
              </InputGroup>
            </div>
            <div>
              <InputGroup className='mb-3'>
                <FormControl
                  placeholder='Description'
                  aria-label='Description du profil' // nom du champs
                  aria-describedby='Description du profil' // description du champs
                />
                <Button variant='outline-secondary' id='button-addon2'>
                  Modifier
                </Button>
              </InputGroup>
            </div>
            <p>
              <small>Vous disposez d'un compte admin </small>
              <FontAwesomeIcon icon='fa-solid fa-circle-info' />
            </p>
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
