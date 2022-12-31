
//! primero de todo hacemos el FETCH para solicitar la información a la POKEAPI
async function getPokemons() {   
    //* pedimos la información

    // const fetchResult = {};

    async function allPokemons() {
        return fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151')
        .then(res => res.json());
    }
       
    const fetchResult  = await allPokemons();
    console.log(fetchResult);

    for (let i = 0; i < fetchResult.results.length; i++){
        async function onePokemon() {
            return fetch(fetchResult.results[i].url)
            .then(res => res.json());
        }
       
        const fetchPokemon  = await onePokemon();
        console.log(fetchPokemon);

        renderPokemons(fetchPokemon);
    }        
};

function renderPokemons(pokemon) {

    const list$$ = document.querySelector("#pokedex")
    
    const card$$ = document.createElement("li");
        card$$.setAttribute("class","card");
    const image$$ = document.createElement("img");
        image$$.setAttribute("class","card-image")
    const name$$ = document.createElement("h3");
        name$$.setAttribute("class","card-title");

    name$$.textContent = pokemon.id + " - " + pokemon.forms[0].name;
    image$$.src = pokemon.sprites.other["official-artwork"].front_default;

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
    }

    list$$.appendChild(card$$);
    card$$.appendChild(name$$);
    card$$.appendChild(image$$);

    list$$.addEventListener("click", showStats(event));

}

function showStats (event){

}




window.onload = getPokemons();
