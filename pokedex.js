//! creamos la lista con los pokemosn legendarios desde el 1 hasta el 931
    // const legendary = ["zapdos", "articuno", "moltres", "mewtwo", "mew", "raikou", "entei", "suicune", "lugia", "ho-oh", "regirock", "regice", "registeel", "latios", "latias", "kyogre", "groudon", "rayquaza", "rotom", "uxie", "mesprit", "azelf", "palkia", "dialga", "giratina-altered", "jirachi", "deoxys-normal", "cresselia", "darkrai", "arceus", "heatran", "regigigas", "cobalion", "terrakion", "virizion", "tornadus-incarnate", "thundurus-incarnate", "reshiram", "zekrom", "landorus-incarnate", "keldeo", "meloetta-aria", "kyurem", "xerneas", "yveltal", "zygarde-50", "diancie", "hoopa", "volcanion", "type-null", "silvally", "tapu-koko", "tapu-lele", "tapu-bulu", "tapu-fini", "cosmog", "cosmoem", "solgaleo", "lunala", "necrozma", "zacian", "zamazenta", "eternatus", "kubfu", "urshifu-single-strike", "enamorus-incarnate", "regieleki", "regidrago", "glastrier", "spectrier", "calyrex", "giratina-origin", "thundurus-therian", "landorus-therian", "tornadus-therian", "kyurem-black", "kyurem-white"];

    const legendOrMyth = [];
    let numberOfPokemons = 931;

//! primero de todo hacemos el FETCH para solicitar la información a la POKEAPI
async function getPokemons() {

    // hacemos el primer fetch para obtener la lista de los pokemons que queramos
    async function allPokemons() {
        return fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=' + numberOfPokemons)
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

        async function legendaryPokemons() {
            return fetch(fetchPokemon.species.url)
            .then(res => res.json());
        }
    
        const legendaryPoke = await legendaryPokemons();
        if (legendaryPoke.is_legendary || legendaryPoke.is_mythical) {
            legendOrMyth.push(fetchPokemon.name);
        }        

        // llamamos a la función para crear la carta individual de cada pokemon
        renderPokemons(fetchPokemon);
    }        
    console.log(legendOrMyth);
};

//! función para crear las cartas y meterlas en el HTML dinámicamente
function renderPokemons(pokemon) {

    const list$$ = document.querySelector("#pokedex")
    
    const card$$ = document.createElement("li");
        card$$.setAttribute("class","card");
        card$$.setAttribute("id",pokemon.id);
    const image$$ = document.createElement("img");
        image$$.setAttribute("class","card-image")
    const name$$ = document.createElement("h3");
        name$$.setAttribute("class","card-title");

    name$$.textContent = pokemon.forms[0].name + " - ID: " + pokemon.id;
    image$$.src = pokemon.sprites.other["official-artwork"].front_default;

    list$$.appendChild(card$$);
    card$$.appendChild(name$$);
    card$$.appendChild(image$$);

    card$$.addEventListener("click", getStats);

    // damos estilos a las cartas según el tipo de pokemon
    for (let i = 0; i < pokemon.types.length; i++){

        if (pokemon.types[i].type.name === "flying"){
            const type$$ = document.createElement("div");
            type$$.setAttribute("class","flyingcard");
            card$$.classList.add("class","flying");
            card$$.appendChild(type$$);
        } else if (pokemon.types[i].type.name === "ghost"){
            const type$$ = document.createElement("div");
            type$$.setAttribute("class","ghostcard");
            card$$.classList.add("class","ghost");
            card$$.appendChild(type$$);
        } else { 
            card$$.classList.add(pokemon.types[i].type.name);
        }   
    }

    // damos estilo diferenciado a los pokemons legendarios
    for ( let i = 0; i < legendOrMyth.length; i++){
        if (legendOrMyth[i] === pokemon.name){
            card$$.classList.add("legendary");
        }
    }
}

//! hacemos FETCH al pokemon clikeado para saber sus estadísticas
async function getStats (event){
    async function getPokemonStats(event) {
        return fetch("https://pokeapi.co/api/v2/pokemon/"+ event.path[1].id)
        .then(res => res.json());
        } 
    const pokemonStats = await getPokemonStats(event);
    renderPokemonStats (pokemonStats);
};

