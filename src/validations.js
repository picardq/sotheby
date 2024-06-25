import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Invalid email format').isEmail(),
  body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
];

export const registerValidation = [
  body('email', 'Invalid email format').isEmail(),
  body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
  body('fullName', 'Please provide your full name').isLength({ min: 3 }),
  body('avatarUrl', 'Invalid avatar URL').optional().isURL(),
];

export const postCreateValidation = [
  body('title', 'Enter article title').isLength({ min: 3 }).isString(),
  body('text', 'Enter article text').isLength({ min: 3 }).isString(),
  body('tags', 'Invalid tags format').optional().isString(),
  body('imageUrl', 'Invalid image URL').optional().isString(),
];

export const subscribeValidation = [
  body('email', 'Invalid email format').isEmail(),
];