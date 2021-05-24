//--#############################################################
//--############################################################# -- Functions
//--#############################################################

Element.prototype.remove = function() {
	this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
	for(var i = this.length - 1; i >= 0; i--) {
		if(this[i] && this[i].parentElement) {
			this[i].parentElement.removeChild(this[i]);
		}
	}
}

function forEach(object, callback) {
	for(var prop in object) {
		if(object.hasOwnProperty(prop)) {
			callback(prop, object[prop]);
		}
	}
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
	var c = ca[i];
	while (c.charAt(0) == ' ') {
	  c = c.substring(1);
	}
	if (c.indexOf(name) == 0) {
	  return c.substring(name.length, c.length);
	}
  }
  return "";
}

function getMetatag(name, blanksend) {
  if (document.querySelector('meta[name="' + name + '"]')) {
	return document.querySelector('meta[name="' + name + '"]').content;
  } else {
	return blanksend;
  }
}

function setModl(){	
	if (document.getElementById("accessibility-modl")) {
		var element = document.getElementById("accessibility-modl");
	} else {
		var style = document.createElement('div');
		style.setAttribute("id", "accessibility-modl");
		document.getElementsByTagName('body')[0].appendChild(style);
		document.getElementById("accessibility-modl").innerHTML="<div id='accessibility-modl-content'></div><a id='accessibility-modl-close' href='javascript:clearModl();'>Close</a>";
	}
}

function clearModl(){
  if (document.getElementById("accessibility-modl")){
	document.getElementById("accessibility-modl").remove();
  }
}

function setContent(element,content){
  if (document.getElementById(element)){
	document.getElementById(element).innerHTML=content;
  }
}

function writeContent(element,content){
  if (document.getElementById(element)){
	document.getElementById(element).innerHTML=document.getElementById(element).innerHTML + content;
  }
}

function clearContent(element){
  if (document.getElementById(element)){
	document.getElementById(element).innerHTML="";
  }
}

function createCssRule(parent, name, rules) {
  if (document.getElementById("accessibility-ui-style-" + parent + "")) {
	var style = document.getElementById("accessibility-ui-style-" + parent + "");
  } else {
	var style = document.createElement('style');
	style.setAttribute("id", "accessibility-ui-style-" + parent + "");
	style.type = 'text/css';
	document.getElementsByTagName('body')[0].appendChild(style);
  }

  style.sheet.insertRule(name + "{" + rules + "}", 0);
}

function clearCss(parent){
  if (document.getElementById("accessibility-ui-style-" + parent + "")){
	document.getElementById("accessibility-ui-style-" + parent + "").remove();
  }
}


//--#############################################################
//--############################################################# -- Menus and Controls
//--#############################################################

function showControls(){
	if (!document.getElementById("accessibility-modl")){
		setModl();
		clearContent("accessibility-modl-content");
		writeContent("accessibility-modl-content","<strong>Accessibility Controls</strong>");
		
		writeContent("accessibility-modl-content","<a href=\"javascript:setDisplayMode('');\">None</a>");
		writeContent("accessibility-modl-content","<a href=\"javascript:setDisplayMode('invert');\">Invert</a>");
		writeContent("accessibility-modl-content","<a href=\"javascript:setDisplayMode('contrast');\">Contrast</a>");
	}else{
		clearModl();
	}
}

function setDisplayMode(mode){
	clearCss("mode");
	
	if (mode=="invert"){
		createCssRule("mode", "*", "filter: invert(1); !important;");
		createCssRule("mode", "img", "filter: invert(1); !important;"); //Reverse flip of images
	}
	
	if (mode=="contrast"){
		createCssRule("mode", "*", "color: rgb(0,0,0) !important;background: rgb(255,255,255) !important;");
		createCssRule("mode", "input,button", "border: 2px solid rgb(0,0,0) !important;");
		createCssRule("mode", "a", "outline: none;color:rgb(69,130,240) !important;font-weight: 700 !important;text-decoration: none;");
		createCssRule("mode", "a:hover, a:focus", "border: 4px solid rgb(0,0,0) !important;padding:10px;background: rgb(255,255,255) !important;color:rgb(0,0,0) !important;font-weight: 700 !important;text-decoration: none;");
	}
}

//--#############################################################
//--############################################################# -- Startup CSS
//--#############################################################

createCssRule("startup", "#accessibility-modl", "z-index: 9000000;width:100%;position:fixed;left:0px;top:0px;max-height:100vh;overflow:scroll;background:#f1f1f1;padding:20px;border-bottom:2px solid #000000;font-weight: 400;color: #414141;font-size: 24px;line-height: 1.37;font-smooth: always;font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif;-webkit-font-smoothing: antialiased;");
createCssRule("startup", "#accessibility-modl-close", "display:inline-block;border:2px solid #000000;font-weight: 600;color: #000000;padding:10px;margin:10px;background:#ffffff;");
createCssRule("startup", "#accessibility-modl a", "display:inline-block;border:2px solid #000000;font-weight: 400;color: #000000;padding:10px;margin:5px;background:#ffffff;");

//--#############################################################
//--############################################################# -- Key Controls
//--#############################################################

document.addEventListener("keypress", function(event) {
	var source = event.target;
	var exclude = ['input', 'textarea'];
	
	if (exclude.indexOf(source.tagName.toLowerCase()) === -1) {
		if (event.keyCode == 27) {
			showControls();
		}
		if (event.keyCode == 192) {
			showControls();
		}
	}
	return;
});

