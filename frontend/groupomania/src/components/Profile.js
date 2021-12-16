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
    <Container className='main-container'>
      <Row className='profile-container'>
        <Col className='picture-container' xs={12} md={12} lg={4}>
          <img
            src={ProfilImage}
            className='picture-profile img-fluid'
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
                aria-label='Description du profil' // nom du champs
                aria-describedby='Description du profil' // description du champs
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
  );
};

export default Profile;
