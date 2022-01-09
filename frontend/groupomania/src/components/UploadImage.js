import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../actions/user.actions';

/**
 * Représente le changement de l'image de profil
 */

const UploadImage = () => {
  const [image, setImage] = useState();
  console.log(image);
  const dispatch = useDispatch(); // déclencher action
  const userData = useSelector((state) => state.userReducer);

  const handleImage = (e) => {
    e.preventDefault();
    console.log('handleimage');
    console.log('image', image);
    const data = new FormData(); // objet JS pr mettre dans un package image + infos
    data.append('userId', userData.id);
    // OK console.log('userData.id', userData.id);
    // data.append('file', userData.file);
    // data.append('file', image);
    data.append('image', image);
    console.log('imageToSend', image);
    console.log('dataToSend', data);
    // déclencher action du store
    dispatch(uploadImage(data, userData.id));
  };

  return (
    <form onSubmit={handleImage}>
      <label htmlFor='file'>Envie de changer d'image ?</label>
      <input
        id='file'
        name='file'
        type='file'
        accept='.jpg, .jpeg, .png'
        // value={image}
        // onChange={(e) => {
        //   e.preventDefault();
        //   setImage(fileInput.current.files[0].name);
        // }}
        // onChange={(e) => {
        //   e.preventDefault();
        //   console.log(e.target.files[0].name);
        //   setImage(e.target.files[0].name);
        // }}
        // onChange={onImageChange}
        onChange={(e) => setImage(e.target.files[0])}
      />
      {/* Afficher bouton validation uniquement si une nvelle image choisie */}
      {image ? (
        <Button
          variant='primary'
          type='submit'
          aria-describedby='Envoyer nouvelle photo'
          className='col-lg-5'
        >
          Valider
        </Button>
      ) : (
        ''
      )}
    </form>
  );
};

export default UploadImage;
