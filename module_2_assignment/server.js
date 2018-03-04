const express = require('express')
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')
const routes = require('./routes')
const store = require('./store')

let app = express()

app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())

//GET and POST to /posts
app.get('/posts', routes.posts.getPosts)
app.post('/posts', routes.posts.addPost)

//PUT and DELETE to /posts/:postId
app.put('/posts/:postId', routes.posts.updatePost)
app.delete('/posts/:postId', routes.posts.removePost)

//GET and POST to /posts/:postId/comments
app.get('/posts/:postId/comments', routes.comments.getComments)
app.post('/posts/:postId/comments', routes.comments.addComment)

//PUT and DELETE to /posts/:postId/comments/commentId
app.put('/posts/:postId/comments/:commentId', routes.comments.updateComment)
app.delete('/posts/:postId/comments/:commentId', routes.comments.removeComment)

app.listen(3000)

//GET posts
//curl "http://localhost:3000/posts"

//Add posts
//curl -H "Content-Type: application/json" -X POST -d '{"name": "first post"}' "http://localhost:3000/posts" -iv

//Update a Post
//curl -H "Content-Type: application/json" -X PUT -d '{"name": "my very first post"}' "http://localhost:3000/posts/[postId]" -iv

//Remove a post
//curl -X DELETE "http://localhost:3000/posts/[postId]" -iv

//Add a Comment to a Post
//curl -H "Content-Type: application/json" -X POST -d '{"text": "my first comment"}' "http://localhost:3000/posts/[postId]/comments" -iv

//Update a comment on a Post
//curl -H "Content-Type: application/json" -X PUT -d '{"text": "my very first comment"}' "http://localhost:3000/posts/[postId]/comments/[commentId]" -iv

//Get Comments on a post
//curl "http://localhost:3000/posts/2/comments"

//Remove a comment from a post
//curl -X DELETE "http://localhost:3000/posts/[postId]/comments/[commentId]"
