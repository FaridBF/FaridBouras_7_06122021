import React, { useState, useEffect } from 'react';
import axios from '../api';
import Post from './Post';

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  console.log('posts', posts);

  useEffect(() => {
    const getPosts = async () => {
      await axios.get('post/all').then((res) => {
        console.log('RES.DATA ', res.data);
        setPosts(res.data);
      });
    };
    getPosts();
  }, []);
  return (
    <>
      {/* Parcourir la liste des publications pour afficher chaqune */}
      {posts.map((post) => {
        return <Post data={post} key={post.id} />;
      })}
    </>
  );
};

export default PostsList;
