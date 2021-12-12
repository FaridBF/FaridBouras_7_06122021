import React from 'react';
// import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import ProfilImage from '../assets/images/profile1.jpg';

/**
 * Représente la page profil
 */

const Profile = () => {
  return (
    <div className='main-container'>
      <Container className='profile-container'>
        <Row>
          <Col className='picture-container' xs={12} md={12} lg={4}>
            <img
              src={ProfilImage}
              className='img-fluid rounded-circle'
              alt="Visuel de l'utilisateur"
            />
            <Button
              variant='primary'
              type='submit'
              aria-describedby='Connexion'
              className='col-lg-5'
            >
              Modifier ma photo
            </Button>
          </Col>
          <Col xs={8} md={8} lg={8}>
            <p>Nom Prénom</p>
            <p>Email</p>
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
                  aria-label='Description du profil'
                  aria-describedby='Description du profil'
                />
                <Button variant='outline-secondary' id='button-addon2'>
                  Modifier
                </Button>
              </InputGroup>
            </div>
            <p>
              <small>Vous disposez d'un compte admin</small>
              <p>icône d'information à coller près d'admin</p>
            </p>
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <Col xs={2} md={3} lg={4}>
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
    </div>
  );
};

export default Profile;
