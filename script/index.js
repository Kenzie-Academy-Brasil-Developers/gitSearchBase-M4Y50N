function search(nome) {
	fetch(`https://api.github.com/users/${nome}`)
		.then((response) => response.json())
		.then((response) => {
			const userSearch = document.querySelector("#userSearch"),
				nome = document.createElement("h3"),
				bio = document.createElement("p"),
				repos_url = document.createElement("a");

			nome.textContent = response.login;
			bio.textContent = response.bio;
			repos_url.textContent = "Repositórios";
			repos_url.href = response.repos_url;

			userSearch.append(nome, bio, repos_url);

			return response;
		});
}
function getName() {
	return document.querySelector("#user");
}
