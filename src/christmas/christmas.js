
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
// fonction pour activer la musique de Noël
function christmasPlay()
{
	hearthstone_christmas.play();
}
// fonction pour désactiver la musique de Noël
function christmasPause()
{
	hearthstone_christmas.pause();
}
//#########################################################################
// déclarations globales des variables utilisées
var card,
	image,
	cardw,
	cardh,
	cardx,
	cardy,
	ocardx,
	ocardy,
	pinx,
	piny,
	pinxperc,
	pinyperc,
	targetx,
	targety,
	rx,
	ry,
	targetrx,
	targetry,
	scale,
	targetscale,
	ww,
	wh,
	md,
	mx,
	my,
	whoosh,
	whooshvol,
	whooshvoltarget,
	majesty,
	majestyvol,
	majestyvoltarget,
	audioloaded;
//#########################################################################
// fonction pour lancer l'audio de la carte
function audioload()
{
	audioloaded++;
    if(audioloaded == 2)
    {
		document.body.classList.add('loaded');
		majesty.play();
		whoosh.play();
		bindevents();
		loop();
	}
}
// fonction d'initialisation
//#########################################################################
function init()
{
	onresize();
	card = document.querySelector('.card');
	image = document.querySelector('.card-image');
	cardw = image.width;
	cardh = image.height;
	cardx = ww / 2 - cardw / 2;
	cardy = wh / 2 - cardh / 2;
	ocardx = cardx;
	ocardy = cardy;
	pinx = 0;
	piny = 0;
	pinxperc = 0;
	pinyperc = 0;
	targetx = cardx;
	targety = cardy;
	rx = 0;
	ry = 0;
	targetrx = 0;
	targetry = 0;
	scale = 1;
	targetscale = scale;
	md = false;
	mx = cardx;
	my = cardy;
	audioloaded = 0;
	
	whooshvol = 0;
	whooshvoltarget = 0;
	whoosh = new Audio();
	whoosh.addEventListener('canplaythrough', audioload);
	whoosh.src = 'christmas/hs-whoosh.ogg';
	whoosh.volume = 0;
	whoosh.loop = true;

	majestyvol = 0;
	majestyvoltarget = 0;
	majesty = new Audio();
	majesty.addEventListener('canplaythrough', audioload);
	majesty.src = 'christmas/hs-majesty.ogg';
	majesty.volume = 0;
	majesty.loop = true;
}
// fonctions pour récupérer le déplacement de la souris de l'utilisateur sur la carte
//#########################################################################
function bindevents()
{
	card.addEventListener('mousedown', onmousedown);
	window.addEventListener('mouseup', onmouseup);
	window.addEventListener('mousemove', onmousemove);
	window.addEventListener('resize', onresize);
}
function onmousedown(e)
{
	md = true;
	mx = e.pageX;
	my = e.pageY;
	pinx = cardw / 2;
	piny = cardh / 2;
	pinxperc = 100 - (pinx / cardw) * 100;
	pinyperc = 100 - (piny / cardh) * 100;
}
function onmouseup()
{
	md = false;
}
function onmousemove(e)
{
	if(md)
	{
		mx = e.pageX;
		my = e.pageY;
	}
}
//#########################################################################
// fonction pour redimensionner
function onresize()
{
	ww = window.innerWidth;
	wh = window.innerHeight;
}
//#########################################################################
// fonction qui repète l'audio de la carte
function loop()
{
	requestAnimationFrame(loop)
	
	targetx = mx - cardx - pinx;
	targety = my - cardy - piny;
	
	cardx += targetx * 0.25;
	cardy += targety * 0.25;
	
	if(cardx < -cardw / 2)
	{
		cardx = -cardw / 2;
	}
	if(cardx > ww - cardw / 2)
	{
		cardx = ww - cardw / 2;
	}
	if(cardy < -cardh / 2)
	{
		cardy = -cardh / 2;
	}
	if(cardy > wh - cardh / 2)
	{
		cardy = wh - cardh / 2;
	}
	
	targetrx = (ocardy - cardy - rx) * 3;
	targetry = (cardx - ocardx - ry) * 3;
	
	targetrx = Math.min(targetrx, 90);
	targetrx = Math.max(targetrx, -90);
	targetry = Math.min(targetry, 90);
	targetry = Math.max(targetry, -90);
	
	rx += targetrx * 0.1;
	ry += targetry * 0.1;
		
	targetscale = md ? 1.2 - scale : 1 - scale;
	scale += targetscale * 0.2;
	
	card.style['transform'] = 'translate3d(' + cardx + 'px, ' + cardy + 'px, 0)';
	image.style['transform-origin'] = pinxperc + '% ' + pinyperc + '%';
	image.style['transform'] = 'scale('+ scale +') rotateY('+ ry +'deg) rotateX('+ rx +'deg)';

	majestyvoltarget = md ? 0.2 : 0;
	majestyvol += (majestyvoltarget - majestyvol) * 0.1;
	majesty.volume = majestyvol;
	
	whooshvoltarget = (Math.abs((ocardy - cardy)) + Math.abs((ocardx - cardx))) * 0.003;
	whooshvol += (whooshvoltarget - whooshvol) * 0.1;
	whoosh.volume = Math.min(whooshvol, 1);
	
	ocardx = cardx;
	ocardy = cardy;
}
//#########################################################################
window.onload = init;