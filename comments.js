// Create web server
// Create a web server that listens on port 3000 and serves the following responses:
// - When a GET request is made to the /comments endpoint, the server should respond with an array of comments.
// - When a POST request is made to the /comments endpoint, the server should add a new comment to the array of comments and respond with the updated array.
// - When a PUT request is made to the /comments/:id endpoint, the server should update the comment with the corresponding id and respond with the updated array of comments.
// - When a DELETE request is made to the /comments/:id endpoint, the server should remove the comment with the corresponding id and respond with the updated array of comments.

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const comments = [
  { id: 1, text: 'Comment 1' },
  { id: 2, text: 'Comment 2' },
  { id: 3, text: 'Comment 3' },
];

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.post('/comments', (req, res) => {
  const comment = req.body;
  comments.push(comment);
  res.json(comments);
});

app.put('/comments/:id', (req, res) => {
  const id = req.params.id;
  const text = req.body.text;
  const comment = comments.find((c) => c.id === Number(id));
  if (comment) {
    comment.text = text;
  }
  res.json(comments);
});

app.delete('/comments/:id', (req, res) => {
  const id = req.params.id;
  const index = comments.findIndex((c) => c.id === Number(id));
  if (index !== -1) {
    comments.splice(index, 1);
  }
  res.json(comments);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});