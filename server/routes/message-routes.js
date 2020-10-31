const express = require('express');
const { check } = require('express-validator');

const messageControllers = require('../controllers/message-controllers');

const router = express.Router();

router.get('/:mid', messageControllers.getMessageById);
router.post(
    '/',
    [
        check('text').not().isEmpty(),
        check('isLink').not().isEmpty()
    ],
    messageControllers.createMessage
)

module.exports = router;