var acAnimated = {Plugins: {}};

/* SplitText Plugin - Starts */
acAnimated.Plugins.SplitText = function(element, options) {
	if (!options.hasOwnProperty("words")) options.words = 1;
	if (!options.hasOwnProperty("chars")) options.chars = 1;
	if (!options.hasOwnProperty("spacing")) options.spacing = 5;
	this.searchTextNodes = function(element) {
		var foundTextNodes = [];
		if (element == null || element == undefined) return foundTextNodes;
		for (var i=0; i<=element.childNodes.length-1; i++) {
			var node = element.childNodes[i];
			if (node.nodeName == "#text") { //text found
				foundTextNodes.push(node);
			} else {
				var foundTextNodes = foundTextNodes.concat(this.searchTextNodes(node));
			}
		}
		return foundTextNodes;
	}
	this.createElement = function(text, relatedNode) {
		var node = document.createElement("div");
		var nodeText = document.createTextNode(text);
		node.nodeText = nodeText;
		node.appendChild(nodeText);
		node.style.display = "inline-block";
		node.style.position = "relative";
		if (text.trim() == "") node.style.width = String(options.spacing) + "px";
		relatedNode.parentNode.insertBefore(node, relatedNode);
		return node;
	}
	this.splitCharacters = function(textNode) {
		var characters = textNode.nodeValue.toString();
		var chars = [];
		if (characters.trim() != "") {
			for (var c=0; c<=characters.length-1; c++) {
				var character = characters.substr(c, 1)
				var char = this.createElement(character, textNode);
				if (character.trim() != "") chars.push(char);
			}
			textNode.parentNode.removeChild(textNode);
		}
		return chars;
	}
	this.splitWords = function(textNode) {
		var textWords = textNode.nodeValue.toString().split(" ");
		var words = [];
		for (var w=0; w<=textWords.length-1; w++) {
			var textWord = textWords[w];
			var word = this.createElement(textWord, textNode);
			if (textWord.trim() != "") words.push(word);
			if (w < textWords.length-1) this.createElement(" ", textNode); //spacing for word
		}
		textNode.parentNode.removeChild(textNode);
		return words;
	}
	this.splitTextNodes = function(textNodes) {
		var splitText = {words: [], chars: []};
		for (var i=0; i<=textNodes.length-1; i++) {
			var textNode = textNodes[i];
			if (options.words == 0) {
				splitText.chars = splitText.chars.concat(this.splitCharacters(textNode));
			} else {
				var words = this.splitWords(textNode);
				if (options.chars == 1) {
					for (var w=0; w<=words.length-1; w++) {
						word = words[w];
						var chars = this.splitCharacters(word.nodeText);
						splitText.chars = splitText.chars.concat(chars);
						word.chars = chars;
					}
				}
				splitText.words = splitText.words.concat(words);
			}
		}
		return splitText;
	}
	var textNodes = this.searchTextNodes(element);
	var splitText = this.splitTextNodes(textNodes);
	return splitText;
}
/* SplitText Plugin - Ends */

acAnimated.randomNumber = function(min, max) {
	var num = min + Math.floor(Math.random() * (max - (min - 1)));
	return num;
}

acAnimated.randomDirection = function(number) {
	var direction = Math.floor(Math.random() * 2);
	if (direction == 0) number = 0 - number;
	return number;
}

acAnimated.animateChar = function(char) {
	var timeline = new TimelineMax({});
	timeline.from(char, acAnimated.randomNumber(3, 5) / 10, {top: acAnimated.randomDirection(acAnimated.randomNumber(10, 50)), rotationZ: acAnimated.randomDirection(acAnimated.randomNumber(90, 360)), rotationX: acAnimated.randomDirection(acAnimated.randomNumber(90, 360)), opacity: 0});
	return timeline;
}

acAnimated.animateWord = function(word) {
	var timeline = new TimelineMax({});
	timeline.from(word, acAnimated.randomNumber(3, 5) / 10, {top: acAnimated.randomDirection(acAnimated.randomNumber(10, 50)), rotationX: acAnimated.randomDirection(acAnimated.randomNumber(90, 360)), opacity: 0});
	return timeline;
}