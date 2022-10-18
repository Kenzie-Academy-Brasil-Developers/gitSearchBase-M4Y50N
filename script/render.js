import { getRepos } from "./request.js";

//render
function render(response) {
	const title = document.querySelector("title");

	title.textContent = `${response.login}`;

	const userSearch = document.querySelector("#userSearch"),
		nome = document.createElement("h3"),
		bio = document.createElement("p"),
		repos_url = document.createElement("ul"),
		profile = document.createElement("img"),
		head = document.createElement("div"),
		nomeBio = document.createElement("div");

	profile.src = response.avatar_url;
	nome.textContent = response.login;
	bio.textContent = response.bio;

	repos_url.classList.add("card-container");
	head.classList.add("head");
	nomeBio.classList.add("nome-bio");

	nomeBio.append(nome, bio);

	head.append(profile, nomeBio);

	const repos = renderRepos(response.repos_url).then((res) =>
		res.forEach((elt) => {
			const li = document.createElement("li"),
				h3 = document.createElement("h3"),
				p = document.createElement("p"),
				contentBtn = document.createElement("div"),
				btn1 = document.createElement("a"),
				btn2 = document.createElement("a");

			li.classList.add("card");

			h3.textContent = elt.name;
			p.textContent = elt.description;

			contentBtn.classList.add("content-btn");
			btn1.textContent = "Repositorio";
			btn1.href = elt.html_url;

			contentBtn.append(btn1, btn2);

			li.append(h3, p, contentBtn);
			repos_url.appendChild(li);
		})
	);

	userSearch.append(head, repos_url);
}

//render repos
function renderRepos(repos) {
	return getRepos(repos);
}

export { render };
