// ========================================================================== \\
// |                        cURL-CouchDB-Js-Runner                          | \\
// -------------------------------------------------------------------------- \\
// |                  https://github.com/s4tori/cURL-Js-Runner | 2013-03-14 | \\
// | Executions de commandes cURL depuis un appel AJAX                    ♥ | \\
// +========================================================================+ \\

var util    = require('util');
var exec    = require('child_process').exec;
var express = require('express');

const app   = express();
app.set('port', '1337');
app.set('dir', require('path').dirname(require.main.filename) + '\\curl\\');

// --------------------------------------------------------------------------
// Configuration des middlewares d'Express

// On définie les middlewares qui seront en charge de traiter toutes les requêtes
// L'ordre de définition des middlewares est important (middleware appelés les uns après les autres)
app.configure(function() {
	app.use(express.logger('dev'));						// Affichage des requêtes sur la console
	app.use(express.bodyParser());      				// Recupération des messages envoyés par le client (req.body)
	app.use(app.router);                            	// Router (requetes app.VERB, VERB = GET, POST ...)
	app.use(express.static(__dirname + '/public')); 	// Répertoire des fichiers statiques (page HTML, CSS, etc)
});


// Module Router : Appel de cURL en ligne de commande
app.all('/curlPowa', function(req, res){
	
	var cmd = req.body.command;
	
	// Appel de l'exécutable cURL
	child = exec(app.get('dir') + cmd, function(error, stdout, stderr){
		
		var err = error != null;

        console.log('commande cURL : [' + cmd + ']');
		console.log('reponse cURL : [' + stdout + ']');
		if(err) console.log('Erreur cURL : ' + stderr)

        res.json({ 'ok' : !err, 'msg' : (err ? { 'erreur' : 'Consulter la console node.js' } : JSON.parse(stdout)) });

    });
	
});


// --------------------------------------------------------------------------
// Lancement du serveur

app.listen(app.get('port'));

console.log('+---------------------------------------------------+');
console.log('|              cURL-CouchDB-Js-Runner               |');
console.log('+---------------------------------------------------+');
console.log('');
console.log('Hello World         : Serveur démarré et prêt à vous servir ! ');
console.log('Serveur HTTP        : http://localhost:' + app.get('port') + '/');
console.log('Emplacement de cURL : ' + app.get('dir'));

console.log('');
