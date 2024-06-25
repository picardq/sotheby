import express from 'express';
import fs from 'fs';
import multer from 'multer';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { registerValidation, loginValidation, postCreateValidation, subscribeValidation } from './validations.js';
import { handleValidationErrors, checkAuth } from './utils/index.js';
import { UserController, PostController, EmailController } from './controllers/index.js';

dotenv.config();

mongoose
  .connect('mongodb+srv://yevheniiedu:1111@cluster0.z1qapr6.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Database connected'))
  .catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1); 
  });

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post('/subscribe', subscribeValidation, EmailController.subscribe);

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get('/tags', PostController.getLastTags);

app.get('/posts', PostController.getAll);
app.get('/posts/tags', PostController.getLastTags);
app.get('/posts/:id', PostController.getOne);
app.get('/posts/tag/:tag', PostController.getPostsByTag); // New route for getting posts by tag
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch(
  '/posts/:id',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update,
);

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
