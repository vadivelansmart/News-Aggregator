const mongoose = require('mongoose');

const preferencesSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    preferences: {
        type: [String],
        required: [true, 'preference not provided'],
        validate: {
            validator: function(value) {
              return value.length > 0; 
            },
            message: 'Preferences must not be empty'
          },
    }
});

const Preferences = mongoose.model('Preference', preferencesSchema);

module.exports = Preferences;
