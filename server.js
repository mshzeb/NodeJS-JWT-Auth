require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

const posts = [
    {
        username: 'James',
        title: 'Post 1'
    },
    {
        username: 'William',
        title: 'Post 2'
    }
]

//Creates an App Routes to get an app up and running
app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
})

// Middleware to authenticate the token
function authenticateToken(req, res, next) {
    // Get the token that comes from header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

app.listen(3000)    // The app runs on port 3000