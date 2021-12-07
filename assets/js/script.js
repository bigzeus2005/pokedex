var searchFormEl = document.getElementById("search-container");
var searchInputEl = document.getElementById("searchbar");
var generateRandomBtn = document.getElementById("randomBtn");
var giphyResultsEl = document.getElementById("giphyResults");

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
    // test url: https://pokeapi.co/api/v2/pokemon/?limit=900
    var requestUrl = `https://pokeapi.co/api/v2/pokemon/${keyword}`;

    fetch(requestUrl)
    .then(function (response) {
        if (response.ok) {
            response.json()
            .then(function (data) {        
                displayPokemonResults(data);
            })
        } else {
                alert("Error: Pokemon not found. Please try another search.");
            }
    })
}

function searchGiphy(keyword) {
    // call to Giphy search/random here
    var apiKey = "ky6DKMmVLewPRpxK1Wb4SLGqVcFOHwUh";
    var requestUrl = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&rating=pg&tag=${keyword}`;

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        displayGiphyResults(data);
    })
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
    pokeTitleEl.textContent = pokemon.name.toUpperCase();
    pokeTitleEl.style.display = "inline";
    newPokeEl.appendChild(pokeTitleEl);
    
    var heightWeightBaseEl = document.createElement("p"); 
    heightWeightBaseEl.textContent = `Height: ${pokemon.height} \t Weight: ${pokemon.weight} \t Base Experience: ${pokemon.base_experience}`;
    newPokeEl.appendChild(heightWeightBaseEl);

    var colorShapeEl = document.createElement("p");
    colorShapeEl.textContent = `pokemon color`; //from second api call   
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

function displayGiphyResults(giphy) {
    var gifImgEl = document.createElement("img");
    gifImgEl.src = giphy.data.images.original.url;
    gifImgEl.alt = `image of ${giphy.data.title}`;
    gifImgEl.style.maxHeight = "100%";
    gifImgEl.style.maxWidth = "100%";
    gifImgEl.style.height = "auto";
    giphyResultsEl.appendChild(gifImgEl);
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