# Cours MongoDB

## C'est quoi ?

Mongo est utilisé pour la gestion massives de données. Il est possible de faire ce que l'on veut dedans car il n'y a pas de structure prédéfinis comparé au SQL. C'est du NoSQL.

## Définitions

- Les Index : Accélère la vitesse de lectures des données. Utilisé quand il y a beaucoup de données. Cependant cela ralentis les modifications. C'est une structure de donnees qui stockent une petite partie des données de la collection. Cela permet d'accelerer les requetes. Les indexes ameliorent aussi les performances des requees de tri et de regroupement.
- MongoDB : Systeme de gestion de BDD orienté documents et cross-plateform. (Collection et document). Peut gérer plusieurs millions de données.
- BDD : Collection qui stocks des données dans une collection.

kaggle.com => Plateform pour trouver beaucoup de données.

- BSON : Format avec des Types suplémentaires

## Commandes

Créer un index :
```db.macollection.createIndex({"champvoulus":"type d'index"})```

Lister les index :
```db.macollection.getIndexes()```

Pour supprimer les index :
```db.macollection.dropIndex({"champvoulus":"type d'index"})```

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
- ```db.salles.find({capacite:{$gt:1000}},{_id:false});``` : Affiche les salles qui ont une capacite supérieur à 1000
- ```db.salles.find({'adresse.numero': {$exists:false}},{_id:true});``` : Affiche les salles avec pas de numéro
- ```db.salles.find({avis:{$size:1}},{_id:true,nom:true})``` : Affiche les l'id et le nom des salles avec exactement 1 commentaire
- ```db.salles.find({styles: "blues"},{_id:false,styles:true})``` : Affiches les styles si il y a le style "blues"
- ```db.salles.find({'styles.0': "blues"},{_id:false,styles:true})``` : Même chose que au dessus mais on met le "blues" en haut
- ```db.salles.aggregate([{$match:{'adresse.codePostal':{$regex:"84"}}},{$match:{capacite:{$lt:500}}}, {$project:{'adresse.ville':true}} ])``` : Afficher la ville des salles avec une capacité en dessous de 500 et avec le code postal commencant pas 84
- ```db.salles.aggregate([{$match:{avis:null}}, {$match:{_id:{$mod:[2, 0]}}}, {$project:{_id:true}} ])``` : Afficher l'identifiant avec pas de champ d'avis et avec un identifiant pair
- ```db.salles.aggregate([{$match:{"avis.note":{$gte:8,$lte: 10}}},{$project:{_id:false,nom:true}}])``` : Affichage des nom des salles dont au moins un des avis comporte une note comprise entre 8 et 10
- ```db.salles.aggregate([{$match:{"avis.date":{$gt:new Date('2019-11-15')}}},{$project:{_id:false,nom:true}}])``` : Affichage des nom des salles dont au moins un des avis comporte une date postérieure au 15/11/2019
- ```db.salles.aggregate([{$match:{$expr:{$gt:[{$multiply:["$_id",100]},"$capacite"]}}},{$project:{_id: false,nom:true,capacite:true}}])``` : Affichage des noms ainsi que la capacité des salles dont le produit de la valeur de l’identifiant par 100 est strictement supérieur à la capacité
- ```db.salles.aggregate([{$match:{smac:true}},{$project:{nom:true,stylesCount:{$size:"$styles"}}},{$match:{stylesCount:{$gte:2}}}])``` : Affichage des noms des salles de type SMAC programmant plus de deux styles de musiques différents en utilisant l’opérateur $where qui permet de faire usage de JavaScript
- ```db.salles.distinct("adresse.codePostal")``` : Affichage des différents codes postaux présents dans les documents de la collection salles
- ```db.salles.updateMany({},{$inc:{capacite:NumberInt(100)}})``` : Augmente de 100 la capacite des salles
- ```db.salles.updateMany({styles:{$nin:["jazz"]}},{$push:{styles:"jazz"}})``` : Ajoute du Jazz au salles qui n'ont pas de jazz
- ```db.salles.updateMany({_id:{$nin:[2, 3]}},{$pull:{styles:"funk"}})``` : Retire le Funk a tout le monde sauf au 2 et au 3
- ```db.salles.updateOne({_id:3},{$addToSet:{styles:{$each:["techno","reggae"]}}})``` : Rajout d'un tableau avec techno et reggae
- ```db.salles.updateMany({nom:{$regex:/^p/i}},{$inc:{capacite:NumberInt(150)},$set:{contact:{telephone:"04 11 94 00 10"}}})``` : Pour les salles dont le nom commence par la lettre P (majuscule ou minuscule), augmentez la capacité de 150 places et rajoutez un champ de type tableau nommé contact dans lequel se trouvera un document comportant un champ nommé telephone dont la valeur sera « 04 11 94 00 10 »
- ```db.salles.update({nom:\b[aeiouyAEIOUY]\w*},{$push:{avis:{date: new Date(),"note":10}}})``` : Pour les salles dont le nom commence par une voyelle (peu importe la casse, là aussi), rajoutez dans le tableau avis un document composé du champ date valant la date courante et du champ note valant 10 (double ou entier). L’expression régulière pour chercher une chaîne de caractères débutant par une voyelle suivie de n’importe quoi d’autre est \b[aeiouyAEIOUY]\w*

