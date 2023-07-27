const Team = require('../models/team');
const Review = require('../models/review');

module.exports = {
    create,
    showReviewForm
};

async function create(req, res) {
    try {
    const team = await Team.findById(req.params.id);

    const review = new Review({
        comment: req.body.comment,
        rating: +req.body.rating,
        user: req.user._id,
        team: req.params.id
    });

    await review.save();

    team.reviews.push(review._id);

    await team.save();

    }   catch (err) {
        console.log(err);
    }
    res.redirect(`/teams`);
}

async function showReviewForm(req, res) {
    const team = await Team.findById(req.params.id);
    res.render('teams/show', {team})
}