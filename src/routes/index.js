import { Router } from 'express';
import pencilController from '../controllers/PencilController';

const router = Router();

router.get('/topics', pencilController.topics);
router.get('/questions', pencilController.questions);
router.get('/search', pencilController.search);

export default router;
