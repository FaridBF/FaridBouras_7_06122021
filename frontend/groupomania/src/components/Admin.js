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

const Admin = () => {
  // Utilisateur connecté
  const userInfo = JSON.parse(localStorage.getItem('user_details'));
  // Email recherché
  const [emailInput, setEmailInput] = useState('');
  // Utilisateur trouvé
  const [userFound, setUserFound] = useState({});
  // Boolean qui gère l'affichage de l'utilisateur trouvé
  const [showUserFound, setShowUserFound] = useState(false);

  /**
   * Requête au back pour récupérer user par email avec ses droits
   */
  const getUserByEmail = async () => {
    // vider l'affichage de l'ancien au cas où il y avait déjà un utilisateur recherché
    setShowUserFound(false);
    await axios
      .post(`${process.env.REACT_APP_API_URL}api/user/admin-rights`, {
        email: emailInput
      })
      .then((res) => {
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
  };

  /**
   * Remettre la recherche à zéro pour une nouvelle recherche d'utilisateur
   */
  const resetResearch = () => {
    setEmailInput('');
    setUserFound({});
    setShowUserFound(false);
  };

  // TODO: commenter
  const setAdminRights = async (e) => {
    e.preventDefault();
    const adminRights = e.target.elements.adminRights.value;
    const userToChangeRights = {
      id: userFound.id,
      email: userFound.email,
      is_admin: adminRights
    };
    console.log(userToChangeRights);
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
      <Container>
        <Row className='admin-container'>
          <h1>Gestion des droits utilisateurs</h1>
          {/* TODO: améliorer */}
          <p>Phrase explicative............</p>
          <InputGroup className='mb-3'>
            <FormControl
              placeholder='Entrez une adresse email'
              aria-label='Entrez une adresse email'
              aria-describedby='Entrez une adresse email'
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
            <Button
              variant='secondary'
              id='button-addon2'
              onClick={getUserByEmail}
            >
              Rechercher
            </Button>
          </InputGroup>
          {showUserFound ? (
            <>
              {/* Affichage résultat de la recherche */}
              <p>
                Gérer les droits 'admin' pour cet utilisateur :{' '}
                {userFound.email}
              </p>
              <Form onSubmit={setAdminRights}>
                <Form.Check
                  inline
                  type='radio'
                  label='activé'
                  id='rights-activé'
                  name='adminRights'
                  value={1}
                  defaultChecked={userFound.is_admin === 1}
                />
                <Form.Check
                  inline
                  type='radio'
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
      <Footer />
    </>
  );
};

export default Admin;
