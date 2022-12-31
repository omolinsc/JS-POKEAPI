
//! primero de todo hacemos el FETCH para solicitar la información a la POKEAPI
async function getPokemons() {   
    //* pedimos la información

    // const fetchResult = {};

    async function allPokemons() {
        return fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150')
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
    image$$.src = pokemon.sprites.other.dream_world.front_default;

    list$$.appendChild(card$$);
    card$$.appendChild(name$$);
    card$$.appendChild(image$$);

}




window.onload = getPokemons();
