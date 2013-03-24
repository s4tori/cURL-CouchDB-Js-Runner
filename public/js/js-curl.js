$(document).ready(function() {

    // ========================================================================== \\
    // |                           cURL-CouchDB-Js-Runner                       | \\
    // -------------------------------------------------------------------------- \\
    // |          https://github.com/s4tori/cURL-CouchDB-Js-Runner | 2013-03-14 | \\
    // | Executions de commandes cURL depuis un appel AJAX                    ♥ | \\
    // +========================================================================+ \\

    // Pour l'écriture de messages JSON avec l'option -d, utiliser le format suivant :
    // [-d '{ "foo":"bar"}'] : guillemet simple autour, guillement double à l'intérieur
    //    Sous Windows, les guillemets dans la structure JSON doivent être échappés avec cURL
    //    Pour que ca marche sous Windows : http://stackoverflow.com/questions/3347974/curl-giving-invalid-utf-8-json-error-from-couchdb-although-json-is-fine-any-i
    //    curl -X PUT http://127.0.0.1:5984/ma-base/1 -H "Content-Type: application/json" -d "{\"foo\":\"bar\"}"
    //    L'ajout des antislash est fait automatiquement dans le méthode terminal ci-dessous

    /**
     * Création du terminal
     */
    $('#terminal').terminal(function(command, term) {

        if (command == '') {
            term.echo('');
            return;
        }

        try {

            if (command.substring(0, 4).toLowerCase() != "curl") {
                command = "curl " + command;
                // throw 'Commande cURL invalide';
            }

            // Sous Windows, les guillemets dans la structure JSON doivent être échappés avec cURL
            // C'est une limitation de cmd.exe
            // http://wiki.apache.org/couchdb/Quirks_on_Windows
            //         curl -X PUT http://127.0.0.1:5984/ma-base/1 -H "Content-Type: application/json" -d '{"foo":"bar"}'
            // devient curl -X PUT http://127.0.0.1:5984/ma-base/1 -H "Content-Type: application/json" -d "{\"foo\":\"bar\"}"
            var myRegexp = /(.*)-d [']?([^']+)[']?(.*)/g;
            var match = myRegexp.exec(command);
            if(match != null && match.length > 1){
                command = match[1] + ' -d "' + match[2].replace(/\"/g,"\\\"") + '" '+ match[3];
            }

            prettyMyJson({});
            term.pause();

            // Appel AJAX pour l'exécution de la commande cURL
            var request = $.ajax({
                url: "/curlPowa",
                type: "post",
                dataType: "json",
                scriptCharset: "utf-8" ,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                data: { 'command' : command }
            })
                .fail(function() {
                    term.resume();
                    alert("Oups : Erreur lors de l'appel AJAX vers le serveur nodeJs");
                })
                .done(function(json) {
                    term.resume();
                    prettyMyJson(json.msg);
                })

        } catch(e) {
            term.error(new String(e));
        }
    }, {
        greetings : 'cURL Interpreter [cURL-CouchDB-Js-Runner]',
        name : 'js_demo',
        height : 200,
        prompt : 'cURL > ',
        onInit : function (term){ term.insert('curl http://localhost:5984/'); },
        tabcompletion : true ,
        completion : function (term, keyword, callback){
            // autocompletion minimale
            callback([
                'curl', 'CURL', 'http://localhost:1337/',
                'GET', 'POST', 'PUT', 'DELETE',
                '"Content-Type: application/json"'
            ]);
        }
    });

    // ---------------------------------------------------------
    // Formattage des données JSON

    var jsonNode = null;

    /**
     * Affichage du retour JSON de CouchDB
     * @param json Données JSON à afficher
     */
    function prettyMyJson(json){
        jsonNode = new PrettyJSON.view.Node({
            el:$('#result'),
            data:json
        });
    }

    $('button[name=expandAll]').click(function(){
        if(jsonNode) jsonNode.expandAll();
    });

    $('button[name=collapseAll]').click(function(){
        if(jsonNode) jsonNode.collapseAll();
    });

    // ---------------------------------------------------------

    if(!window.location.host){
        alert(
            "Information :\n\n" +
                "Cette page effectue des requêtes AJAX.\n" +
                "Pour faire fonctionner cette page, vous devez l'exécuter depuis le serveur node.js (server.js)."
        );
    }

});