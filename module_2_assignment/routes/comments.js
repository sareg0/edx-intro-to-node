const store = require('../store')

module.exports = {
  getComments(req, res) {
    res.status(200).send(store.posts[req.params.postId].comments)
  },
  addComment(req, res) {
    store.posts[req.params.postId].comments.push(req.body)
    res.status(201).send("successfully created comment: " + req.body.text)
  },
  updateComment(req, res) {
    store.posts[req.params.postId].comments[req.params.commentId] = req.body
    res.status(200).send("successfully updated comment: " + req.body.text)
  },
  removeComment(req, res) {
    store.posts[req.params.postId].comments.splice(req.params.commentId, 1)
    res.status(204).send()
  }
}


