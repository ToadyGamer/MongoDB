const express = require('express');
   const myMiddleware = require('./middlewares/myMiddleware'); // Importer le middleware
   const app = express();

   // Utiliser le middleware au niveau de l'application
   app.use(myMiddleware);

   // Utiliser le middleware dans une route spécifique
   app.get('/', myMiddleware, function (req, res) {
     res.send('Hello World!');
   });

   // Lancer le serveur
   app.listen(3000, function () {
     console.log('Example app listening on port 3000!');
   });