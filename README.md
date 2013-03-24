# cURL-CouchDB-Js-Runner

**cURL-CouchDB-Js-Runner** met à disposition une petite page WEB permettant de lancer des requêtes HTTP à CouchDB via cURL.
Permet d'avoir un rendu plus clair des réponses JSON renvoyées par CouchDB.
Le code est volontairement assez simple, ce petit projet est utilisé pour présenter les commandes de base de CouchDB dans [cet article](http://s4tori.info/blog/?p=376).

Pour faire fonctionner le tout, il faut exécuter la page en lancant un serveur **node.js**.
Le serveur node permet de réceptionner les appel AJAX effectués par la page WEB et d'exécuter cURL en arrière plan.
Testé seulement sous Windows, j'adapterai pour environnement Linux si besoin.

<p align="center">
  <img style="border:1px solid gray" src="https://raw.github.com/s4tori/cURL-CouchDB-Js-Runner/master/public/cURL-CouchDB-Js-Runner.jpg" alt="Interface" />
</p>


## Installation

Il vous faut :

- [CouchDB](https://couchdb.apache.org/) : Base de données NoSQL par Apache (un installateur est disponible sur le site officiel)
- [Node.js](http://nodejs.org/) : Serveur basé sur le moteur Javascript V8 de Chrome (un installateur est disponible sur le site officiel)
- [cURL](http://curl.haxx.se/) : Petit utilitaire permettant d'exécuter des requêtes HTTP depuis la ligne de commande (simple fichier exécutable/binaire)

La mise en place de l'environnement consiste à Installer CouchDB et node.js, lancer CouchDB puis à importer les modules nécessaires à node.js.
Il suffit ensuite de lancer le serveur Web. La page sera accessible à l'adresse [http://localhost:1337/](http://localhost:1337/).

Configuration de CouchDB :

    $ Lancer couchdb depuis le terminal / couchdb.bat depuis le raccourci 'Start CouchDB' sous Windows
	$ CouchDB est lancé et accessible depuis l'URL http://localhost:5984/

Configuration de node.js (installation automatique des modules) :

    $ Lancer node depuis le terminal / le raccourci 'Node.js command prompt' sous Windows
	$ cd <repertoire>/cURL-CouchDB-Js-Runner
	$ npm install

Si cURL n'est pas déjà présent dans le répertoire **/curl**, il faut récupérer le fichier **curl** depuis le [site officiel](http://curl.haxx.se/download.html).
Par exemple, sous Windows, téléchargez le ZIP depuis la section **Win32 - Generic**.
Placez le fichier **curl.exe** dans le répertoire **/curl/** (les autres fichiers dans l'archive ne sont pas nécessaires).

Lancement du serveur node.js :

    $ node server.js

Accès à la page : [http://localhost:1337/](http://localhost:1337/)

## Exemple de commandes

	curl http://127.0.0.1:5984/

	curl -X DELETE http://localhost:5984/ma-base
	curl -X PUT http://localhost:5984/ma-base
	curl -X GET http://127.0.0.1:5984/_all_dbs
	curl -X PUT http://127.0.0.1:5984/ma-base/monId  -d '{"foo":"bar"}'
	curl -X PUT http://127.0.0.1:5984/ma-base/monId2  -d '{"a":"b"}'
	curl http://localhost:5984/ma-base/_all_docs

	curl -X GET http://127.0.0.1:5984/ma-base/monId
	curl -X PUT  http://127.0.0.1:5984/ma-base/monId -H "Content-Type: application/json" -d '{"foo":"bar2", "hello":"world", "_rev":"<rev>"}'
	curl -X GET http://127.0.0.1:5984/ma-base/monId
	curl -X DELETE http://127.0.0.1:5984/ma-base/monId?rev=<rev>

	curl -X PUT http://127.0.0.1:5984/ma-base2
	curl -X POST http://127.0.0.1:5984/_replicate -H "Content-Type: application/json" -d '{"source":"ma-base","target":"ma-base2"}'


