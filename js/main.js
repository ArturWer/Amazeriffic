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
	jsonObject.forEach(obj=>{
		obj.tags.forEach(tags=>{
			if (newTagsArray.length > 0) {
				let isTag = newTagsArray.indexOf(tags);
				if (isTag === -1) {
					newTagsArray.push(tags);
				}
			} else {
				newTagsArray.push(tags);
			}
		});	
	}); 
	console.log(newTagsArray);
	/* find all tasks for each tag*/
	let tasksArr = newTagsArray.map(tag=>{
		console.log(tag);
		console.log(jsonObject);
		let toDos = [];
		jsonObject.forEach(obj=>{
			let isTask = obj.tags.indexOf(tag);
			if( isTask > -1){
				toDos.push(obj.description);
			};
		});
		return {"name":tag, "toDos": toDos};
	});
	console.log(tasksArr);
	return tasksArr;
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
