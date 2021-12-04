const express = require('express');
const router = express.Router();

const controller = require('../controllers/vaccines.controler');

router.get('/', controller.getAllVaccines);
router.post('/', controller.createVaccine);
router.delete('/:id', controller.deleteVaccine);
router.put('/:id', controller.updateVaccine);
router.patch('/:id/vaccinated', controller.vaccinatedOrNot);
router.get('/:id', controller.getVaccineById);


module.exports = router;