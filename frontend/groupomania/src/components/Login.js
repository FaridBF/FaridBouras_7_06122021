import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Header from './Header';
import Footer from './Footer';

import { getUser } from '../actions/user.actions';

import LoginImage from '../assets/images/login.png';
import { Link } from 'react-router-dom';

import { Formik } from 'formik';
import { validateLogin } from '../Validations/LoginValidation';

/**
 * Représente la page de connexion avec le formulaire
 */
const Login = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // hook useDispatch pour déclencher des actions
  const dispatch = useDispatch();

  // Gère le submit du formulaire de connexion
  const handleLogin = (values, actions) => {
    const data = {
      email: values.email,
      password: values.password
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}api/user/login`, data)
      .then((res) => {
        actions.setSubmitting(false);
        if (res.status === 200) {
          // si tt est ok, récupérer le userId du résultat de la req et
          dispatch(getUser(res.data.userId));
          alert('Vous êtes connecté(e) !');
          // redirection vers la page 'home'
          window.location = '/home';
        } else if (res.status === 204) {
          alert('Email incorrect !');
        }
      })
      // erreur pendant requête axios
      .catch((err) => {
        if (err.response.status === 401) {
          alert('Mot de passe incorrect !');
        } else {
          alert('Un problème est survenu.');
        }
      });
    // empêcher la multiple soumission du form et le vider
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <>
      <Header />
      <Container className='main-container-login'>
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
            <Formik
              onSubmit={handleLogin}
              initialValues={{
                email: '',
                password: ''
              }}
              validationSchema={validateLogin}
            >
              {({
                values,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                errors,
                touched
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>Adresse email</Form.Label>
                    <Form.Control
                      type='email'
                      placeholder='Entrez votre adresse email'
                      name='email'
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {errors.email && touched.email && (
                      <div className='text-danger'>{errors.email}</div>
                    )}
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='Entrez votre mot de passe'
                      name='password'
                      value={values.password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {errors.password && touched.password && (
                      <div className='text-danger'>{errors.password}</div>
                    )}
                  </Form.Group>
                  <Button
                    variant='primary'
                    type='submit'
                    aria-label='Permet de se connecter'
                    disabled={
                      !values.email ||
                      errors.email ||
                      !values.password ||
                      errors.password ||
                      isSubmitting
                    }
                  >
                    Se connecter
                  </Button>
                  <p>
                    <small>Vous n'êtes pas encore inscrit ?</small>
                  </p>
                  <Link to='/signup'>
                    <Button
                      variant='outline-primary'
                      aria-label='Permet de créer un compte'
                    >
                      Créer un compte
                    </Button>
                  </Link>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Login;
