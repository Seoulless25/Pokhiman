var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var session = require('express-session')
var passport = require('passport')

require('dotenv').config()
require('./config/database')
require('./config/passport')

var indexRouter = require('./routes/index')
var teamsRouter = require('./routes/teams')
var reviewsRouter = require('./routes/reviews')

var app = express()

let allPokemon = []
var x = new Promise((resolve, reject) =>
  fetch('https://pokeapi.co/api/v2/pokemon?limit=150&offset=0')
    .then((response) => response.json())
    .then((json) =>
      json.results.forEach((pokemon) => allPokemon.push(pokemon), resolve())
    )
)
x.then(() => {
  // console.log(allPokemon);
})
// .then(data => {
//   console.log(data.data);
//   data.data.results.forEach((element) => {
//   })
// })
// .catch(err => {
//   console.error('Error: ' + err)
// })

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(function(req, res, next) {
  res.locals.user = req.user
  console.log(req.url)
  next()
})

app.use('/', indexRouter)
app.use('/teams', teamsRouter)
app.use('/teams', reviewsRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
