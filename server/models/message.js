const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const messageSchema = new Schema({
    text: { type: String, required: true },
    isLink: { type: Boolean, required: true },
});

module.exports = mongoose.model('Messages', messageSchema);