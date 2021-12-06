var searchFormEl = document.getElementById("search-container");
var searchInputEl = document.getElementById("searchbar");
var generateRandomBtn = document.getElementById("randomBtn");

function formSubmitHandler(event) {
    event.preventDefault();
    var searchInput = searchInputEl.value.trim();
    if (searchInput !== "") {
        searchPokemon(searchInput);
        // searchGiphy(searchInput);
    }
}

function searchPokemon(keyword) {
    // call Pokemon api
    // test url: https://pokeapi.co/api/v2/pokemon/?limit=900
    var requestUrl = `https://pokeapi.co/api/v2/pokemon/${keyword}`;

    fetch(requestUrl)
    .then(function (response) {
        if (response.ok) {
            response.json()
            .then(function (data) {
                console.log(data)   //TODO - remove this later
        
                var pokemon = data
                displayPokemonResults(data);
            })
        } else {
                alert("Error: Pokemon not found. Please try another search.");
            }

    })

}

function searchGiphy(keyword) {
    // call to Giphy search/random here
    var requestUrl = "";
    var apiKey = "ky6DKMmVLewPRpxK1Wb4SLGqVcFOHwUh";

    // fetch(requestUrl)
    // .then(function (response) {
    //     return response.json();
    // })
    // .then(function (data) {
    //     console.log(data)   //TODO - remove this later

    //     displayGiphyResults(data);
    // })
}

function displayPokemonResults(pokemon) {
    var pokeContainerEl = document.getElementById("randomPokemon");
    var newPokeEl = document.createElement("section");
    pokeContainerEl.appendChild(newPokeEl);
    // clear any existing info if exists
    pokeContainerEl.removeChild(document.querySelector("p"));
    // removeAllChildNodes(newPokeEl);

    var pokeImgEl = document.createElement("img");
    pokeImgEl.src = setPokeImgUrl(pokemon.id);
    pokeImgEl.alt = `image of ${pokemon.name}`;
    pokeImgEl.style.display = "inline"
    newPokeEl.appendChild(pokeImgEl);

    var pokeTitleEl = document.createElement("h2");
    pokeTitleEl.textContent = pokemon.name;
    pokeTitleEl.style.display = "inline";
    newPokeEl.appendChild(pokeTitleEl);
    
    var heightWeightEl = document.createElement("p"); 
    heightWeightEl.textContent = `Height: ${pokemon.height}   Weight: ${pokemon.weight}`;
    newPokeEl.appendChild(heightWeightEl);

    var typesEl = document.createElement("p");
    typesEl.textContent = getTypes(pokemon.types);
    newPokeEl.appendChild(typesEl);

    var baseExperienceEl = document.createElement("p");
    baseExperienceEl.textContent = pokemon.base_experience;
    newPokeEl.appendChild(baseExperienceEl);
}

function setPokeImgUrl(id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

function getTypes(types) {
    var typeStr = ""

    if (types.length === 1) {
        typeStr += "Type: " + types[0].type.name; 
    } else {
        typeStr = "Types: "
        for (var i = 0; i < types.length; i++) {
            typeStr += types[i].type.name + ", ";
        }
        // remove trailing comma and space
        typeStr = typeStr.slice(0, -2);
    }

    console.log(types.length);
    return typeStr;
}

function displayGiphyResults(giphy) {

}

function generateRandomPokemon() {
    var max = 898 // number of pokemon in api TODO remove hard-coded max
    var randomPoke = Math.floor(Math.random() * max);

    searchPokemon(randomPoke);
    // searchGiphy(randomPoke);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// Event Handlers
searchFormEl.addEventListener("submit", formSubmitHandler);
generateRandomBtn.addEventListener("click", generateRandomPokemon);