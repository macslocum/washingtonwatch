/*-  Utility functions
----------------------------------------------------------------------*/
/*
	Add Load Event
*/
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}

/*
	IE Fix: Son of Suckerfish (modified for IE5/Mac friendliness)
*/
function ieHover(els) {
	for (var i=0; i < els.length; i++) {
		els[i].onmouseover = function() {
			this.className = safeAppend(this.className, "ie-hover");
		}

		els[i].onmouseout = function() {
			this.className = this.className.replace(new RegExp("( ?|^)ie-hover\\b"), "");
		}
	}
}

/*
	Smart string concatenation
*/
function safeAppend(target, str) {
	target += (target.length > 0 ? " ": "") + str;
	return target;
}

/*
	Get parent element
*/
function getParent(el, pTagName) {
	if (el == null) return null;
	else if (el.nodeType == 1 && el.tagName.toLowerCase() == pTagName.toLowerCase())	// Gecko bug, supposed to be uppercase
		return el;
	else
		return getParent(el.parentNode, pTagName);
}


/*
	Get Inner Text
*/
function getInnerText(el) {
	if (typeof el == "string") return el;
	if (typeof el == "undefined") { return el };
	if (el.innerText) return el.innerText;	//Not needed but it is faster
	var str = "";
	
	var cs = el.childNodes;
	var l = cs.length;
	for (var i = 0; i < l; i++) {
		switch (cs[i].nodeType) {
			case 1: //ELEMENT_NODE
				str += getInnerText(cs[i]);
				break;
			case 3:	//TEXT_NODE
				str += cs[i].nodeValue;
				break;
		}
	}
	return str;
}

/*
	Insert node after referenceNode in parent
*/
function insertAfter(parent, node, referenceNode) {
	parent.insertBefore(node, referenceNode.nextSibling);
}

/*
	Trim function
*/
function trim(str) {
	return str.replace(/^\s*|\s*$/g,"");
}

/*
	Find full word (needle) in a string (haystack)
*/
function findWord(needle, haystack) {
	return haystack.match(needle + "\\b");
}

/*
	Used to replace a word (oldNeedle) with a new word (newNeedle), as found in a string (haystack)
*/
function replaceWord(oldNeedle, newNeedle, haystack) {
	return haystack.replace(new RegExp(oldNeedle + "\\b", "g"), newNeedle);
}
