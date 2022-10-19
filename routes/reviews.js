const express = require('express');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const reviews = require('../controllers/reviews');
const { isLoggedIn, isReviewAuthor, validateReview } = require('../middleware');

const router = express.Router({ mergeParams: true });

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;
