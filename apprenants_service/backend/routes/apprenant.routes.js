import express from 'express';
import {
  createApprenant,
  getAllApprenants,
  getApprenantById,
  updateApprenant,
  deleteApprenant,
  assignBrief,
  submitRendu,
  getRendusByApprenant,
} from '../controllers/apprenant.controller.js';

const router = express.Router();

// CRUD Apprenant
router.post('/', createApprenant);
router.get('/', getAllApprenants);
router.get('/:id', getApprenantById);
router.put('/:id', updateApprenant);
router.delete('/:id', deleteApprenant);

// Rendu routes
router.post('/rendu/assign', assignBrief);
router.post('/rendu/submit', submitRendu);
router.get('/rendu/:apprenantId', getRendusByApprenant);

export default router;
