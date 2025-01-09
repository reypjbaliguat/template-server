const { Schema, model, models } = require('mongoose');

const UserSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String, // Hashed password for credential authentication
    image: String,
});

module.exports = models.User || model('User', UserSchema);
