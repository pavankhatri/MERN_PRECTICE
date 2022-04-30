const moongoose = require('mongoose');
const Schema = require.Schema;

const PostSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    text:{
        type: String,
        required: true
    },
    name:{
        type: String
    },
    avtar:{
        type: String
    },
    likes:[ {
        user: {
            type: Schema.Types.ObjectId,
            ref: "users"
        }
    }
    ],
    components:[ {
        user: {
            type: Schema.Types.ObjectId,
            ref: "users"
        },
        text: {
            type: String
        },
        name: {
            type: String
        },
        avtar: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Posts = moongoose.model('post', PostSchema);