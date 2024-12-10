import { body } from 'express-validator';

export const registerValidator = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters'),
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

export const topicValidator = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
  body('content')
    .trim()
    .isLength({ min: 20 })
    .withMessage('Content must be at least 20 characters long'),
  body('tags')
    .isArray()
    .withMessage('Tags must be an array')
];

export const commentValidator = [
  body('content')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Comment must be at least 5 characters long')
];