import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { uploadImage } from '../actions/user.actions';

/**
 * Représente le changement de l'image de profil
 */

const UploadImage = () => {
  const [image, setImage] = useState();
  const dispatch = useDispatch(); // déclencher action
  const userData = JSON.parse(localStorage.getItem('user_details'));

  const handleImage = (e) => {
    e.preventDefault();
    const data = new FormData(); // objet JS pr mettre dans un package image + infos
    data.append('userId', userData.id);
    data.append('image', image);
    // déclencher action du store
    dispatch(uploadImage(data, userData.id));
  };

  return (
    <form className='style-form-profile' onSubmit={handleImage}>
      <label htmlFor='file'>Changer de photo de profil</label>
      <input
        id='file'
        name='file'
        type='file'
        accept='.jpg, .jpeg, .png'
        onChange={(e) => setImage(e.target.files[0])}
      />
      {/* Afficher bouton validation uniquement si une nouvelle image choisie */}
      {image ? (
        <Button
          variant='primary'
          type='submit'
          aria-describedby='Envoyer nouvelle photo'
          className='col-lg-5'
        >
          Valider votre nouvelle photo
        </Button>
      ) : (
        ''
      )}
    </form>
  );
};

export default UploadImage;
