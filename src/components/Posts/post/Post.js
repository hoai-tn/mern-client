import React from "react";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CardActionArea,
} from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  likePost,
  deletePost,
  setPost,
  getPost,
} from "../../../store/actions/posts";
import { useHistory } from "react-router-dom";

const Post = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const onModify = () => {
    dispatch(setPost(post));
  };
  const onDelete = () => {
    dispatch(deletePost(post._id));
  };
  const onLike = () => {
    dispatch(likePost(post._id));
  };

  const isCreator = () => {
    const user = JSON.parse(localStorage.getItem("profile"));
    return (
      user?.result.googleId === post?.creator ||
      user?.result._id === post?.creator
    );
  };

  const onGetPostDetail = () => {
    dispatch(getPost(post._id));
    history.push(`/posts/${post._id}`);
  };
  return (
    <Card className={classes.card}>
      <CardActionArea onClick={onGetPostDetail}>
        <CardMedia
          className={classes.media}
          image={
            post.selectedFile ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {isCreator() && (
          <div className={classes.overlay2}>
            <Button style={{ color: "white" }} size="small" onClick={onModify}>
              <MoreHorizIcon fontSize="medium" />
            </Button>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {post.tags?.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={onLike}>
          <ThumbUpAltIcon fontSize="small" /> Like {post.likes?.length}
        </Button>
        {isCreator() && (
          <Button size="small" color="primary" onClick={onDelete}>
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
