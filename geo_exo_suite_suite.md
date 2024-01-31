Télécharger les jeux d'essais suivants :
https://raw.githubusercontent.com/mongodb/docs-assets/geospatial/restaurants.json
https://raw.githubusercontent.com/mongodb/docs-assets/geospatial/neighborhoods.json

Creation d'un index 2dsphere
Un index géospatial, et améliore presque toujours les performances des requêtes $geoWithin et $geoIntersects. Comme ces données sont géographiques, créez un index2dsphère sur chaque collection en utilisant le shell mongo :

```js
db.plan.createIndex({"geodata":"2d"})
```

Attention, la création d'un index est OBLIGATOIRE pour permettre l'utilisation des arguments :$geoIntersects, $geoSphere, $geoNear, $geoWithin, $centerSphere, $nearSphere , etc...

Explorez les données, documentez votre démarche et vos résultats dans un fichier geo_exo_suite_suite.md

Trouvez la commande qui va retourner le restaurant Riviera Caterer... De quel type d'objet GeoJSON s'agit-il ?

Trouvez "Hell's kitchen" au sein de la collection "neighborhoods" et retournez le nom du quartier, sa superficie et sa population. Quelle est la superficie totale de ce quartier ?

Trouvez la requete type qui permet de recuperer le nom du quartier a partir d'un point donné.

```js
var myPoint = {"type": "Point", "coordinates": [0, 0]}
db.neighborhoods.find({location:{$nearSphere:{$geometry:{type:"Point",coordinate:myPoint.coordinates}}},$maxDistance:"0"},{_id:false,name:true});
```

Trouver la requete qui trouve les restaurants dans un rayon donné (8km par exemple)

```js
var myPoint = {"type": "Point", "coordinates": [0, 0]}
var myDistance = 8000;
db.restaurants.find({location:{$nearSphere:{$geometry:{type:"Point",coordinate:myPoint.coordinates}}},$maxDistance:myDistance});
```
