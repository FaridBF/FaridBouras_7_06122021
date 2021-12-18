import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

// import SvgLoginImage from './SvgLoginImage';
import LoginImage from '../assets/images/login.png';

/**
 * Représente la page de connexion avec le formulaire
 */
const Login = () => {
  return (
    <Container className='main-container'>
      <Row className='align-items-center'>
        <Col xs={12} md={6} lg={6}>
          {/* <Image src='/assets/images/login.png' fluid /> */}
          <img
            src={LoginImage}
            className='img-fluid'
            alt='Illustration de connexion'
          />
        </Col>
        <Col xs={12} md={6} lg={6}>
          <Form>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Adresse email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Entrez votre adresse email'
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type='password'
                placeholder='Entrez votre mot de passe'
              />
            </Form.Group>
            <Button
              variant='primary'
              type='submit'
              aria-describedby='Connexion'
            >
              Se connecter
            </Button>
            <p>
              <small>Vous n'êtes pas encore inscrit ?</small>
            </p>
            <Button
              variant='outline-primary'
              aria-describedby='Création de compte'
            >
              Créer un compte
            </Button>{' '}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
