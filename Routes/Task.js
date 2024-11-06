
const express = require('express');
const router = express.Router();


const { CreateTask, DeleteTask, GetTask, UpdateTask ,GetTaskbyid} = require('../Controler/Task');

const { Verifyauthtoken, Verifyrefreshtoken } = require('../Midlewares/VerifyAuth');



router.post('/CreateTask', Verifyauthtoken, Verifyrefreshtoken, CreateTask);

router.delete('/DeleteTask/:id', Verifyauthtoken, Verifyrefreshtoken, DeleteTask);


router.get('/GetTask', Verifyauthtoken, Verifyrefreshtoken, GetTask);


router.put('/UpdateTask/:id', Verifyauthtoken, Verifyrefreshtoken, UpdateTask);

router.get('/GetTaskbyid/:id', Verifyauthtoken, Verifyrefreshtoken, GetTaskbyid);


module.exports = router;