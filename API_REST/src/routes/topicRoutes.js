import express from 'express';
import { 
  createTopic, 
  getTopics, 
  getTopic, 
  updateTopic, 
  deleteTopic 
} from '../controllers/topicController.js';
import { auth } from '../middleware/auth.js';
import { topicValidator } from '../utils/validators.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

router.post('/', auth, topicValidator, validate, createTopic);
router.get('/', getTopics);
router.get('/:id', getTopic);
router.put('/:id', auth, topicValidator, validate, updateTopic);
router.delete('/:id', auth, deleteTopic);

export default router;