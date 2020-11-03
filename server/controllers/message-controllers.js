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

    if((message.lifeTime.getTime() - Date.now()) <= 0) {
        const msg = "The message is expired";
        message.isActive = false;
        await message.save();
        res.status(206).json({ message: msg });
    } else {
        res.status(200).json({ message });
    }
}

const createMessage = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data', 422));
    }

    const { text, lifeTime, isLink } = req.body;

    console.log("Creating new message...");
    console.log(req.body);

    const newMessage = new Messages({
        text,
        lifeTime: lifeTime + Date.now(),
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