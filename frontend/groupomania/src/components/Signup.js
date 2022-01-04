import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import Header from './Header';
import Footer from './Footer';
import SignupImage from '../assets/images/signup.png';

import { Formik } from 'formik';
import { validate } from '../Validations/SignupValidation';
/**
 * Représente la page d'inscription avec le formulaire
 */

const Signup = () => {
  // Gère le submit du formulaire d'inscription
  const handleRegistration = (values, actions) => {
    // checker validation formulaire
    const data = {
      email: values.email,
      last_name: values.lastName,
      first_name: values.firstName,
      password: values.password
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}api/user/signup`, data)
      .then((res) => {
        // empêcher la multiple soumission du form
        actions.setSubmitting(false);
        if (res.status === 201) {
          console.log(res);
          alert(res.data.message);
          // et rediriger sur page login
          window.location = '/login';
        } else {
          // TODO: gérer les erreurs
          alert(res.data.error);
        }
      })
      // erreur pendant requête axios
      .catch((err) => {
        alert("Impossible d'accéder au serveur");
        console.log(err);
      });
    // empêcher la multiple soumission du form et le vider
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <>
      <Header />
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
            <Formik
              onSubmit={handleRegistration}
              initialValues={{
                email: '',
                lastName: '',
                firstName: '',
                password: '',
                confirmPassword: ''
              }}
              validationSchema={validate}
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
                  {/* <Form onSubmit={handleRegistration}> */}
                  <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>Email</Form.Label>
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
                  <Form.Group className='mb-3'>
                    <Form.Label>Nom</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Entrez votre Nom'
                      name='lastName'
                      value={values.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {errors.lastName && touched.lastName && (
                      <div className='text-danger'>{errors.lastName}</div>
                    )}
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Entrez votre Prénom'
                      name='firstName'
                      value={values.firstName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {errors.firstName && touched.firstName && (
                      <div className='text-danger'>{errors.firstName}</div>
                    )}
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <Form.Label>Choisissez votre mot de passe</Form.Label>
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
                  <Form.Group className='mb-3'>
                    <Form.Label>Confirmez votre mot de passe</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='Validez votre nouveau mot de passe'
                      name='confirmPassword'
                      value={values.confirmPassword}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <div className='text-danger'>
                        {errors.confirmPassword}
                      </div>
                    )}
                  </Form.Group>
                  <p>
                    <small>
                      Vous avez déjà un compte ?{' '}
                      <a href='/login'>Connectez-vous !</a>
                    </small>
                  </p>
                  <Button
                    variant='primary'
                    type='submit'
                    aria-describedby='Connexion'
                    disabled={
                      !values.email ||
                      errors.email ||
                      !values.firstName ||
                      errors.firstName ||
                      !values.lastName ||
                      errors.lastName ||
                      !values.password ||
                      errors.password ||
                      !values.confirmPassword ||
                      errors.confirmPassword ||
                      isSubmitting
                    }
                  >
                    S'inscrire
                  </Button>
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

export default Signup;
