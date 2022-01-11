import React, { useState, useEffect } from 'react';
import axios from '../api';
import Post from './Post';

/**
 * Représente le composant de la liste des publications
 */
const PostsList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    /**
     * Requête à l'api pour récupérer la liste des publications et infos des auteurs
     */
    const getPosts = async () => {
      await axios.get('post/all').then((res) => {
        setPosts(res.data);
      });
    };
    getPosts();
  }, []);

  return (
    <>
      {/* Parcourir la liste des publications pour afficher chaqune en la passant dans les propriétés (props) du composant Post */}
      {posts.map((post) => {
        return <Post post={post} key={post.id} />;
      })}
    </>
  );
};

export default PostsList;
