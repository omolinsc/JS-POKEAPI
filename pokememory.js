
let pokemonsToFetch = 900;
let memoryCards = 16;
let fetchCards = memoryCards/2;
let pairsMatched = 0;

let arrayNumbers = [];
let arraySelectedNumbers = [];

//!Fisher Yates Method
function myFunction(array) {
    for (let i = array.length -1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i+1));
      let k = array[i];
      array[i] = array[j];
      array[j] = k;
    }
}

//creamos un array con tantos números como pokemons queremos (en nuestro caso 931)
for ( let i = 1; i < pokemonsToFetch; i++){
    arrayNumbers.push(i);
}

//desordenamos de forma aleatoria ese array
myFunction(arrayNumbers);

//generamos otro array con 16 pokemons, leemos los 8 primeros y los volvemos a leer para así tener de forma segura una pareja de cada pokemon
let j = 0;
let k = 0;

for (let i = 0; i < memoryCards; i++){
    if ( i < memoryCards/2){ 
        arraySelectedNumbers[i] = arrayNumbers[j];
        j++;
    } else {
        arraySelectedNumbers[i] = arrayNumbers[k];
        k++;
    }
};

//desordenamos el array de nuevo con las parejas
myFunction(arraySelectedNumbers);


//! hacemos el FETCH para solicitar la información a la POKEAPI de cada pokemon que contiene nuestro array
async function getPokemons() {

    // hacemos fetch de cada pokemon que queremos
    for (let i = 0; i < arraySelectedNumbers.length; i++){

        async function allPokemons() {
            return fetch('https://pokeapi.co/api/v2/pokemon/' + arraySelectedNumbers[i])
            .then(res => res.json());
        }
        const fetchResult  = await allPokemons();

        // llamamos a la función para crear la carta individual de cada pokemon
        memoryPokemons(fetchResult);
    }
}



let id = 0;

//hacemos visibles las cartas de pokemon
function memoryPokemons(event){
    
    //creamos los elementos y les damos estilo
    const scene$$ = document.createElement("div");
        scene$$.setAttribute("class","box__container--scene");
        scene$$.setAttribute("id",id);
        scene$$.setAttribute("alt",event.name);
        id++;
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

    event.composedPath()[1].classList.toggle('is-flipped');
    // console.log(event)

    if (isFlipped === 0){
        firstCard = event.composedPath()[2];
        firstCard.removeEventListener("click",flip);
        firstCardId = event.composedPath()[2].id;
        firstCardName = event.composedPath()[2].attributes[2].nodeValue;
        isFlipped = 1;
    } else if (isFlipped === 1){
        secondCard = event.composedPath()[2];
        secondCard.removeEventListener("click",flip);
        secondCardId = event.composedPath()[2].id;
        secondCardName = event.composedPath()[2].attributes[2].nodeValue;
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
                        setTimeout(() => {
                            document.querySelector(".box__container").classList.add("fadeOut");
                            document.querySelector(".box__container").classList.add("hide");
                            document.querySelector(".ash").classList.remove("hide");
                            document.querySelector(".ash").classList.add("fadeIn");
                        }, 1000);
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

function startGame(event){
    document.querySelector(".oak").classList.add("fadeOut");
    setTimeout(() => {
        document.querySelector(".oak").classList.add("hide");    
        document.querySelector(".box__container").classList.remove("hide");    
    }, 900);
}

document.querySelector(".start").addEventListener("click",startGame);

window.onload = getPokemons();