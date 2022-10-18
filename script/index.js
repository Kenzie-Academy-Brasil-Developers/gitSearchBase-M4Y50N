//Search Button
document.querySelector("form button").addEventListener("click", () => {
	const inputData = getInput();
	localStorage.setItem("item", inputData);
	event.preventDefault();
	event.target.classList.add("disable");
	document.querySelector("form button span").classList.toggle("hidden");
	document.querySelector("form button span").classList.add("loading");

	setInterval(() => {
		window.location.href = "./pages/profile/index.html";
	}, 1000);
});

//Get input data
function getInput() {
	const inputData = document.querySelector("#user");
	return inputData.value;
}
