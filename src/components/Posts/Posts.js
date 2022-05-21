import React, { useEffect } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Post from './post/Post';
import useStyles from './styles';
import { getPosts } from '../../store/actions/posts';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Posts = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  const query = useQuery();
  const page = query.get('page') || 1;

  useEffect(() => {
    dispatch(getPosts(page));
  }, [dispatch]);

  return !posts?.length ? (
    <CircularProgress aria-busy={true} />
  ) : (
    <Grid className={classes.container} container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid key={post._id} item md={6} sm={12} lg={3}>
          <Post post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
