var express = require('express')
var router = express.Router()
const teamsCtrl = require('../controllers/teams')

router.get('/', teamsCtrl.index)

router.get('/new', teamsCtrl.new)

router.get('/:id', teamsCtrl.showTeamInfo)

router.post('/', teamsCtrl.create)

router.post('/delete', teamsCtrl.deleteTeam)


module.exports = router