//! creamos una vista con estadísticas para el pokemon que le hacemos click
function renderPokemonStats(pokemon){
    // console.log(pokemon)

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
            cardTypes$$.appendChild(cardType);

            if (pokemon.types[i].type.name === "flying"){
                cardType.classList.add("flying2");
            } else if (pokemon.types[i].type.name === "ghost"){
                cardType.classList.add("ghost2");
            } else {
                cardType.classList.add(pokemon.types[i].type.name);
            }

        }

    const cardSeparator$$ = document.createElement("hr");
        cardSeparator$$.setAttribute("class","card--Separator"); 

    const cardBaseStats$$ = document.createElement("h2");
        cardBaseStats$$.setAttribute("class","pokemon--BaseStats");
        cardBaseStats$$.textContent = "Base Stats";
        
        //barras de estadísticas
        const maxHP = 150;
        const maxEXP = 300;
        const cardHP$$ = document.createElement("p");
        cardHP$$.setAttribute("class","pokemon--HP");
        cardHP$$.setAttribute("style","width:"+ (pokemon.stats[0].base_stat*100/maxHP)+"%");
        cardHP$$.textContent = "HP - " + pokemon.stats[0].base_stat + " / " + maxHP;
        const cardBar0$$ = document.createElement("div");
        cardBar0$$.setAttribute("class","pokemon--bar");
        
        const cardAttack$$ = document.createElement("p");
        cardAttack$$.setAttribute("class","pokemon--Attack");
        cardAttack$$.setAttribute("style","width:"+ (pokemon.stats[1].base_stat*100/maxHP)+"%");
        cardAttack$$.textContent = "ATK - " + pokemon.stats[1].base_stat + " / " + maxHP;
        const cardBar1$$ = document.createElement("div");
        cardBar1$$.setAttribute("class","pokemon--bar");

        const cardDefense$$ = document.createElement("p");
        cardDefense$$.setAttribute("class","pokemon--Defense");
        cardDefense$$.setAttribute("style","width:"+ (pokemon.stats[2].base_stat*100/maxHP)+"%");
        cardDefense$$.textContent = "DEF - " + pokemon.stats[2].base_stat + " / " + maxHP;
        const cardBar2$$ = document.createElement("div");
        cardBar2$$.setAttribute("class","pokemon--bar");

        const cardSpeed$$ = document.createElement("p");
        cardSpeed$$.setAttribute("class","pokemon--Speed");
        cardSpeed$$.setAttribute("style","width:"+ (pokemon.stats[5].base_stat*100/maxHP)+"%");
        cardSpeed$$.textContent = "SPD - " + pokemon.stats[5].base_stat + " / " + maxHP;
        const cardBar3$$ = document.createElement("div");
        cardBar3$$.setAttribute("class","pokemon--bar");

        const cardExp$$ = document.createElement("p");
        cardExp$$.setAttribute("class","pokemon--Exp");
        cardExp$$.setAttribute("style","width:"+ (pokemon.base_experience*100/maxEXP)+"%");
        cardExp$$.textContent = "EXP - " + pokemon.base_experience + " / " + maxEXP;
        const cardBar4$$ = document.createElement("div");
        cardBar4$$.setAttribute("class","pokemon--bar");



    // parte superior de la carta    
    const cardTop$$ = document.createElement("div");
        cardTop$$.setAttribute("class","card--Top");
    
    // damos estilos según el tipo de pokemon
    for (let i = 0; i < pokemon.types.length; i++){

        cardTop$$.classList.add(pokemon.types[i].type.name);

    }

    for ( let i = 0; i < legendOrMyth.length; i++){
        if (legendOrMyth[i] === pokemon.name){
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
    const cardImg$$ = document.createElement("img");
        cardImg$$.setAttribute("class","card--Img");
        cardImg$$.src = pokemon.sprites.other["official-artwork"].front_default;
        
    // metemos los elementos creados en la web
    document.body.appendChild(bigCard$$);

        bigCard$$.appendChild(cardTop$$);
            cardTop$$.appendChild(cardExit$$);
                cardExit$$.appendChild(cardPokedex$$);
                cardExit$$.appendChild(cardID$$);
            cardTop$$.appendChild(cardImg$$);
            
        bigCard$$.appendChild(cardBottom$$);
            cardBottom$$.appendChild(cardName$$);
                cardName$$.appendChild(cardTypes$$);
                cardName$$.appendChild(cardSeparator$$)
            cardBottom$$.appendChild(cardBaseStats$$);
                cardBaseStats$$.appendChild(cardBar0$$);
                    cardBar0$$.appendChild(cardHP$$);
                cardBaseStats$$.appendChild(cardBar1$$);
                    cardBar1$$.appendChild(cardAttack$$);
                cardBaseStats$$.appendChild(cardBar2$$);
                    cardBar2$$.appendChild(cardDefense$$);
                cardBaseStats$$.appendChild(cardBar3$$);
                    cardBar3$$.appendChild(cardSpeed$$);
                cardBaseStats$$.appendChild(cardBar4$$);
                    cardBar4$$.appendChild(cardExp$$);
    
    cardPokedex$$.addEventListener("click",removeCard);
}

// creamos la función que cierra la ventana de estadísticas del pokemon
function removeCard(event) {
    const removeCard = event.path[3];
    removeCard.remove();
}

// buscador con filter
function filter() {
    let input, filter, ol, li, pokemon, i, txtValue, classValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    ol = document.getElementById("pokedex");
    li = ol.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        pokemon = li[i];
        txtValue = pokemon.textContent || pokemon.innerText;
        classValue = pokemon.className;

        // filtro por nombre
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        
        // filtro por class
        } else if (classValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

window.onload = getPokemons();