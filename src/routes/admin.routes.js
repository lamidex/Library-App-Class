import express from 'express';
import { adminLogin, adminSignUp, updateAdmin } from '../controllers/admin.controller.js';
const router = express.Router();

router.post('/admin-signup', adminSignUp);
router.post('/admin-login', adminLogin);
router.put('/update-admin-role', updateAdmin);



export default router