import React, { useState, useRef, useEffect } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { useDispatch } from 'react-redux';

import { addComment } from '../../store/actions/posts';
import useStyles from './styles';

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const classes = useStyles();
  const commentsRef = useRef();

  useEffect(() => {
    setComments(post?.comments);
  }, [post]);
  const handleComment = async () => {
    try {
      const newComments = await dispatch(addComment(post._id, comment, user.result.name));
      if (newComments.length) {
        setComment('');
        setComments(newComments);
        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.name} : </strong>
              {c.comment}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        <div style={{ width: '70%' }}>
          <Typography gutterBottom variant="h6">
            Write a comment
          </Typography>
          <TextField
            fullWidth
            minRows={4}
            variant="outlined"
            label="Comment"
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <br />
          <Button
            style={{ marginTop: '10px' }}
            fullWidth
            disabled={!comment.length}
            color="primary"
            variant="contained"
            onClick={handleComment}
          >
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
