const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    coachId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'coach',
        required: true
    },
    postTitle: {
        type: String,
        required: true
    },
    postPic: {
        type: String,
    },
    postContent: {
        type: String,
        required: true
    }
}, {timestamps: true});

const blogModel = mongoose.model("blog", blogSchema);

module.exports = blogModel;
