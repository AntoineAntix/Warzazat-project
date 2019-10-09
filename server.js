/**
 *
 * entrez la commande suivante:
 * npm install --save express express-session body-parser morgan cors
 */
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const session = require('express-session')

const app = express()

app.use(session({
  secret: 'blablabla', // changez cette valeur
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // ne changez que si vous avez activé le https
}))

app.use(cors({
  credentials: true,
  origin: 'http://localhost:8080'
}))

app.use(morgan('dev'))
app.use(bodyParser.json())

const path = require('path')
app.use(express.static(path.join(__dirname, 'dist/')))

const users = [{
  username: 'admin',
  password: 'admin',
  hscore: 1000,
  tabHscore: [1000]
}]

const answer = [ 0, 0, 3, 3, 0, 1, 1 ]

app.post('/api/login', (req, res) => {
  console.log('req.body', req.body)
  console.log('req.query', req.query)
  if (!req.session.userId) {
    const user = users.find(u => u.username === req.body.login && u.password === req.body.password)
    if (!user) {
      res.json({
        message: "L'utilisateur n'existe pas"
      })
    } else {
      // connect the user
      req.session.userId = 1000 // connect the user, and change the id
      res.json({
        message: 'Connecté',
        score: user.hscore,
        tabHscore: user.tabHscore
      })
    }
  } else {
    res.status(401)
    res.json({
      message: 'Vous êtes déjà connecté'
    })
  }
})

app.post('/api/addLog', (req, res) => {
  const user = users.find(u => u.username === req.body.login && u.password === req.body.password)
  if (!user) {
    users.push({
      username: req.body.login,
      password: req.body.password,
      hscore: 0,
      tabHscore: []
    })
    res.json({
      message: 'Utilisateur créé avec succés'
    })
  } else {
    res.json({
      message: 'Utilisateur existant, veuillez entrer de nouveaux identifiants'
    })
  }
})

app.post('/api/logout', (req, res) => {
  req.session.user = 0
  res.json({
    message: 'Déconnecté'
  })
})

app.post('/api/newHscore', (req, res) => {
  const user = users.find(u => u.username === req.body.login && u.password === req.body.password)
  user.hscore = req.body.hscore
  user.tabHscore = req.body.tabHscore
  res.json({
    message: 'Score saved'
  })
})

app.post('/api/nextQ', (req, res) => {
  if (answer[req.body.index] === req.body.rep) {
    res.json({
      message: 'good'
    })
  } else {
    res.json({
      message: 'not good'
    })
  }
})

app.get('/api/admin', (req, res) => {
  if (!req.session.userId || req.session.isAdmin === false) {
    res.status(401)
    res.json({ message: 'Unauthorized' })
    return
  }

  res.json({
    message: 'congrats, you are connected'
  })
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
