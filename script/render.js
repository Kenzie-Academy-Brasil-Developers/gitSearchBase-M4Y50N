import { getRepos } from "./request.js";

const recentes =
	localStorage.getItem("recentes") != null
		? JSON.parse(localStorage.getItem("recentes"))
		: [];

//render
function render(response) {
	const title = document.querySelector("title");

	response.message == "Not Found"
		? (title.textContent = "Usuário não encontrado")
		: (title.textContent = `${response.login}`);

	const userSearch = document.querySelector("#userSearch"),
		nome = document.createElement("h3"),
		bio = document.createElement("p"),
		repos_url = document.createElement("ul"),
		profile = document.createElement("img"),
		head = document.createElement("div"),
		nomeBio = document.createElement("div"),
		contentBtn = document.createElement("div"),
		btn1 = document.createElement("a"),
		btn2 = document.createElement("a");

	if (response.message == "Not Found") {
		nome.textContent = "Usuário não encontrado!";

		head.classList.add("head");
		nomeBio.classList.add("nome-bio");

		nomeBio.appendChild(nome);

		btn2.textContent = "Pesquisar outro usuário";
		btn2.href = `${window.location.origin}`;

		contentBtn.classList.add("content-btn-prof");
		contentBtn.append(btn2);

		head.append(nomeBio, contentBtn);

		userSearch.appendChild(head);

		return "não encontrado";
	}
	const atual = {
		id: response.id,
		name: response.login,
		profile: response.avatar_url,
	};

	if (recentes.length == 0) {
		recentes.push(atual);
	} else if (recentes.length == 1) {
		recentes[0].id != atual.id ? recentes.push(atual) : recentes;
	} else {
		const arrR = recentes.filter((e) => {
			return e.id != atual.id;
		});

		arrR.length == recentes.length ? recentes.push(atual) : recentes;
		recentes.length > 3 ? recentes.shift() : recentes;
	}

	localStorage.setItem("recentes", JSON.stringify(recentes));

	profile.src = response.avatar_url;
	nome.textContent = response.login;
	bio.textContent = response.bio;
	btn1.textContent = "Email";
	btn1.href = `mailto:${response.email ? response.email : "Email inexistente"}`;
	btn2.textContent = "Troca de usuário";
	btn2.href = `${window.location.origin}`;

	contentBtn.classList.add("content-btn-prof");
	contentBtn.append(btn1, btn2);

	repos_url.classList.add("card-container");
	head.classList.add("head");
	nomeBio.classList.add("nome-bio");

	nomeBio.append(nome, bio);

	head.append(profile, nomeBio, contentBtn);

	const repos = renderRepos(response.repos_url).then((res) =>
		res.forEach((elt) => {
			const li = document.createElement("li"),
				h3 = document.createElement("h3"),
				p = document.createElement("p"),
				contentBtn = document.createElement("div"),
				btn1 = document.createElement("a"),
				btn2 = document.createElement("a"),
				cardHead = document.createElement("div");

			li.classList.add("card");

			cardHead.classList.add("card-head");
			h3.textContent = elt.name;
			p.textContent = elt.description;

			cardHead.append(h3, p);

			contentBtn.classList.add("content-btn");
			btn1.textContent = "Repositorio";
			btn1.href = elt.html_url;
			btn2.textContent = "Demo";
			btn2.href = `https://${response.login}.github.io/${elt.name}`;

			contentBtn.append(btn1, btn2);

			li.append(cardHead, contentBtn);
			repos_url.appendChild(li);
		})
	);

	userSearch.append(head, repos_url);
}

//render repos
function renderRepos(repos) {
	return getRepos(repos);
}
//Render recents
function renderRecents() {
	const recentes = JSON.parse(localStorage.getItem("recentes")),
		tagRecentes = document.querySelector(".recentes");

	const html = `<div class="rec">
		<img
			src="https://avatars.githubusercontent.com/u/108320342?v=4"
			alt="recente"
		/>
		<button class="hidden">Ir para perfil</button>
	</div>`;

	recentes.forEach((e) => {
		const rec = document.createElement("div"),
			img = document.createElement("img"),
			btn = document.createElement("button");

		rec.classList.add("rec");
		img.src = e.profile;
		btn.classList.add("hidden");
		btn.value = e.name;
		btn.textContent = "Ir para o perfil";

		rec.append(img, btn);

		tagRecentes.appendChild(rec);
	});

	recentHover();
}

function recentHover() {
	const recentes = document.querySelector(".recentes");

	const arrayRec = [...recentes.children];

	arrayRec.forEach((e) => {
		e.querySelector("img").addEventListener("mouseover", () => {
			e.querySelector("img").classList.toggle("img-hover");
			e.querySelector("button").classList.toggle("hidden");
			e.querySelector("button").classList.toggle("button-hover");
		});
		e.addEventListener("mouseleave", () => {
			e.querySelector("img").classList.toggle("img-hover");
			e.querySelector("button").classList.toggle("hidden");
			e.querySelector("button").classList.toggle("button-hover");
		});
	});
}

export { render, renderRecents };
