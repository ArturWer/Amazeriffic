"use strict";

let els = document.querySelectorAll(".tabs a span");
var toDos = [
	"Закончить писать эту книгу",
	"Вывести Грейси на прогулку в парк",
	"Ответить на электронные письма",
	"Подготовиться к лекции в понедельник",
	"Обновить несколько новых задач",
	"Купить продукты"
];

function removeAllClassesActive(){
	els.forEach(function(element){
		element.removeAttribute("class", "active");
	});
};
function showContent(){
	let ulElement = document.createElement("ul"),
		divContent = document.querySelector(".content");
	toDos.forEach(function(element){
		let liElement = document.createElement("li"),
			newText = document.createTextNode(element);
		liElement.appendChild(newText);
		ulElement.appendChild(liElement);
	});
	divContent.appendChild(ulElement);
};

for (var i = els.length - 1; i >= 0; i--) {
	els[i].addEventListener("click", function (e) {
		e.preventDefault();
		let target = e.target,
			id = target.id,
			content = document.querySelectorAll('.content');
		console.log(id);
		removeAllClassesActive();
		target.className = "active";
		content.forEach(function(element){
			element.textContent = "";
		});
		showContent();
	}, false);
};
