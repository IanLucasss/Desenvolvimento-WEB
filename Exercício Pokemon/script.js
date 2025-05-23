$.getJSON("https://pokeapi.co/api/v2/pokemon?limit=168&offset=0", (response) => {
    for (let P of response.results) {
      
        $.getJSON(P.url, (pokemonData) => {
            document.getElementById("pokemons").innerHTML +=
            `
            <table class="table">
                <tr>
                <td>${pokemonData.id}</td>
                <td>${pokemonData.name}</td>
                <td><img src="${pokemonData.sprites.front_default}"></td>
                <td>${pokemonData.height}</td>
                <td>${pokemonData.weight}</td>
                </tr>
            `
        });
    }
});
