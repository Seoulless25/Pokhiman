const Review = require('../models/review')
const Team = require('../models/team')

module.exports = {
  index,
  new: newTeam,
  create,
  deleteTeam,
  showTeamInfo
}

async function index(req, res) {
  const teams = await Team.find({})
  res.render('teams/index', { title: 'All Teams', teams })
}

function newTeam(req, res) {
  res.render('teams/new', { title: 'Create a Team', errorMsg: '' })
}

async function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  try {
    const team = await Team.create(req.body)
    res.redirect(`/teams/${team._id}`)
  } catch (err) {
    console.log(err)
    res.render('teams/new', { errorMsg: err.message })
  }
}

async function deleteTeam(req,res) {
  try {
      const id = req.body.teamId
      await Team.findOneAndDelete({ _id:id})
      res.redirect('/teams')
  } catch(err) {
      console.log(err)
      res.status(500).send('Internal Server Error')
  }
}

async function showTeamInfo(req, res) {
  const team = await Team.findById(req.params.id);
  const reviews = await Review.find({team: req.params.id}).populate('user');
  console.log(team);
  res.render('teams/info', {team, reviews})
}