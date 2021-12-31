import Button from 'react-bootstrap/Button';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import ProfilImage from '../assets/images/profile1.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Représente la page principale avec les publications
 */
const Home = () => {
  return (
    <Container className='main-container justify-content-center'>
      <Col xs={10} md={10} lg={10}>
        {/* Création publication */}
        <Row>
          <Card>
            <Card.Body>
              <Row className='d-flex align-items-center'>
                <Col xs={2} md={1} lg={1}>
                  <img
                    src={ProfilImage}
                    className='picture-profile-publication img-fluid'
                    alt="Visuel de l'utilisateur"
                  />
                </Col>
                <Col className='author-date-publication'>
                  <small className='publication-author'>Marie Dupont</small>
                </Col>
              </Row>
              <Row>
                <FloatingLabel
                  controlId='floatingTextarea'
                  label="Quoi de neuf aujourd'hui ?"
                  // placeholder="Quoi de neuf aujourd'hui ?"
                  className='mb-2 mt-3'
                >
                  <Form.Control
                    className='new-publication'
                    as='textarea'
                    placeholder='Leave a comment here'
                  />
                </FloatingLabel>
              </Row>
            </Card.Body>
          </Card>
        </Row>
        {/* Fin création publication */}
        {/* Première publication */}
        <Row>
          <Card>
            <Card.Body>
              <Row className='d-flex align-items-center'>
                {/* <Card.Img variant='top' src='holder.js/100px180' /> */}
                <Col xs={2} md={1} lg={1}>
                  <img
                    src={ProfilImage}
                    className='picture-profile-publication img-fluid'
                    alt="Visuel de l'utilisateur"
                  />
                </Col>
                <Col className='author-date-publication'>
                  <small className='publication-author'>Julie Leroy</small>
                  <small className='publication-date'>12 Décembre 2021</small>
                </Col>
              </Row>
              <Row className='publication-content'>
                <Card.Text>Hey vous avez vu cet article ?</Card.Text>
              </Row>
              <Row className='publication-icons'>
                <Col>
                  <FontAwesomeIcon
                    className='icon_thumbs'
                    color='blue'
                    icon='fa-solid fa-thumbs-up'
                  />
                  <FontAwesomeIcon color='blue' icon='fa-solid fa-message' />
                </Col>
              </Row>
              {/* Commentaires */}
              <Row className='d-flex align-items-center'>
                <Col xs={2} md={1} lg={1}>
                  <img
                    src={ProfilImage}
                    className='picture-profile-comment img-fluid'
                    alt="Visuel de l'utilisateur"
                  />
                </Col>
                <Col className='comment-text' xs={8} md={8} lg={8}>
                  <p className='mb-0'>C'est génial !</p>
                </Col>
                <Col>
                  <Button className='button_danger' variant='danger'>
                    <FontAwesomeIcon icon='fa-solid fa-trash' />
                  </Button>
                </Col>
              </Row>
              {/* Fin commentaires */}
              {/* Commentaire à écrire */}
              <Row>
                <FloatingLabel
                  controlId='floatingTextarea'
                  label="Quoi de neuf aujourd'hui ?"
                  // placeholder="Quoi de neuf aujourd'hui ?"
                  className='mb-2 mt-3'
                >
                  <Form.Control
                    className='new-publication'
                    as='textarea'
                    placeholder='Leave a comment here'
                  />
                </FloatingLabel>
              </Row>
              {/* Fin commentaire à écrire */}
            </Card.Body>
          </Card>
        </Row>
        {/* Fin Première publication */}
      </Col>
    </Container>
  );
};

export default Home;
