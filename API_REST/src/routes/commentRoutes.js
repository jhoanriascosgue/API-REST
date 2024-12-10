import express from 'express';
import { 
  createComment, 
  getComments, 
  updateComment, 
  deleteComment 
} from '../controllers/commentController.js';
import { auth } from '../middleware/auth.js';
import { commentValidator } from '../utils/validators.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

router.post('/', auth, commentValidator, validate, createComment);
router.get('/topic/:topicId', getComments);
router.put('/:id', auth, commentValidator, validate, updateComment);
router.delete('/:id', auth, deleteComment);

export default router;