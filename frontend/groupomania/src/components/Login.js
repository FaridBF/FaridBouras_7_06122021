import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { useDispatch } from 'react-redux';

// import SvgLoginImage from './SvgLoginImage';
import LoginImage from '../assets/images/login.png';
import axios from 'axios';
import { getUser } from '../actions/user.actions';
// import axios from '../api';

/**
 * Représente la page de connexion avec le formulaire
 */
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // hook useDispatch pour déclencher des actions
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}api/user/login`, data)
      .then((res) => {
        console.log(res);
        // si back retourne une erreur, l'afficher
        // TODO: gérer les erreurs
        if (res.status !== 200) {
          console.log(res);
          alert(res.data.error);
        } else {
          // si tt est ok, récupérer le userId du résultat de la req et
          dispatch(getUser(res.data.userId));
          // et rediriger sur page home
          // window.location = '/home';
        }
      })
      // erreur pendant requête axios
      .catch((err) => {
        console.log(err);
      });
  };

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
          <Form onSubmit={handleLogin}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Adresse email</Form.Label>
              <Form.Control
                // id='email'
                type='email'
                placeholder='Entrez votre adresse email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                // id='password'
                type='password'
                placeholder='Entrez votre mot de passe'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
