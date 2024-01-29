# Cours MongoDB

## C'est quoi ?

Mongo est utilisé pour la gestion massives de données. Il est possible de faire ce que l'on veut dedans car il n'y a pas de structure prédéfinis comparé au SQL. C'est du NoSQL.

## Définitions

- Les Index : Accélère la vitesse de lectures des données. Utilisé quand il y a beaucoup de données. Cependant cela ralentis les modifications.
- MongoDB : Systeme de gestion de BDD orienté documents et cross-plateform. (Collection et document). Peut gérer plusieurs millions de données.
- BDD : Collection qui stocks des données dans une collection.

kaggle.com => Plateform pour trouver beaucoup de données.

- BSON : Format avec des Types suplémentaires

## Commandes

- ```use rpid``` : Switch sur la base de donnée
- ```db.someCall.insertOne({"foo":"bar"});``` : Ajouter une donnée en nom "foo" et valeur "bar"
- ```db.someCall.find();``` : est léquivalent du "select *"
- ```db.dropDatabase();``` : Supprime la table
- ```db.createCollection("maCollection", "collation": {});``` : Créer une collection
- ```db.personnes.find({age:{$eq:76}},{prenom: true})``` : Retourne les personnes avec un age de 76 et on affiche seulement le prenom
- ```db.personnes.find({age:{$in:[77,80]}})``` : Retourne les personnes avec un age de 77 ou 80


## Exercices

### ExoBook

- ```use sample_db``` : Création de la bdd
- ```db.createCollection("employees");``` : Création de la collection
- ```db.employees.insert([{name: "John Doe",age: 35,job: "Manager",salary: 80000},{name: "Jane Doe",age: 32,job: "Developer",salary: 75000},{name: "Jim Smith",age: 40,job: "Manager",salary: 85000}]);``` : Ajout des données dans le BDD
- ```db.employees.find();``` : Trouver TOUT ce qu'il y a dans "employees"
- ```db.employees.find({age:{$gt:33}});``` : Retourne les personnes avec un age supérieur ou égal à 33
- ```db.employees.find().sort({salary:-1});``` : Trier par salaire en décroissant
- ```db.employees.find({},{name:true, job:true});``` : Affiche seulement le nom et le job
- ```db.employees.find({},{name:true, job:true},"count": {"type": "lowerBound"|"total"});```
- ```db.employees.aggregate([{$group: {_id:"$job",total:{$sum: 1}}}]);``` : Compte le nombre d'employe par poste
- ```db.employees.updateMany({},{$set:{salary:80000}});``` : Met le salaire de tout le monde à 80000
