import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { selectIsAuth } from '../../redux/slices/auth';
import { useSelector } from 'react-redux';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import axios from '../../axios';
import styles from './AddPost.module.scss';

export const AddPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);

  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');

  const inputFileRef = React.useRef(null);

  const isEditing = Boolean(id);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert('File upload error');
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      const fields = {
        imageUrl,
        title,
        text,
        tags
      };
      const { data } = isEditing 
      ? await axios.patch(`/posts/${id}`, fields) 
      : await axios.post('/posts', fields);

      const postId = isEditing ? id : data._id;

      navigate(`/posts/${postId}`);
      
    } catch (err) {
      console.warn(err);
      alert('Error creating post');
    }
  };

  React.useEffect(() => {
    if (id) {
     axios
     .get(`/posts/${id}`)
     .then(({data}) => {
      setTitle(data.title);
      setText(data.text);
      setImageUrl(data.imageUrl);
      setTags(data.tags.join(','));
     })
     .catch(err => {
      console.warn(err);
      alert("Error when receiving an article");
     });
    }
  }, [id]);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Enter text...',
      status: false,
      uniqueId: 'my-editor',
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/News" />;
  }

  return (
    <div className={styles.container}>
      <Paper className={styles.paper}>
        <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
          Upload Preview
        </Button>
        <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
        {imageUrl && (
          <>
            <Button variant="contained" color="error" onClick={onClickRemoveImage}>
              Remove
            </Button>
            <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
          </>
        )}
        <br />
        <br />
        <TextField
          classes={{ root: styles.title }}
          variant="standard"
          placeholder="Article Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          classes={{ root: styles.tags }}
          variant="standard"
          placeholder="Tags"
          fullWidth
        />
        <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
        <div className={styles.buttons}>
          <Button onClick={onSubmit} size="large" variant="contained">
            {isEditing ? 'Save' : 'Post'}
          </Button>
          <a href="/">
            <Button size="large">Cancel</Button>
          </a>
        </div>
      </Paper>
    </div>
  );
};
