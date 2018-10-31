"use strict";

let els = document.querySelectorAll(".tabs a span");

function removeAllClassesActive(){
	els.forEach(function(element){
		element.removeAttribute("class", "active");
	});
};

for (var i = els.length - 1; i >= 0; i--) {
	els[i].addEventListener("click", function (e) {
	e.preventDefault();
	let target = e.target,
		id = target.id;
	console.log(id);
	removeAllClassesActive();
	target.className = "active";
}, false);
};
