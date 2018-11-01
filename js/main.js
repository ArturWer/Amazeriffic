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
function showContent(id){
	let ulElement = document.createElement("ul"),
		divContent = document.querySelector(".content");
	if (id === "oldTasks") {
		toDos.forEach(function(element){
			createLiAndAdd(element, ulElement);
		});
	} else if (id === "newTasks") {
		for (let i = toDos.length - 1; i >= 0; i--) {
			createLiAndAdd(toDos[i], ulElement);
		}
	} else if (id === "addTasks") {
		let inputElement = document.createElement("input"),
			btnElement = document.createElement("button"),
			btnText = document.createTextNode("Add task");
		btnElement.appendChild(btnText);
		divContent.appendChild(inputElement);
		divContent.appendChild(btnElement);
		btnElement.addEventListener("click", function(){
			if (inputElement.value !=="") {
				toDos.push(inputElement.value);
				inputElement.value = "";
			}
		}, false);
	}
	divContent.appendChild(ulElement);
};
function createLiAndAdd(text, ulElement){
	let liElement = document.createElement("li"),
		newText = document.createTextNode(text);
	liElement.appendChild(newText);
	ulElement.appendChild(liElement);
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
		showContent(id);
	}, false);
}
