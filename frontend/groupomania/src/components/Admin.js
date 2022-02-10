import React, { useState } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';

import Form from 'react-bootstrap/Form';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import Header from './Header';
import Footer from './Footer';

import { Formik } from 'formik';
import { validate } from '../Validations/AdminValidation';

const Admin = () => {
  // Utilisateur connecté
  const userInfo = JSON.parse(localStorage.getItem('user_details'));
  // Utilisateur trouvé
  const [userFound, setUserFound] = useState({});
  // Boolean qui gère l'affichage de l'utilisateur trouvé
  const [showUserFound, setShowUserFound] = useState(false);

  /**
   * Requête au back pour récupérer user email avec ses droits grâce à l'email
   */
  const getUserByEmail = async (values, actions) => {
    // vider l'affichage de l'ancien au cas où il y avait déjà un utilisateur recherché
    setShowUserFound(false);
    await axios
      .post(`${process.env.REACT_APP_API_URL}api/user/admin-rights`, {
        email: values.emailInput // email recherché ds input
      })
      .then((res) => {
        actions.setSubmitting(false);
        if (res.status === 200) {
          // Récupération des infos de l'utilisateur trouvé
          setUserFound(res.data);
          setShowUserFound(true);
        } else if (res.status === 204) {
          console.log(res);
          alert(
            'Aucun utilisateur trouvé avec cette adresse email. Veuillez réessayer.'
          );
        }
      })
      .catch((err) => {
        alert("Impossible d'accéder au serveur");
      });
    actions.setSubmitting(false);
    actions.resetForm();
  };

  /**
   * Remettre la recherche à zéro pour une nouvelle recherche d'utilisateur
   */
  const resetResearch = () => {
    setUserFound({});
    setShowUserFound(false);
  };

  /**
   * Requête au back pour changer les droits 'admin' d'un user
   * - envoyer au back un objet 'userToChangeRights' représentant le user que l'on veut modifier (id, email, is_admin)
   * @param  {} e
   */
  const setAdminRights = async (e) => {
    e.preventDefault();
    // récupérer depuis le radio button sélectionné représente droit admin (0 ou 1)
    const adminRights = e.target.elements.adminRights.value;
    const userToChangeRights = {
      id: userFound.id,
      email: userFound.email,
      is_admin: adminRights
    };
    // envoie de la requête back pr changer droits
    await axios
      .put(
        `${process.env.REACT_APP_API_URL}api/user/${userInfo.id}/admin-rights`,
        userToChangeRights
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert('Une erreur est survenue.');
      });
    // Vider les champs et la recherche
    resetResearch();
  };

  return (
    <>
      <Header />
      {userInfo ? (
        <Container className='position-admin-container'>
          <Row className='admin-container'>
            <h1 className='style-admin-h1'>Gestion des droits utilisateurs</h1>
            {/* TODO: améliorer */}
            <p className='style-admin-p'>
              Recherchez l'utilisateur via son adresse email pour lequel vous
              souhaitez modifier les droits administrateur.
            </p>
            <Formik
              onSubmit={getUserByEmail}
              initialValues={{
                emailInput: ''
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
                <InputGroup className='mb-3'>
                  <Form className='admin-search-form' onSubmit={handleSubmit}>
                    <Col>
                      <FormControl
                        placeholder='Entrez une adresse email'
                        aria-label='Entrez une adresse email'
                        type='email'
                        name='emailInput'
                        value={values.emailInput}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {/* Début affichage erreurs input recherche */}
                      {errors.emailInput && touched.emailInput && (
                        <div className='text-danger'>{errors.emailInput}</div>
                      )}
                      {/* Fin affichage erreurs input recherche */}
                    </Col>
                    <Col>
                      <Button
                        variant='secondary'
                        id='button-addon2'
                        disabled={
                          !values.emailInput ||
                          errors.emailInput ||
                          isSubmitting
                        }
                        onClick={handleSubmit}
                      >
                        Rechercher
                      </Button>
                    </Col>
                  </Form>
                </InputGroup>
              )}
            </Formik>

            {showUserFound ? (
              <>
                {/* Affichage résultat de la recherche */}
                <p className='checkbox-admin'>
                  Gérer les droits administrateur pour l'utilisateur suivant :
                  <span className='style-text-container'>
                    {' '}
                    {userFound.email}
                  </span>
                </p>
                <Form onSubmit={setAdminRights}>
                  <Form.Check
                    inline
                    type='radio'
                    className='checkbox-admin'
                    label='activé'
                    id='rights-activé'
                    name='adminRights'
                    value={1}
                    defaultChecked={userFound.is_admin === 1}
                  />
                  <Form.Check
                    inline
                    type='radio'
                    className='checkbox-admin'
                    label='désactivé'
                    id='rights-désactivé'
                    name='adminRights'
                    value={0}
                    defaultChecked={userFound.is_admin === 0}
                  />
                  <Button
                    variant='outline-primary'
                    id='button-addon2'
                    type='submit'
                  >
                    Valider
                  </Button>
                </Form>
                {/* Fin affichage résultat de la recherche */}
              </>
            ) : (
              ''
            )}
          </Row>
        </Container>
      ) : (
        <Container className='notlogged-access-container'>
          <Row className='notlogged-container'>
            <p>
              Il est nécéssaire de disposer d'un compte 'admin' afin de pouvoir
              accéder à cette page.
            </p>
          </Row>
        </Container>
      )}
      <Footer />
    </>
  );
};

export default Admin;
