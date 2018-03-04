const store = require('../store')

module.exports = {
  getPosts(req, res) {
    res.status(200).send(store.posts)
  },
  addPost(req, res) {
    req.body.comments = []
    store.posts.push(req.body)
    res.status(201).send("successfully created: " + req.body.name)
  },
  updatePost(req, res) {
    post = store.posts[req.params.postId]
    if (req.body.name) {
      post.name = req.body.name
    }
    if (req.body.text) {
      post.text = req.body.text
    }
    if (req.body.url) {
      post.url = req.body.url
    }
    res.status(200).send("successfully updated post: " + post.name)
  },
  removePost(req, res) {
    store.posts.splice(req.params.postId, 1)
    res.status(204).send()
  }
}