import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

// import SvgLoginImage from './SvgLoginImage';
import SignupImage from '../assets/images/signup.png';

/**
 * Représente la page de connexion avec le formulaire
 */
const Signup = () => {
  return (
    <Container className='main-container-signup'>
      <Row className='align-items-center'>
        <Col xs={12} md={6} lg={6}>
          {/* <Image src='/assets/images/signup.png' fluid /> */}
          <img
            src={SignupImage}
            className='img-fluid'
            alt='Illustration de connexion'
          />
        </Col>
        <Col xs={12} md={6} lg={6}>
          <Form>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Entrez votre adresse email'
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Nom</Form.Label>
              <Form.Control type='name' placeholder='Entrez votre Nom' />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Prénom</Form.Label>
              <Form.Control type='name' placeholder='Entrez votre Prénom' />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Choisissez votre mot de passe</Form.Label>
              <Form.Control
                type='password'
                placeholder='Entrez votre mot de passe'
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Confirmez votre mot de passe</Form.Label>
              <Form.Control
                type='password'
                placeholder='Validez votre nouveau mot de passe'
              />
            </Form.Group>
            <p>
              <small>Vous avez déjà un compte ? Connectez-vous !</small>
            </p>
            <Button
              variant='primary'
              type='submit'
              aria-describedby='Connexion'
            >
              S'inscrire
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
