const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const messageSchema = new Schema({
    text: { type: String, required: true },
    lifeTime: { type: Date, required: true },
    isLink: { type: Boolean, required: true },
    isActive: { type: Boolean, require: false, default: true }
});

module.exports = mongoose.model('Messages', messageSchema);