### GeoJson

Données :

```js
db.avignon.insertMany([{     "nom": "Palais des Papes",     "localisation": {         "coordinates": [43.9507, 4.8075],         "type": "Point"     }  },  {     "nom": "Pont Saint-Bénézet",     "localisation": {         "coordinates": [43.95397, 4.80478],         "type": "Point"     }  },  {     "nom": "Collection Lambert",     "localisation": {         "coordinates": [43.944787, 4.804031],         "type": "Point"     }  }])
```

Commencez par créer un index 2dsphere sur la collection avigon :

```js
db.avignon.createIndex({"localisation":"2dsphere"})
```

### Web site

npm init -y = Sert à initialiser un projet Node.js en créant un fichier package.json. Le y répond a "yes" pour tout
npm install express = Sert a installer un module express.js pour un projet node.js
npm install mongoose = Rajoute une bilbliotheque js pour faciliter l'utilisation de mongoDB
npm install dotenv = Rajoute des variables d'environnements
npm install nodemon = Permet de redémarer le projet automatiquement à chaque modification

Les middlewares dans Express sont comme des assistants pour les requêtes. Ils peuvent effectuer différentes tâches comme vérifier les informations, gérer l'authentification ou les erreurs. Les middlewares ont accès à la requête, à la réponse et peuvent passer le contrôle à d'autres fonctions. Ils sont utiles pour manipuler les données avant qu'elles n'atteignent leur destination finale

On rajoute l'app.js pour l'application. Pour démarer l'app on fait node app.js.
Quand on fait localhost:3000 on appel le middleWare qui nous dit qu'il fait des supers vérifications

## Mongo avec docker

docker pull mongo

docker run -d -p 27017:27017 --name mongo mongo

docker exec -it mongo /bin/bash

docker cp nomdufichier mongo:/data/nomdufichier

mongoimport --db rpi --collection restaurants --type json --headerline --file /data/restaurants.json

mongosh

## Les requetes géospatiales

### Le standard GeoJSON

GeoJson est un format open-source pour représenter des données géographique. Il est basé sur le format JSON. Il permet de représenter des points, des lignes, des polygones, des multipoints, des multipoints, des multilignes, des multipolygones et des géimétries géométriques.

Plus d'informations sur le site officiel : <https://geojson.org/>

### Les index geospatiaux

MongoDB vous propose des index geospatiaux pour améliorer les performances des reqietes geospatiales. Il existe deux types d'index geospatiaux : les index 2d et les index 2dshere.

```db.plan.createIndex({"geodata":"2d"})``` # index 2d

