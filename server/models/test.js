

import  express from 'express';

const app = express();

app.use(express.json());

let users = [];

app.post('/notification', (req, res) => {
  const user = req.body;
  users.push(user);
  res.send('notification received');
});