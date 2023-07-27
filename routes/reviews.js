const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');

router.get('/:id/reviews', reviewsCtrl.showReviewForm);

router.post('/:id/reviews', reviewsCtrl.create);

module.exports = router;