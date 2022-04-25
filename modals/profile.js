const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status:{
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio:{
        type: String
    },
    githubsernmae:{
        type: String
    },
    experience: [
        {
            title:{
                type: String,
                required: true
            },
            company:{
                type: String,
                required: true
            },
            location: {
                type: String
            },
            from: {
                type: String,
                required: true
            },
            to: {
                type: String,
            },
            current: {
                type: Boolean,
                required: false
            },
            description: {
                type: String
            },
        }
    ],
        socials: {
            youtube:{
                type: String,
            },
            twitter:{
                type: String,
            },
            facebook:{
                type: String,
            },
            linkedin:{
                type: String,
            },
            instagram:{
                type: String,
            }
        },
        date:{
            type: Date,
            default: Date.now
        }
});

module.exports = Profile = mongoose.model('profile',ProfileSchema)