"use strict";

let els = document.querySelectorAll(".tabs a span");
let url = "../json/todos.json";
let toDosJSON = [];
let toDos = null;

function removeAllClassesActive(){
	els.forEach(function(element){
		element.removeAttribute("class", "active");
	});
};
function orginizeByTag(jsonObject){
	let newTagsArray = [];
	let reformattedArray = jsonObject.map(objJSON=>{
		objJSON.tags.forEach(tags=>{
			let checkTag = newTagsArray.indexOf("name");
			newTagsArray.forEach(obj=>{
				/* check if tag is new or old */
				console.log(tags);
				console.log(obj.name);
			});
			console.log(checkTag);
			if (checkTag === -1) newTagsArray.push({"name":tags, "toDos":objJSON.description});
		});	
	});
	console.log(newTagsArray);
	return reformattedArray;
};
function checkToDos() {
	if(!toDos)
		toDos = toDosJSON.map(obj=>{return obj;})
}
function showContent(id){
	let ulElement = document.createElement("ul"),
		divContent = document.querySelector(".content");
	checkToDos();
	if (id === "oldTasks") {
		toDos.forEach(function(element){
			createLiAndAdd(element.description, ulElement);
		});
	} else if (id === "newTasks") {
		for (let i = toDos.length - 1; i >= 0; i--) {
			createLiAndAdd(toDos[i].description, ulElement);
		}
	} else if (id === "tags") {
		let organizedByTag = orginizeByTag(toDos);
		console.log(`organizedByTag: ${organizedByTag}`);
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
	toDosJSON = request.response;
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
