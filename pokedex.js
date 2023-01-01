
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

// hacemos FETCH al pokemon clikeado para saber sus estadísticas
async function getStats (event){
    async function getPokemonStats(event) {
        return fetch("https://pokeapi.co/api/v2/pokemon/"+ event.path[1].id)
        .then(res => res.json());
        } 
    const pokemonStats = await getPokemonStats(event);
    renderPokemonStats (pokemonStats);
};

// creamos una vista con estadísticas para el pokemon que le hacemos click
function renderPokemonStats(pokemon){

    console.log(pokemon)
    // carta global
    const bigCard$$ = document.createElement("div");
        bigCard$$.setAttribute("class","fullCard");

    // parte inferior de la carta
    const cardBottom$$ = document.createElement("div");
        cardBottom$$.setAttribute("class","cardBottom");    
    const cardName$$ = document.createElement("h1");
        cardName$$.setAttribute("class","pokemon--name");
        cardName$$.textContent = pokemon.name;
    const cardTypes$$ = document.createElement("div");
        cardTypes$$.setAttribute("class","pokemon--Types");

        for (let i = 0; i < pokemon.types.length; i++){
            const cardType = document.createElement("p");
            cardType.setAttribute("class", "pokemon--Types--type")
            cardType.textContent = pokemon.types[i].type.name;

            if (pokemon.types[i].type.name === "grass"){cardType.classList.add("grass");}
            if (pokemon.types[i].type.name === "fire"){cardType.classList.add("fire");}
            if (pokemon.types[i].type.name === "water"){cardType.classList.add("water");}
            if (pokemon.types[i].type.name === "bug"){cardType.classList.add("bug");}
            if (pokemon.types[i].type.name === "normal"){cardType.classList.add("normal");}
            if (pokemon.types[i].type.name === "poison"){cardType.classList.add("poison");}
            if (pokemon.types[i].type.name === "electric"){cardType.classList.add("electric");}
            if (pokemon.types[i].type.name === "ground"){cardType.classList.add("ground");}
            if (pokemon.types[i].type.name === "fighting"){cardType.classList.add("fighting");}
            if (pokemon.types[i].type.name === "fairy"){cardType.classList.add("fairy");}
            if (pokemon.types[i].type.name === "psychic"){cardType.classList.add("psychic");}
            if (pokemon.types[i].type.name === "rock"){cardType.classList.add("rock");}
            if (pokemon.types[i].type.name === "ice"){cardType.classList.add("ice");}
            if (pokemon.types[i].type.name === "dragon"){cardType.classList.add("dragon");}

            cardTypes$$.appendChild(cardType);
        }

        cardTypes$$.textContent = pokemon.name;
    const cardBaseStats$$ = document.createElement("h2");
        cardBaseStats$$.setAttribute("class","pokemon--BaseStats");
        cardBaseStats$$.textContent = "Base Stats";
        
        //barras de estadísticas
        const cardHP$$ = document.createElement("p");
        cardHP$$.setAttribute("class","pokemon--HP");
        cardHP$$.textContent = pokemon.stats[0].stat.name + " - " + pokemon.stats[0].base_stat;
        
        const cardAttack$$ = document.createElement("p");
        cardAttack$$.setAttribute("class","pokemon--Attack");
        cardAttack$$.textContent = pokemon.stats[1].stat.name + " - " + pokemon.stats[1].base_stat;

        const cardDefense$$ = document.createElement("p");
        cardDefense$$.setAttribute("class","pokemon--Defense");
        cardDefense$$.textContent = pokemon.stats[2].stat.name + " - " + pokemon.stats[2].base_stat;

        const cardSpeed$$ = document.createElement("p");
        cardSpeed$$.setAttribute("class","pokemon--Speed");
        cardSpeed$$.textContent = pokemon.stats[5].stat.name + " - " + pokemon.stats[5].base_stat;

        const cardExp$$ = document.createElement("p");
        cardExp$$.setAttribute("class","pokemon--Exp");
        cardExp$$.textContent = "EXP - " + pokemon.base_experience;



    // parte superior de la carta    
    const cardTop$$ = document.createElement("div");
        cardTop$$.setAttribute("class","card--Top");
            // damos estilos según el tipo de pokemon
    for (let i = 0; i < pokemon.types.length; i++){
        if (pokemon.types[i].type.name === "grass"){cardTop$$.classList.add("grass");}
        if (pokemon.types[i].type.name === "fire"){cardTop$$.classList.add("fire");}
        if (pokemon.types[i].type.name === "water"){cardTop$$.classList.add("water");}
        if (pokemon.types[i].type.name === "bug"){cardTop$$.classList.add("bug");}
        if (pokemon.types[i].type.name === "normal"){cardTop$$.classList.add("normal");}
        if (pokemon.types[i].type.name === "poison"){cardTop$$.classList.add("poison");}
        if (pokemon.types[i].type.name === "electric"){cardTop$$.classList.add("electric");}
        if (pokemon.types[i].type.name === "ground"){cardTop$$.classList.add("ground");}
        if (pokemon.types[i].type.name === "fighting"){cardTop$$.classList.add("fighting");}
        if (pokemon.types[i].type.name === "fairy"){cardTop$$.classList.add("fairy");}
        if (pokemon.types[i].type.name === "psychic"){cardTop$$.classList.add("psychic");}
        if (pokemon.types[i].type.name === "rock"){cardTop$$.classList.add("rock");}
        if (pokemon.types[i].type.name === "ice"){cardTop$$.classList.add("ice");}
        if (pokemon.types[i].type.name === "dragon"){cardTop$$.classList.add("dragon");}
    }

    const legendary = ["zapdos", "articuno", "moltres", "mewtwo", "mew"];
    for ( let i = 0; i < legendary.length; i++){
        if (legendary[i] === pokemon.name){
            cardTop$$.classList.add("legendary");
            cardTop$$.setAttribute("isLegendary","true");
        }
    }
    
    const cardExit$$ = document.createElement("p");
        cardExit$$.setAttribute("class","card--Exit");
    const cardPokedex$$ = document.createElement("p");
        cardPokedex$$.setAttribute("class","card--Pokedex"); 
        cardPokedex$$.textContent = "◀ Pokedex";
    const cardID$$ = document.createElement("p");
        cardID$$.setAttribute("class","card--ID"); 
        cardID$$.textContent = "ID núm: " + pokemon.id;
    // const cardSeparator$$ = document.createElement("hr");
    //     cardSeparator$$.setAttribute("class","card--Separator"); 
    const cardImg$$ = document.createElement("img");
        cardImg$$.setAttribute("class","card--Img");
        cardImg$$.src = pokemon.sprites.other["official-artwork"].front_default;
        
    // metemos los elementos creados en la web
    document.body.appendChild(bigCard$$);

        bigCard$$.appendChild(cardTop$$);
            cardTop$$.appendChild(cardExit$$);
                cardExit$$.appendChild(cardPokedex$$);
                cardExit$$.appendChild(cardID$$);
            // cardTop$$.appendChild(cardSeparator$$);
            cardTop$$.appendChild(cardImg$$);
            
        bigCard$$.appendChild(cardBottom$$);
            cardBottom$$.appendChild(cardName$$);
                cardName$$.appendChild(cardTypes$$);
            cardBottom$$.appendChild(cardBaseStats$$);
            cardBottom$$.appendChild(cardHP$$);
            cardBottom$$.appendChild(cardAttack$$);
            cardBottom$$.appendChild(cardDefense$$);
            cardBottom$$.appendChild(cardSpeed$$);
            cardBottom$$.appendChild(cardExp$$);
    


    cardPokedex$$.addEventListener("click",removeCard);
}

// creamos la función que cierra la ventana de estadísticas del pokemon
function removeCard(event) {
    console.log(event)
    const removeCard = event.path[3];
    removeCard.remove();

}


window.onload = getPokemons();
