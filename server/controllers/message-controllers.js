const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');

const Messages = require('../models/message');

const getMessageById = async (req, res, next) => {
    let mid = req.params.mid;
    let message;

    try {
        message = await Messages.findById(mid);
    } catch(error) {
        return next(new HttpError(error, 500));
    }

    if(!message) {
        return next(new HttpError('Could not find a message with the provided ID', 404));
    }

    res.status(200).json({ message });
}

const createMessage = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data', 422));
    }

    const { text, isLink } = req.body;

    const newMessage = new Messages({
        text,
        isLink
    });

    try {
        await newMessage.save();
    } catch(error) {
        return next(new HttpError(error, 500));
    }

    res.status(201).json({ newMessage });
}

exports.getMessageById = getMessageById;
exports.createMessage = createMessage;