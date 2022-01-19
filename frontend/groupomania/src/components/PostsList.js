import React, { useState, useEffect } from 'react';
import Post from './Post';
import { isEmpty } from '../utils/isEmpty';

import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/post.actions';

/**
 * Représente le composant de la liste des publications
 */
const PostsList = () => {
  const [loadPost, setLoadPost] = useState(true); // charger les posts ?
  const [count, setCount] = useState(5);
  const dispatch = useDispatch(); // pr envoyer une action
  const posts = useSelector((state) => state.postReducer); // récupérer posts du store

  const loadMore = () => {
    // si on est en bas de page au scroll
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      // relancer le chargement des posts
      setLoadPost(true);
    }
  };

  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts(count));
      // arrêter de lancer le chargement des posts
      setLoadPost(false);
      // incrémenter de 5 pour afficher les 5 posts suivants
      setCount(count + 5);
    }
    // si on scroll vers le bas, appeler fonction 'loadMore'
    window.addEventListener('scroll', loadMore);
    return () => window.removeEventListener('scroll', loadMore);
  }, [loadPost, dispatch]); // dès que loadPost change, exécuter useEffect de nouveau

  return (
    <>
      {!isEmpty(posts[0]) &&
        posts.map((post, index) => {
          return <Post post={post} key={index} />;
        })}
    </>
  );
};

export default PostsList;
