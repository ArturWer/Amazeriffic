"use strict";

let els = document.querySelectorAll(".tabs a span");
let url = "../json/todos.json";
let toDos = [];

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
			createLiAndAdd(element.description, ulElement);
		});
	} else if (id === "newTasks") {
		for (let i = toDos.length - 1; i >= 0; i--) {
			createLiAndAdd(toDos[i].description, ulElement);
		}
	} else if (id === "tags") {
		let organizedByTag = [
			{
			"name": "покупки",
			"toDos": ["Купить продукты"]
			},
			{
			"name": "рутина",
			"toDos": ["Купить продукты", "Вывести Грейси на прогулку в парк"]
			},
			{
			"name": "писательство",
			"toDos": ["Сделать несколько новых задач", "Закончить писать книгу"]
			},
			{
			"name": "работа",
			"toDos": ["Сделать несколько новых задач", "Подготовиться к лекции в понедельник","Ответить на электронные письма", "Закончить писать книгу"]
			},
			{
			"name": "преподавание",
			"toDos": ["Подготовиться к лекции в понедельник"]
			},
			{
			"name": "питомцы",
			"toDos": ["Вывести Грейси на прогулку в парк "]
			}
		];
		organizedByTag.forEach(function(tagEl){
			let header = document.createElement("h3");
			header.textContent = tagEl.name.toUpperCase();
			divContent.appendChild(header);
			tagEl.toDos.forEach(function(task){
				let li = document.createElement("li");
				li.textContent = task;
				divContent.appendChild(li);
			});
		});
	} else if (id === "addTasks") {
		let inputElement = document.createElement("input"),
			btnElement = document.createElement("button"),
			btnText = document.createTextNode("Add task");
		btnElement.appendChild(btnText);
		divContent.appendChild(inputElement);
		divContent.appendChild(btnElement);
		btnElement.addEventListener("click", function(){
			if (inputElement.value !=="") {
				toDos.push({description: inputElement.value});
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

let request = new XMLHttpRequest();
request.open("GET", url);
request.responseType = "json";
request.send();
request.onload = function(){
	toDos = request.response;
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
