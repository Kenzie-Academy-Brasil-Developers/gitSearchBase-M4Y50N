import { renderRecents } from "./render.js";

//Search Button
document.querySelector("form button").addEventListener("click", () => {
	const inputData = getInput();
	localStorage.setItem("item", inputData);
	event.preventDefault();
	event.target.classList.toggle("disable");

	document.querySelector(".erro").classList.add("hidden");

	const loading = document.querySelector("form button span"),
		btn = document.querySelector("form button");

	btn.innerHTML = "";
	btn.appendChild(loading);

	loading.classList.toggle("hidden");
	loading.classList.add("loading");

	if (inputData != "") {
		setInterval(() => {
			window.location.href = "./pages/profile/index.html";
		}, 1000);

		return "Input Válido!";
	}

	btn.innerHTML = "";
	btn.textContent = "Ver Perfil do GitHub";
	loading.classList.toggle("hidden");
	btn.appendChild(loading);
	event.target.classList.toggle("disable");
	document.querySelector(".erro").classList.toggle("hidden");
});

//Verify input emptyness
function isInputDisable() {
	const input = document.querySelector("#user");

	input.addEventListener("input", () => {
		const btn = document.querySelector("form button");
		btn.classList.remove("disable");
		if (input.value == "") {
			btn.classList.add("disable");
		}
	});
}

isInputDisable();

//Get input data
function getInput() {
	const inputData = document.querySelector("#user");
	return inputData.value;
}

renderRecents();
