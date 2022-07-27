
//Funcion para numero random
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
//llamo a la api
async function api(id) {
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await respuesta.json();

    //objeto
    const Pokemon = {
        img: data.sprites.other.dream_world.front_default,
        nombre: data.name,
        //cuando adentro d una carpeto(ej: stats) hay otra carpet con un nombre de 
        //numer(ej: 0) hay que ponerlo sin punto al lado de la carpeta padre y al 
        //numero entre corchetes 
        hp: data.stats[0].base_stat,
        experiencia: data.base_experience,
        attack: data.stats[1].base_stat,
        attackEspecial: data.stats[3].base_stat,
        defensa: data.stats[2].base_stat
    }

    //paso EL objeto para pintar la card
    pintarCard(Pokemon);
}

//Aagarro el main donde voy a pintar el template
const main = document.querySelector(`.flex`);
//button para cambiar de card
const button = document.getElementById("button")


function pintarCard(pokemon) {
    console.log(pokemon);

    //Aagarro el main donde voy a pintar el template
    const main = document.querySelector(`.flex`);
    //agarro los elementos que esten adentro del template
    const template = document.getElementById("template").content;
    //Hago un clonn de template para no manipularlo directamente(buena prafctica tamb)
    const clone = template.cloneNode(true);
    //Se crea para el fragment para (efectivo para hacer loops e renderizados innecesarios)
    //para esto no es necesario pero es buena practic
    const fragment = document.createDocumentFragment();

    //MODIFICO EL INTERIOR DEL TEMPLATE

    //Pongo la imagen de la api (casi siempre estan en los sprites)
    clone.querySelector(`.card-h1-img`).setAttribute("src", pokemon.img);

    //Cambio el h1 (Puedo hacerlo asi pero como tengo un spam donde le 
    //quiero poner la vida lo hago con un innet}rHtml)
    //const h1 = clone.querySelector(`.card-h1-h1`);
    //h1.innerText = pokemon.nombre;
    clone.querySelector(`.card-h1-h1`).innerHTML = `${pokemon.nombre} <span class ="span"> ${pokemon.hp} Hp</span>`;

    //pinto el p (poniendo el hp del pokemon);
    clone.querySelector(`.card-h1-p`).textContent = pokemon.experiencia + ' Exp';

    //El query All me devuelve un array con todas sus coincidencias y si le pongo
    //el h2 al lado accede al h2 que este adentro de una etiqueta .footer-seguidores
    const elementos = clone.querySelectorAll(`.footer-seguidores h2`)

    elementos[0].innerText = pokemon.attack + `K`;
    elementos[1].innerText = pokemon.attackEspecial + `K`;
    elementos[2].innerText = pokemon.defensa + `K`;


    //Paso el clone al fragment y despues al main para que aparezca
    fragment.appendChild(clone);
    main.appendChild(fragment);
}



//cada vez que se recague la pagina dar una nueva carta
document.addEventListener("DOMContentLoaded", () => {
    //hago una constante a la funcion de random
    const random = getRandomInt(1, 214);
    //le paso random a la api para que elija uno aleatorio
    api(random);
})

//cada vez que se haga click en el boton dar una nueva carta
function nuevaCard() {
    button.addEventListener("click", () => {
        console.log("hh");

        main. innerHTML = " ";
    
        //hago una constante a la funcion de random
        const random = getRandomInt(1, 214);

        //le paso random a la api para que elija uno aleatorio
        api(random);
    })
    
}
nuevaCard();