#### Les index 2d

Ils utilisent des couple de coordonées appelés 'legacy'. Les index 2d ne prennent pas en charge les sphères et les calculs de distance sur une sphère. Ils ne prennent pas en charge les index sur plusieurs champs.

Exemple dinsertion de données :
```db.plan.insert({"nom":"Point 1", "geodata":[1,1]})``` Ce ne sont pas des coordonées mais des absices et ordonnées.

On peut aussi stocker des coordonnées avec des index2d:

```db.plan.insert({"nom":"Point 1", "geodata":[4.805528, 43.949317]})```
ou
```db.plan.insert({nom:"Point 2", geodata:{lon:4.805528,lat:43.949317},})```

#### Les index 2dshere

Comme nous l'avons déja dit, l'index 2dsphere est préconisé des lors que des requetes géospatiales utilisent a géométrie sphérique.

### Les objets GeoJSON

Voici la structure d'un objet GeoJSON :

```json
{
    "type":"Point",
    "coordinates:[23,244]"
}
```

### L'opérateur $nearSphere

```js
{
    $nearSphere:{
        $geometry:{
            type: "Point",
            coordinate : ["longitude", "latitude"]
        },
        $minDistance: "distance en metre",
        $maxDistance: "distance en metre"
    }
}
```

Il permet d'avoir des points selon un cercle avec en son centre le point rentré.

### L'opérateur $geoWithin

```js
"Champ des docuements contenant les coordonnées":{
    $geoWithin:{
        $geometry:{
            type:"Polygon ou bien MultiPolygon",
            coordinate:["coordinnées"]
        }
    }
}
```

Il permet de retourner les points dans une zone définie

### L'opérateur $geoIntersects

```js
"Champ des documents contenant les coordonnées":{
    $geoIntersects:{
        $geometry:{
            "type":"Tout tupe d'objet GeoJson",
            "coodinates":["coordinnées"]
        }
    }
}
```

Permet d'avoir les intercections des formes

DEFINITION A EXPRESSE MIDDLEWARE !!!!

db.collection.aggregate([
   { $group: { _id: "$category", total: { $sum: "$price" } } }
])

db.collection.aggregate([
   { $match: { price: { $gt: 100 } } }
])

db.collection.aggregate([
   { $sort: { price: 1 } }
])

db.collection.aggregate([
   { $group: { _id: "$category", total: { $sum: "$price" } } },
   { $match: { total: { $gt: 1000 } } },
   { $sort: { total: -1 } }
])

db.collection.aggregate([
       {
         $geoNear: {
           near: {
             type: "Point",
             coordinates: [longitude, latitude]
           },
           distanceField: "distance",
           maxDistance: maxDistanceInMeters,
           spherical: true
         }
       }
     ])

db.collection.aggregate([
       {
         $match: {
           location: {
             $geoWithin: {
               $geometry: {
                 type: "Polygon",
                 coordinates: [
                   [
                     [longitude1, latitude1],
                     [longitude2, latitude2],
                     [longitude3, latitude3],
                     [longitude4, latitude4],
                     [longitude1, latitude1]
                   ]
                 ]
               }
             }
           }
         }
       }
     ])

db.collection.aggregate([
  {
    $geoNear: {
      near: { type: "Point", coordinates: [longitude, latitude] },
      distanceField: "distance",
      maxDistance: distance,
      spherical: true,
      key: "location" // Remplacez "location" par le nom de votre champ géospatial
    }
  }
])

db.collection.createIndex({ location: "2dsphere" })

db.collection.aggregate([
     {
       $match: {
         location: {
           $geoWithin: {
             $geometry: {
               type: "Polygon",
               coordinates: [
                 [
                   [longitude1, latitude1],
                   [longitude2, latitude2],
                   [longitude3, latitude3],
                   [longitude4, latitude4],
                   [longitude1, latitude1]
                 ]
               ]
             }
           }
         }
       }
     }
   ])