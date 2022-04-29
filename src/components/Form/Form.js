import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, modifyPost } from "../../store/actions/posts";
const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: ""
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const formPost = useSelector((state) => state.posts.postForm);
  useEffect(() => {
    if (Object.keys(formPost).length)
      setPostData({
        ...formPost,
        tags: formPost.tags.join()
      });
  }, [formPost]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formatPost = { ...postData, tags: postData.tags.split(",") };
    if (postData._id) {
      dispatch(modifyPost({ ...formatPost, name: user?.result?.name }));
    } else {
      dispatch(createPost({ ...formatPost, name: user?.result?.name }));
    }
    // clear();
  };
  const clear = () => {
    setPostData({
      _id: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: ""
    });
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }
  return (
    <Paper className={classes.paper}>
      <form
        spacing={1}
        autoComplete="off"
        noValidate
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {postData._id ? "Modify" : "Create"} a Memory
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          margin="dense"
          value={postData.title}
          fullWidth
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />{" "}
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          margin="dense"
          value={postData.message}
          fullWidth
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          value={postData.tags}
          fullWidth
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
