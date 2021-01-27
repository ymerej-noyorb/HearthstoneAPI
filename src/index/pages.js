/*#########################################################################
Auteur : Jeremy BROYON#####################################################
Nom : Hearthstone API######################################################
Date limite : 07/12/20#####################################################
Cahier des charges :#######################################################
  - page d'accueil#########################################################
  - formulaire de contact via une API######################################
  - pages fixes générées par l'API#########################################
  - un tableau et une galerie d'images#####################################
  - responsivité, sémantique, syntaxe, fonctions supp######################
#########################################################################*/
//##############################################################################################################
//connexion à l'api hearthstone avec son url, l'hôte et sa clé
function ajaxGet(url, callback)
{
    const data = null;

    const request = new XMLHttpRequest();
    request.withCredentials = true;

    request.addEventListener("readystatechange", function()
    {
        if (this.readyState === this.DONE)
            callback(request.responseText);
    });

    request.open("GET", url);
    request.setRequestHeader("x-rapidapi-key", "8ad6b3f72dmsh8e1d1a38bd6ffb6p1e2327jsne26b44ac3c86");
    request.setRequestHeader("x-rapidapi-host", "omgvamp-hearthstone-v1.p.rapidapi.com");

    request.send(data);
}
//##############################################################################################################
//barre de progression
function move()
{
    var i = 0;
    var bar = document.getElementById("progress_bar");
    bar.style.visibility = "visible";

    if (i == 0)
    {
        i = 1;
        var elem = document.getElementById("bar");
        var width = 5;
        var id = setInterval(frame, 10);
        function frame()
        {
            if (width >= 100)
            {
                clearInterval(id);
                i = 0;
                bar.style.visibility = "hidden";
                hearthstone_audio.play();
            }
            else
            {
                width++;
                elem.style.width = width + "%";
            }
        } 
    }
}
//##############################################################################################################
//fonction d'affichage de la requête
function displayCards(response) //réception du fichier JSON
{
    if(!response)
    {
        window.alert("Vous semblez déconnecté d'internet, ou l'API utilisée est inaccessible !");
    }
    else
    {
        var information = JSON.parse(response); //parse et affectation au tableau

        if(information.error) //vérifie la saisie de l'utilisateur
            window.alert(information.error +" : "+ information.message);
        else
        {
            var tbody = "";
            var limit = 150; //limite de données pour éviter la latence (pagination à faire, voir plus bas)
            var count = 0;

            //affichage de l'en-tête du tableau de données
            tbody += '<thead><tr>';
            tbody += '<th>Image</th>';
            tbody += '<th>Nom</th>';
            tbody += '<th>Extension</th>';
            tbody += '<th>Type</th>';
            tbody += '<th>Classe</th>';
            tbody += '<th>Faction</th>';
            tbody += '<th>Rareté</th>';
            tbody += '<th>Mana</th>';
            tbody += '<th>Attaque</th>';
            tbody += '<th>Vie</th>';
            tbody += '<th>Durabilité</th>';
            tbody += '<th>Race</th>';
            tbody += '<th>Description</th>';
            tbody += '</thead></tr>';
            
            //affichage du contenu du tableau de données
            do
            {
                //parcours les dossiers contenant les images et affiche celles correspondantes à l'aide des valeurs retournées par l'api
                tbody += '<tr>';
                //##############################################################################################################
                //REMARQUE : boucle non optimale, mise en place du switch compliqué et else if non adapté
                if(information[count].img) //vérification du return de l'api
                tbody += '<td data-label="Image :"><img src="'+information[count].img+'" alt="" title="'+information[count].name+'" class="image"></td>';
                else //affichage par défaut en cas d'absence de données
                    tbody += '<td>&nbsp;-</td>';
                //##############################################################################################################
                if(information[count].name)
                    tbody += '<td data-label="Nom :">&nbsp;'+information[count].name+'</td>';
                else
                    tbody += '<td>&nbsp;-</td>';
                //##############################################################################################################
                if(information[count].cardSet)
                    tbody += '<td data-label="Extension :"><img src="../expansion/expansions/'+information[count].cardSet+'.png" alt="" title="Extension: '+information[count].cardSet+'" class="expansion"></td>';
                else
                    tbody += '<td>&nbsp;-</td>';
                //##############################################################################################################
                if(information[count].type)
                    tbody += '<td data-label="Type :"><img src="../type/types/'+information[count].type+'.png" alt="" title="Type: '+information[count].type+'" class="type"></td>';
                else
                    tbody += '<td>&nbsp;-</td>';
                //##############################################################################################################
                if(information[count].playerClass)
                    tbody += '<td data-label="Classe :"><img src="../class/class_icon/'+information[count].playerClass+'.png" alt="" title="Classe: '+information[count].playerClass+'" class="class"></td>';
                else
                    tbody += '<td>&nbsp;-</td>';
                //##############################################################################################################
                if(information[count].faction)
                    tbody += '<td data-label="Faction :"><img src="../faction/factions/'+information[count].faction+'.png" alt="" title="Faction: '+information[count].faction+'" class="faction"></td>';
                else
                    tbody += '<td>&nbsp;-</td>';
                //##############################################################################################################
                if(information[count].rarity)
                    tbody += '<td data-label="Rareté :"><img src="../rarity/rarity_gem/'+information[count].rarity+'.png" title="Rareté: '+information[count].rarity+'" class="rarity"></td>';
                else
                    tbody += '<td>&nbsp;-</td>';
                //##############################################################################################################
                if(information[count].cost)
                    tbody += '<td data-label="Mana :"><img src="../stats/mana/'+information[count].cost+'.png" alt="" title="Mana: '+information[count].cost+'" class="mana"></td>';
                else
                    tbody += '<td>&nbsp;-</td>';
                //##############################################################################################################
                if(information[count].attack)
                    tbody += '<td data-label="Attaque :"><img src="../stats/attack/'+information[count].attack+'.png" alt="" title=" Attaque: '+information[count].attack+'" class="attack"></td>';
                else
                    tbody += '<td>&nbsp;-</td>';
                //##############################################################################################################
                if(information[count].health)
                    tbody += '<td data-label="Vie :"><img src="../stats/health/'+information[count].health+'.png" alt="" title="Vie: '+information[count].health+'" class="health"></td>';
                else
                    tbody += '<td>&nbsp;-</td>';
                //##############################################################################################################
                if(information[count].durability)
                    tbody += '<td data-label="Durabilité :"><img src="../stats/durability/'+information[count].durability+'.png" alt="" title="Durabilité: '+information[count].durability+'" class="durability"></td>';
                else
                    tbody += '<td>&nbsp;-</td>';
                //##############################################################################################################
                if(information[count].race)
                    tbody += '<td data-label="Race :"><img src="../race/race_icon/'+information[count].race+'.png" alt="" title="Race: '+information[count].race+'" class="race"></td>';
                else
                    tbody += '<td>&nbsp;-</td>';
                //##############################################################################################################
                if(information[count].text)
                {
                    let input = information[count].text

                    //remplacement des caractères indésirables pour l'affichage de la description des cartes
                    input = input.replaceAll('$', '');
                    input = input.replaceAll('_', ' ');
                    input = input.replaceAll('|4(point,points)', 'points');
                    input = input.replaceAll('#', '');
                    input = input.replace(/(\r\n|\n|\r)/gm,""); //ne fonctionne pas, affiche tout de même les \n

                    let request = input;
                    tbody += '<td data-label="Description :" class="description">&nbsp;'+request+'</td>';
                }
                else
                    tbody += '<td>&nbsp;-</td>';
                //##############################################################################################################
                tbody += '</tr>';

                result.innerHTML = tbody;
                count++;
                    
            } while(count != limit);
            //REMARQUE : une pagination de l'affichage du fichier JSON était prévue pour éviter la surcharge de données
            // et la latence de la page web, c'est pourquoi une modification de la boucle était nécessaire,
            // la condition count != 150 était à l'origine count != information.length qui parcours l'ensemble
            // des données retournées (nombre d'items dans le fichier JSON qui peut aller jusqu'à 900 items voir plus)

            //EDIT : après notre discussion, je me suis rendu compte que l'API officielle de Hearthstone disposez
            // d'un endpoint sur le nombre de pages, ayant développé le projet sous une API disponible
            // sur https://github.com/public-apis/public-apis#games--comics qui n'est pas la version officielle de Blizzard
            // et ne disposant pas de nombre de pages, j'ai donc bridé le tout "sauvagement", à modifier !
        }
    
   }
}
//##############################################################################################################
//retourne tout les dos de cartes du jeu
function getCardBack()
{
    var endPoint = 'https://omgvamp-hearthstone-v1.p.rapidapi.com/cardbacks?locale=frFR';

    ajaxGet(endPoint, function(response)
    {
        var information = JSON.parse(response); //parse et affectation au tableau
        var tbody = "";
        var count = 0;

        do
        {
            tbody += '<img src="'+information[count].img+'" alt="" title="'+information[count].name+' : '+information[count].description+'" id="'+information[count].cardBackId+'" class="size_gallery"></a>';
            
            result.innerHTML = tbody;
            count++;
            
        } while(count != information.length); //parcours l'ensemble des données retournées information.length
    }); 
    result = document.getElementById('list_cards'); //affiche les données
}
//##############################################################################################################
//Retourne toutes les cartes d'une classe, exemple: Mage, Paladin.
function getCardClass(clicked_id) //réception de l'id au clique de la souris
{
    //envoi de l'id dans le end point
    var endPoint = 'https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/classes/'+clicked_id+'?locale=frFR';

    ajaxGet(endPoint, function(response)
    {
        //envoie du fichier JSON
        displayCards(response); //appel de la fonction qui affecte les images aux données
    });
    result = document.getElementById('list_cards');//affiche les données
}//##############################################################################################################
//retourne toutes les cartes d'une extension précise, ex: Mont rochenoire, Naxxramas
function getCardExtension(clicked_id)
{
    var endPoint = 'https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/sets/'+clicked_id+'?locale=frFR';

    ajaxGet(endPoint, function(response)
    {
        displayCards(response); //appel de la fonction qui affecte les images aux données
    }); 
    result = document.getElementById('list_cards'); //affiche les données
}
//##############################################################################################################
//retourne toutes les cartes d'une faction précise, ex: alliance, horde
function getCardFaction(clicked_id)
{
    var endPoint = 'https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/factions/'+clicked_id+'?locale=frFR';

    ajaxGet(endPoint, function(response)
    {
        displayCards(response); //appel de la fonction qui affecte les images aux données
    }); 
    result = document.getElementById('list_cards'); //affiche les données
}
//##############################################################################################################
//Retourne toutes les cartes d'une race, exemple: Mécha, Murloc.
function getCardRace(clicked_id)
{
    var endPoint = 'https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/races/'+clicked_id+'?locale=frFR';

    ajaxGet(endPoint, function(response)
    {
        displayCards(response); //appel de la fonction qui affecte les images aux données
    });
    result = document.getElementById('list_cards');//affiche les données
}
//##############################################################################################################
//retourne toutes les cartes d'une rareté précise, ex: legendary, rare
function getCardRarity(clicked_id)
{
    var endPoint = 'https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/qualities/'+clicked_id+'?locale=frFR';

    ajaxGet(endPoint, function(response)
    {
        displayCards(response); //appel de la fonction qui affecte les images aux données
    }); 
    result = document.getElementById('list_cards'); //affiche les données
}
//##############################################################################################################
//retourne toutes les cartes d'un type précis, ex: armes, sorts
function getCardType(clicked_id)
{
    var endPoint = 'https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/types/'+clicked_id+'?locale=frFR';

    ajaxGet(endPoint, function(response)
    { 
        displayCards(response); //appel de la fonction qui affecte les images aux données
    }); 
    result = document.getElementById('list_cards'); //affiche les données
}
//##############################################################################################################
//retourne toutes les cartes d'un type précis, ex: armes, sorts
function getSearchCard()
{
    //recherche d'espace dans la saisie de l'utilisateur et les remplaces par des %20
    var input = document.getElementById("card_class").value;
    var search = ' ';
    input = input.replaceAll(search, '%20');

    if(input == "christmas" || input == "Christmas" || input == "CHRISTMAS")
    {
        document.location.href="../christmas/christmas.html";
    }
    else
    {
        var request = input;
        var endPoint = 'https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/search/'+request+'?locale=frFR';

        ajaxGet(endPoint, function(response)
        {
            displayCards(response); //appel de la fonction qui affecte les images aux données
        }); 
        result = document.getElementById('list_cards'); //affiche les données
    }
}
//##############################################################################################################
//fonction fourni par l'api de contact Formspree (réception d'un e-mail contenant toutes les informations
//en cas de saisie d'un utilisateur dans le formulaire)
function postContactForm()
{
    window.formbutton = window.formbutton || function()
    {
        (formbutton.q = formbutton.q || []).push(arguments)
    };
    formbutton("create", {action: "https://formspree.io/f/xoqpnenq"});
}