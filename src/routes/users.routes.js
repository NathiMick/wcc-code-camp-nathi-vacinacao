const express = require('express');
const router = express.Router();

const controller = require('../controllers/users.controller');

router.get('/', controller.getAllUsers);
router.post('/newUser', controller.createUser);
router.delete('/deleteUser/:id', controller.deleteUser);
router.put('/updateUser/:id',controller.updateUser);
router.patch('/updateUser/includeUserVaccines/:id',controller.includeUserVaccines);
router.delete('/updateUser/excludeUserVaccines/:id',controller.excludeUserVaccines);
router.get('/:id', controller.getUserById);



module.exports = router;