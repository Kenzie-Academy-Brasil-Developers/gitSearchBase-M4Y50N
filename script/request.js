//importe render
import { render } from "./render.js";

const baseURL = "https://api.github.com/users",
	myHeaders = {
		"Content-Type": "application/json",
	};

function getUser(item) {
	fetch(`${baseURL}/${item}`, myHeaders)
		.then((response) => response.json())
		.then((response) => {
			render(response);
		});
}

function getRepos(url) {
	const repos = fetch(url, myHeaders).then((response) => response.json());

	return repos;
}

export { getUser, getRepos };
