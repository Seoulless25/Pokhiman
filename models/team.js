const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    teamName: {type: String, required: true},
    pokemonFirst: {type: String, required: true},
    pokemonSecond: {type: String, required: true},
    pokemonThird: {type: String, required: true},
    pokemonFourth: {type: String, required: true},
    pokemonFifth: {type: String, required: true},
    pokemonSixth: {type: String, required: true},
    reviews: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Review',
            // required: true 
        },
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        // required: true 
    }
})

module.exports = mongoose.model('Team', teamSchema);