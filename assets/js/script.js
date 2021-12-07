var searchFormEl = document.getElementById("search-container");
var searchInputEl = document.getElementById("searchbar");
var generateRandomPokemonBtn = document.getElementById("randomBtn");
var giphyResultsEl = document.getElementById("giphyResults");
var pokemonResultsEl = document.getElementById("pokemonResults"); // pokemon list ∆ id
var showEvoBtn = document.getElementById("randomEvoBtn");

var pokemonList = [];
var showEvolutions = false;

function generatePokemonlist() {
    // get list of all pokemon available in api, then call function to display on page
    var requestUrl = "https://pokeapi.co/api/v2/pokemon/?limit=900";
    fetch(requestUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    for (var i = 0; i < data.results.length; i++) {
                        var pokemon = data.results[i].name;
                        pokemonList.push(pokemon);
                    }
                    displayPokemonList(pokemonList);
                })
            } else {
                console.log("Error: Pokemon not found.");
            }
        })
}

function displayPokemonList(pokemonList) {
    var pokeUl = document.querySelector(".pure-menu-list");
    // pokemonResultsEl.style.overflowY = "auto";    //temp
        // clear before displaying current list
        removeAllChildNodes(pokeUl);

    for (pokemon in pokemonList) {
        var pokeListEl = document.createElement("li");
        var pokeLinkEl = document.createElement("a");
        pokeLinkEl.textContent = pokemonList[pokemon];
        pokeLinkEl.href = `javascript:searchFromLink(\"${pokemonList[pokemon]}\")`;
        pokeUl.appendChild(pokeListEl);
        pokeListEl.appendChild(pokeLinkEl);
    }
}

function displayFilteredList() {
    // update list of pokemon displayed that match user input in search box
    var filteredPokemonList = [];
    for (pokemon of pokemonList) {
        var searchTerm = searchInputEl.value.toLowerCase();
        if (pokemon.match(`\.?${searchTerm}`)) {
            filteredPokemonList.push(pokemon);
        }
    }
    displayPokemonList(filteredPokemonList);
}

function searchFromLink(keyword) {
    searchPokemon(keyword);
    searchGiphy(keyword);
}

function formSubmitHandler(event) {
    event.preventDefault();
    var searchInput = searchInputEl.value.trim();
    if (searchInput !== "") {
        searchPokemon(searchInput);
        searchGiphy(searchInput);
    }
}

function searchPokemon(keyword) {
    // call Pokemon api
    var requestUrl = `https://pokeapi.co/api/v2/pokemon/${keyword}`;

    fetch(requestUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    // second api call to retrieve additional pokemon info
                    secondaryPokemonSearch(keyword);    //TODO revisit placement
                    displayPokemonResults(data);
                })
            } else {
                alert("Error: Pokemon not found. Please try another search.");
            }
        })
}

function secondaryPokemonSearch() {
    // call to pokemon-species api to retrieve description, color, and shape

}

function generateRandomPokemon() {
    var max = 898 // number of pokemon in api TODO remove hard-coded max
    var randomPoke = Math.floor(Math.random() * max);

    searchPokemon(randomPoke);
    // searchGiphy(randomPoke);
}

function displayPokemonResults(pokemon) {
    var pokeContainerEl = document.getElementById("randomPokemon");
    var newPokeEl = document.createElement("section");
    pokeContainerEl.appendChild(newPokeEl);
    // clear any existing info if exists
    removeAllChildNodes(newPokeEl);

    var pokeImgEl = document.createElement("img");
    pokeImgEl.src = setPokeImgUrl(pokemon.id);
    pokeImgEl.alt = `image of ${pokemon.name}`;
    pokeImgEl.style.display = "inline"
    newPokeEl.appendChild(pokeImgEl);

    var pokeTitleEl = document.createElement("h2");
    pokeTitleEl.textContent = pokemon.name.toUpperCase();
    pokeTitleEl.style.display = "inline";
    newPokeEl.appendChild(pokeTitleEl);

    var heightWeightBaseEl = document.createElement("p");
    heightWeightBaseEl.textContent = `Height: ${pokemon.height} \t Weight: ${pokemon.weight} \t Base Experience: ${pokemon.base_experience}`;
    newPokeEl.appendChild(heightWeightBaseEl);

    var colorShapeEl = document.createElement("p");
    colorShapeEl.textContent = `pokemon color and shape`; //from second api call   
    newPokeEl.appendChild(colorShapeEl);

    var typesEl = document.createElement("p");
    typesEl.textContent = getTypes(pokemon.types);
    newPokeEl.appendChild(typesEl);

    var abilitiesEl = document.createElement("p");
    abilitiesEl.textContent = getAbilities(pokemon.abilities);
    newPokeEl.appendChild(abilitiesEl);

    var descriptionEl = document.createElement("p");
    descriptionEl.textContent = "Description of this Pokemon goes here"; //from second api call
    newPokeEl.appendChild(descriptionEl);
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
    return typeStr;
}

function getAbilities(abilities) {
    var abilityStr = ""

    if (abilities.length === 1) {
        abilityStr += "Abilities: " + abilities[0].ability.name;
    } else {
        abilityStr = "Abilities: "
        for (var i = 0; i < abilities.length; i++) {
            abilityStr += abilities[i].ability.name + ", ";
        }
        // remove trailing comma and space
        abilityStr = abilityStr.slice(0, -2);
    }
    return abilityStr;
}

function showHideEvo() {
    // toggle between pokemon details and evolution info
    if (showEvolutions) {
        // display evo data

        // hide details


    } else {
        // show details

        // hide hide details

    }
        // change state
        showEvolutions = !showEvolutions;
}

function searchGiphy(keyword) {
    // call to Giphy search/random here
    var apiKey = "ky6DKMmVLewPRpxK1Wb4SLGqVcFOHwUh";
    var requestUrl = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&rating=pg&tag=${keyword}`;

    fetch(requestUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    searchInputEl.textContent = "";
                    displayGiphyResults(data);
                })
            }
        })
}

function displayGiphyResults(giphy) {
    //  clear container
    removeAllChildNodes(giphyResultsEl);
    var gifImgEl = document.createElement("img");
    try {
        gifImgEl.src = giphy.data.images.original.url;
        gifImgEl.alt = `image of ${giphy.data.title}`;
    }
    catch {
        // display placeholder if image does not load
        gifImgEl.src = "./assets/images/placeholder.svg";
        gifImgEl.alt = "image not available";
    }

    gifImgEl.style.maxHeight = "95%";
    gifImgEl.style.maxWidth = "95%";
    gifImgEl.style.height = "auto";
    giphyResultsEl.appendChild(gifImgEl);
}

function generateRandomGif() {
    var randomNum = Math.floor(Math.random() * pokemonList.length);
    var keyword = pokemon[randomNum];

    // searchGiphy(keyword);    //TODO enable this later (disabled due to api call limit)
}

function removeAllChildNodes(parent) {
    // function to clear any child nodes
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// call function to generate Pokemon list on load;
generatePokemonlist();
generateRandomPokemon();

// Event Handlers
searchFormEl.addEventListener("submit", formSubmitHandler);
generateRandomPokemonBtn.addEventListener("click", generateRandomPokemon);
showEvoBtn.addEventListener("click", showHideEvo);
// generateRandomGifBtn.addeventListener("click", generateRandomGif);
searchInputEl.addEventListener("keyup", displayFilteredList);