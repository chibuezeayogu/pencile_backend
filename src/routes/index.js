import { Router } from 'express';
import pencilController from '../controllers/PencilController';

const router = Router();

router.get('/topics', pencilController.topics);
router.post('/topic', pencilController.topic);
router.get('/questions', pencilController.questions);
router.post('/question', pencilController.question);
router.get('/search', pencilController.search);

export default router;
