import { Router } from 'express';
const router = Router();

import {
  getUser,
  createUser,
  validateUser,
  updateUser,
  deleteUser,
  restoreUser
} from '../controllers/User.controller';

router.get('/user/:id', getUser);
router.post('/user', createUser);
router.head('/user', validateUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);
router.patch('/user/:id', restoreUser);


export default router;
