import { Router } from 'express';
import { SignIn } from '../controllers/auth.js';

const router = Router();
router.post('/login', SignIn)
export default router;
