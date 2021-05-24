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
		document.getElementById("accessibility-modl").innerHTML="<div id='accessibility-modl-content'></div><div id='accessibility-modl-close' onclick='javascript:clearModl();'>Close</div>";
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
	document.getElementsByTagName('head')[0].appendChild(style);
  }

  style.sheet.insertRule(name + "{" + rules + "}", 0);
}

function clearCss(parent){
  if (document.getElementById("accessibility-ui-style-" + parent + "")){
	document.getElementById("accessibility-ui-style-" + parent + "").remove();
  }
}

function showControls(){
	setModl();
	writeContent("accessibility-modl-content","<strong>Accessibility Controls</strong>");
}

//--#############################################################
//--############################################################# -- Startup CSS
//--#############################################################

createCssRule("startup", "#accessibility-modl", "background:#f1f1f1;padding:20px;font-weight: 300;color: #414141;font-size: 17px;line-height: 1.37;font-smooth: always;font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif;-webkit-font-smoothing: antialiased;");

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
