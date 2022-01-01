import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

// import SvgLoginImage from './SvgLoginImage';
import SignupImage from '../assets/images/signup.png';

/**
 * Représente la page d'inscription avec le formulaire
 */
const Signup = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Gère le submit du formulaire d'inscription
  const handleRegistration = (e) => {
    e.preventDefault();
    // checker validation formulaire
    // ...
    const data = {
      email: email,
      last_name: lastName,
      first_name: firstName,
      password: password
    };
    console.log(data);
    axios
      .post(`${process.env.REACT_APP_API_URL}api/user/signup`, data)
      .then((res) => {
        alert(res.data.message);
        console.log(res);
        // if (res.status === 201) {
        //   console.log('inscription ok');
        //   console.log(res);
        //   // et rediriger sur page login
        //   // window.location = '/login';
        // } else {
        //   // TODO: gérer les erreurs
        //   alert(res.data.error);
        // }
      })
      // erreur pendant requête axios
      .catch((err) => {
        alert();
        console.log(err);
      });
  };

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
          <Form onSubmit={handleRegistration}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Entrez votre adresse email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type='text'
                placeholder='Entrez votre Nom'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Prénom</Form.Label>
              <Form.Control
                type='text'
                placeholder='Entrez votre Prénom'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Choisissez votre mot de passe</Form.Label>
              <Form.Control
                type='password'
                placeholder='Entrez votre mot de passe'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Confirmez votre mot de passe</Form.Label>
              <Form.Control
                type='password'
                placeholder='Validez votre nouveau mot de passe'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
