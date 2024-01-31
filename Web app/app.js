const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connexion à la base de données réussie');
  })
  .catch((err) => {
    console.error('Erreur de connexion à la base de données :', err);
  });

const avignonSchema = new mongoose.Schema({
  nom: String,
  localisation: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});
avignonSchema.index({ localisation: '2dsphere' });

const Avignon = mongoose.model('avignon', avignonSchema);

app.get('/data', async (req, res) => {
  try {
    const data = await Avignon.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});