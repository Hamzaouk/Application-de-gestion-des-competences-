const express = require('express');
const router = express.Router();
const briefController = require('../controllers/briefController');

router.post('/', briefController.createBrief);

router.get('/', briefController.getAllBriefs);

router.get('/:id', briefController.getBriefById);

router.put('/:id', briefController.updateBriefById);

router.delete('/:id', briefController.deleteBriefById);

// Associate a competence to a brief
router.post('/:id/competences', briefController.addCompetenceToBrief);

// Dissociate a competence from a brief
router.delete('/:id/competences', briefController.removeCompetenceFromBrief);

// Associate multiple competences to a brief
router.post('/:id/competences/bulk', briefController.addCompetencesToBrief);

// Assign an apprenant to a brief
router.post('/:id/apprenants', briefController.assignApprenantToBrief);

// Unassign an apprenant from a brief
router.delete('/:id/apprenants', briefController.unassignApprenantFromBrief);

module.exports = router;
