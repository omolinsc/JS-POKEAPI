
let memoryCards = 16;
let fetchCards = memoryCards/2;
let pairsMatched = 0;

//! primero de todo hacemos el FETCH para solicitar la información a la POKEAPI
async function getPokemons() {

    // hacemos el primer fetch para obtener la lista de los pokemons
    async function allPokemons() {
        return fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit='+fetchCards)
        .then(res => res.json());
    }
    const fetchResult  = await allPokemons();

    // usamos un FOR para mapear cada pokemon individualmente
    for (let i = 0; i < fetchResult.results.length; i++){
        async function onePokemon() {
            return fetch(fetchResult.results[i].url)
            .then(res => res.json());
        }
       
        const fetchPokemon  = await onePokemon();
        // console.log(fetchPokemon);

        // llamamos a la función para crear la carta individual de cada pokemon
        memoryPokemons(fetchPokemon);
        memoryPokemons(fetchPokemon);
    }        
};

let i = 0;

//hacemos visibles las cartas de pokemon
function memoryPokemons(event){

    const image = event.sprites.other["official-artwork"].front_default;
    
    //creamos los elementos y les damos estilo
    const scene$$ = document.createElement("div");
        scene$$.setAttribute("class","box__container--scene");
        scene$$.setAttribute("id",i);
        scene$$.setAttribute("alt",event.name);
        i++;
    const card$$ = document.createElement("div");
        card$$.setAttribute("class","box__container--card");
    const cardFront$$ = document.createElement("div");
        cardFront$$.setAttribute("class","box__container--card--front");
    const cardBack$$ = document.createElement("div");
        cardBack$$.setAttribute("class","box__container--card--back");
    const pokemonImage$$ = document.createElement("img");
        pokemonImage$$.src = event.sprites.other["official-artwork"].front_default;
        pokemonImage$$.setAttribute("class","image");
 
    //introduciomos los elementos en el HTML
    document.querySelector(".box__container").appendChild(scene$$);
        scene$$.appendChild(card$$);
            card$$.appendChild(cardBack$$);
                cardBack$$.appendChild(pokemonImage$$);
            card$$.appendChild(cardFront$$);

    //le damos el eventListener a cada carta creada        
    scene$$.addEventListener("click",flip);
}


//creamos la función FLIP para girar cartas y añadimos el eventListener
function flip(event) {

    event.path[1].classList.toggle('is-flipped');
    // console.log(event)

    if (isFlipped === 0){
        firstCard = event.path[2];
        firstCard.removeEventListener("click",flip);
        firstCardId = event.path[2].id;
        firstCardName = event.path[2].attributes[2].nodeValue;
        isFlipped = 1;
    } else if (isFlipped === 1){
        secondCard = event.path[2];
        secondCard.removeEventListener("click",flip);
        secondCardId = event.path[2].id;
        secondCardName = event.path[2].attributes[2].nodeValue;
        isFlipped = 0;
        if(firstCardId !== secondCardId && firstCardName === secondCardName){
            console.log("PREMIO");
            document.addEventListener("click", handler, true);
            setTimeout(() => {
                firstCard.querySelector(".box__container--card--back").classList.add("correct");
                secondCard.querySelector(".box__container--card--back").classList.add("correct");
                document.removeEventListener("click", handler, true);
                pairsMatched++;
                
                setTimeout(() => {
                    if( pairsMatched === fetchCards){
                        document.querySelector(".box__container").setAttribute("style","display:none");
                    }
                }, 2000);
                
            }, 500);
            
        } else {
            console.log("CACA DE LA VACA");
            document.addEventListener("click", handler, true);
            setTimeout(() => {
                firstCard.querySelector(".box__container--card--back").classList.add("wrong");
                secondCard.querySelector(".box__container--card--back").classList.add("wrong");
            }, 500);
            
            setTimeout(() => {
                
                firstCard.addEventListener("click",flip);
                firstCard.lastElementChild.classList.toggle('is-flipped');
                secondCard.addEventListener("click",flip);
                secondCard.lastElementChild.classList.toggle('is-flipped');
                firstCard.querySelector(".box__container--card--back").classList.remove("wrong");
                secondCard.querySelector(".box__container--card--back").classList.remove("wrong");
                document.removeEventListener("click", handler, true);
            }, 2000);            
        }
        
    }
    
}
    


let firstCardId;
let firstCardName;
let secondCardId;
let secondCardName;
let isFlipped = 0;
let firstCard, secondCard;

function handler(e) {
    e.stopPropagation();
    e.preventDefault();
};

window.onload = getPokemons();