const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    url: String,
    filename: String
});

imageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_200,h_150,c_fill');
});

imageSchema.virtual('medium').get(function() {
    return this.url.replace('/upload', '/upload/w_600,h_350,c_fill');
});

imageSchema.virtual('large').get(function() {
    return this.url.replace('/upload', '/upload/w_750,h_450,c_fill');
});

const campgroundSchema = new mongoose.Schema({
    title: String,
    images: [imageSchema],
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

campgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc.reviews.length > 0) {
        await Review.deleteMany({ _id: { $in: doc.reviews } });
    }
});

module.exports = mongoose.model('Campground', campgroundSchema);