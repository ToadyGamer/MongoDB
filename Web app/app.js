const express = require('express');
const mongoose = require('mongoose');
const app = express();

const myMiddleware = ('middlewares/myMiddleware');

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connexion à la base de données réussie');
  })
  .catch((err) => {
    console.error('Erreur de connexion à la base de données :', err);
  });

app.get('/exemple', myMiddleware, (req, res) => {

  res.send('Ceci est un exemple de route GET avec MongoDB');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});