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

`
$eq : Matches values that are equal to a specified value.  
$gt : Matches values that are greater than a specified value.  
$gte : Matches values that are greater than or equal to a specified value.  
$in : Matches any of the values specified in an array.  
$lt : Matches values that are less than a specified value.  
$lte : Matches values that are less than or equal to a specified value.  
$ne : Matches all values that are not equal to a specified value.  
$nin : Matches none of the values specified in an array.  
`

## Exercices

### ExoBook

- ```use sample_db``` : Création de la bdd
- ```db.createCollection("employees");``` : Création de la collection
- ```db.employees.insert([{name: "John Doe",age: 35,job: "Manager",salary: 80000},{name: "Jane Doe",age: 32,job: "Developer",salary: 75000},{name: "Jim Smith",age: 40,job: "Manager",salary: 85000}]);``` : Ajout des données dans le BDD
- ```db.employees.find();``` : Trouver TOUT ce qu'il y a dans "employees"
- ```db.employees.find({age:{$gt:33}});``` : Retourne les personnes avec un age supérieur ou égal à 33
- ```db.employees.find().sort({salary:-1});``` : Trier par salaire en décroissant
- ```db.employees.find({},{_id:false,name:true, job:true});``` : Affiche seulement le nom et le job
- ```db.employees.aggregate([{$group: {_id:"$job",total:{$sum: 1}}}]);``` : Compte le nombre d'employe par poste
- ```db.employees.updateMany({},{$set:{salary:80000}});``` : Met le salaire de tout le monde à 80000

### Book

- ```db.salles.find({smac:true},{_id:true, nom:true});``` : Affiche l'identifiant et le nom qui sont des SMAC
- ```db.salles.find({capacite:{$gt:1000}});``` : Affiche les salles qui ont une capacite supérieur à 1000
- ```db.salles.find({'adresse.numero': null},{_id:true});``` : Affiche les salles avec pas de numéro
A FAIRE - ```db.salles.aggregate({},{_id:true, nom: true});``` : Affiche les l'id et le nom des salles avec exactement 1 commentaire
A FAIRE BIS - ```db.collection.find({field:{$avis:1}});``` : Affiche les l'id et le nom des salles avec exactement 1 commentaire
- ```db.salles.find({styles: "blues"},{_id:false,styles:true})``` : Affiches les styles si il y a le style "blues"
- ```db.salles.find({'styles.0': "blues"},{_id:false,styles:true})``` : Même chose que au dessus mais on met le "blues" en haut
- ```db.salles.aggregate([{$match:{'adresse.codePostal':{$regex:"84"}}},{$match:{capacite:{$lt:500}}}, {$project:{'adresse.ville':true}} ])``` : Afficher la ville des salles avec une capacité en dessous de 500 et avec le code postal commencant pas 84
- ```db.salles.aggregate([{$match:{avis:null}}, {$match:{_id:{$mod:[2, 0]}}}, {$project:{_id:true}} ])``` : Afficher l'identifiant avec pas de champ d'avis et avec un identifiant pair
- ```db.salles.aggregate([{$match:{"avis.note":{$gte:8,$lte: 10}}},{$project:{_id:false,nom:true}}])``` : Affichage des nom des salles dont au moins un des avis comporte une note comprise entre 8 et 10
- ```db.salles.aggregate([{$match:{"avis.date":{$gt:new Date('2019-11-15')}}},{$project:{_id:false,nom:true}}])``` : Affichage des nom des salles dont au moins un des avis comporte une date postérieure au 15/11/2019
- ```db.salles.aggregate([{$match:{$expr:{$gt:[{$multiply:["$_id",100]},"$capacite"]}}},{$project:{_id: false,nom:true,capacite:true}}])``` : Affichage des noms ainsi que la capacité des salles dont le produit de la valeur de l’identifiant par 100 est strictement supérieur à la capacité
- ```db.salles.aggregate([{$match:{type:"SMAC"}},{$project:{nom:1,stylesCount:{$size:"$styles"}}},{$match:{stylesCount:{$gt:2}}}])``` : Affichage des noms des salles de type SMAC programmant plus de deux styles de musiques différents en utilisant l’opérateur $where qui permet de faire usage de JavaScript
- ```db.salles.distinct("adresse.codePostal")``` : Affichage des différents codes postaux présents dans les documents de la collection salles
- ```db.salles.updateMany({},{$inc:{capacite:100}})``` : Augmente de 100 la capacite des salles
- ```db.salles.updateMany({styles:{$nin:["jazz"]}},{$addToSet:{styles:"jazz"}})``` : Ajoute du Jazz au salles qui n'ont pas de jazz
- ```db.salles.updateMany({_id:{$nin:[2, 3]}},{$pull:{styles:"funk"}})``` : Retire le Funk a tout le monde sauf au 2 et au 3
- ```db.salles.updateOne({_id:3},{$push:{styles:{$each:["techno","reggae"]}}})``` : Rajout d'un tableau avec techno et reggae
