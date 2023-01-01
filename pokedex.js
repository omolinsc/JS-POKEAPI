
//! primero de todo hacemos el FETCH para solicitar la información a la POKEAPI
async function getPokemons() {

    // hacemos el primer fetch para obtener la lista de los 151 pokemons
    async function allPokemons() {
        return fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=176')
        .then(res => res.json());
    }
    const fetchResult  = await allPokemons();
    // console.log(fetchResult);

    // usamos un FOR para mapear cada pokemon individualmente
    for (let i = 0; i < fetchResult.results.length; i++){
        async function onePokemon() {
            return fetch(fetchResult.results[i].url)
            .then(res => res.json());
        }
       
        const fetchPokemon  = await onePokemon();
        // console.log(fetchPokemon);

        // llamamos a la función para crear la carta individual de cada pokemon
        renderPokemons(fetchPokemon);
    }        
};

// función para crear las cartas y meterlas en el HTML dinámicamente
function renderPokemons(pokemon) {

    const list$$ = document.querySelector("#pokedex")
    
    const card$$ = document.createElement("li");
        card$$.setAttribute("class","card");
        card$$.setAttribute("id",pokemon.id);
    const image$$ = document.createElement("img");
        image$$.setAttribute("class","card-image")
    const name$$ = document.createElement("h3");
        name$$.setAttribute("class","card-title");

    name$$.textContent = pokemon.id + " - " + pokemon.forms[0].name;
    image$$.src = pokemon.sprites.other["official-artwork"].front_default;

    list$$.appendChild(card$$);
    card$$.appendChild(name$$);
    card$$.appendChild(image$$);


    card$$.addEventListener("click", getStats);


    // damos estilos según el tipo de pokemon
    for (let i = 0; i < pokemon.types.length; i++){
        if (pokemon.types[i].type.name === "grass"){card$$.classList.add("grass");}
        if (pokemon.types[i].type.name === "fire"){card$$.classList.add("fire");}
        if (pokemon.types[i].type.name === "water"){card$$.classList.add("water");}
        if (pokemon.types[i].type.name === "bug"){card$$.classList.add("bug");}
        if (pokemon.types[i].type.name === "normal"){card$$.classList.add("normal");}
        if (pokemon.types[i].type.name === "poison"){card$$.classList.add("poison");}
        if (pokemon.types[i].type.name === "electric"){card$$.classList.add("electric");}
        if (pokemon.types[i].type.name === "ground"){card$$.classList.add("ground");}
        if (pokemon.types[i].type.name === "fighting"){card$$.classList.add("fighting");}
        if (pokemon.types[i].type.name === "fairy"){card$$.classList.add("fairy");}
        if (pokemon.types[i].type.name === "psychic"){card$$.classList.add("psychic");}
        if (pokemon.types[i].type.name === "rock"){card$$.classList.add("rock");}
        if (pokemon.types[i].type.name === "ice"){card$$.classList.add("ice");}
        if (pokemon.types[i].type.name === "dragon"){card$$.classList.add("dragon");}

        if (pokemon.types[i].type.name === "flying"){
            const type$$ = document.createElement("div");
            type$$.setAttribute("class","flying");
            card$$.appendChild(type$$);
        }

        if (pokemon.types[i].type.name === "ghost"){
            const type$$ = document.createElement("div");
            type$$.setAttribute("class","ghost");
            card$$.appendChild(type$$);
        }
    }

    // damos estilo diferenciado a los pokemons legendarios
    const legendary = ["zapdos", "articuno", "moltres", "mewtwo", "mew"];
    for ( let i = 0; i < legendary.length; i++){
        if (legendary[i] === pokemon.name){
            card$$.classList.add("legendary");
            card$$.setAttribute("isLegendary","true");
        }
    }
}

async function getStats (event){

    async function getPokemonStats(event) {
        
        return fetch("https://pokeapi.co/api/v2/pokemon/"+ event.path[1].id)
        .then(res => res.json());
        }
 
    const pokemonStats = await getPokemonStats(event);
    renderPokemonStats (pokemonStats);

};

function renderPokemonStats(pokemon){

    console.log(pokemon)
    const bigCard$$ = document.createElement("div");
        bigCard$$.setAttribute("class","fullCard");

    const cardContainer$$ = document.createElement("div");
        cardContainer$$.setAttribute("class","fullCard__container");    
        cardContainer$$.textContent = pokemon.name;

    const cardClose$$ = document.createElement("div");
        cardClose$$.setAttribute("class","closeButton");
        cardClose$$.textContent = "X";
    
    
    document.body.appendChild(bigCard$$);
    bigCard$$.appendChild(cardClose$$);
    bigCard$$.appendChild(cardContainer$$);
    
    cardClose$$.addEventListener("click",removeCard);

}

function removeCard(event) {
    // window.removeEventListener("click", showStats);
    // console.log(event)
    const removeCard = event.path[1];
    // removeCard.remove();
    removeCard.remove();

}


window.onload = getPokemons();
