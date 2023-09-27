let currentPokemon;
let Pokemons = 21;
let next = 1;
let currentPokemonName;
let searchPoke;
let funcStop = false;
let isFunctionRunning = false;
let effectively = [];
let notEffectively = [];
let language = 5;
let pokeLanguage = 4;
let searchLanguage = 6;
let translate = [
    {
        '5': ['Kategorie', 'Größe', 'Gewicht', 'Typ', 'Stark gegen', 'Schwach gegen', 'Artenspezifische Stärken', 'Meter', 'Kilogramm', 'Pokemon nicht gefunden!', 'weitere Pokemons laden', 'Zurück', 'de'],
        '4': ['Catégorie', 'Taille', 'Poids', 'Type', 'Fort contre', 'Faible contre', 'Forces spécifiques aux espèces', 'Mètres', 'Kilogrammes', 'Pokémon introuvable !', 'charger plus de Pokémon', 'Dos', 'fr'],
        '6': ['Categoría', 'Tamaño', 'Peso', 'Tipo', 'Fuerte en contra', 'Débil en contra', 'Fuerzas específicas de la especie', 'Metros', 'Kilogramos', '¡Pokémon no encontrado!', 'cargar más Pokémon', 'Atrás', 'es'],
        '7': ['Categoria', 'Dimensioni', 'Peso', 'Tipo', 'Forte contro', 'Debole contro', 'Forze specifiche per specie', 'Metri', 'Chilogrammi', "Pokemon non trovato!", "carica più Pokemon", 'Indietro', 'it'],
        '8': ['Category', 'Size', 'Weight', 'Type', 'Strong Against', 'Weak Against', 'Species Specific Strengths', 'Meters', 'Kilograms', 'Pokemon not found!', 'load more Pokemon', 'Back', 'en'],
        '0': ['カテゴリ', 'サイズ', '重量', 'タイプ', '強いもの', '弱いもの', '種特有の強さ', 'メートル', 'キログラム', 'ポケモンが見つからない!', 'もっとポケモンをロード', '戻る', 'ja'],
    }
];

function indexLang(a, b, c, lang) {
    language = a;
    pokeLanguage = b;
    searchLanguage = c;
    document.getElementById('flagg').innerHTML = `<img src="./icon/${lang}.png" class="language">`;
    newrenderlang();
}

function newrenderlang() {
    document.getElementById('bottom').innerHTML = `<button onclick="loadNextPokemons()" class="button-17">${translate[0][language][10]}</button>`;
    if (!document.getElementById('zoomBg').classList.contains('none')) {
        let nr = currentPokemonName['id'];
        openCard(nr);
    } else { resetPoke(); }
}

async function resetPoke() {
    funcStop = true;
    currentPokemon = '';
    Pokemons = 21;
    next = 1;
    document.getElementById('pokedex').innerHTML = ``;
    zoomOut();
    await delay(500);
    resetStopFunction();
    loadPokemons();
}
document.addEventListener("DOMContentLoaded", () => {
    const eventTarget = document.getElementById("searchinput");
    eventTarget.addEventListener("keyup", (event) => {
        if (event.isComposing || event.keyCode === 13) {
            return;
        }
        search();
    });
});

async function loadSearchPoke() {
    const response = await fetch('./pokelist.json');
    searchPoke = await response.json();
}

async function loadPokemons() {
    for (next; next < Pokemons; next++) {
        if (funcStop === false) {
            await loadPokemon(next);
            await loadPokemonName();
            await renderPokemonInfo(next);
        }
    } resetStopFunction();
}

async function loadPokemon(i) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    const response = await fetch(url);
    currentPokemon = await response.json();
}

async function loadPokemonName() {
    const urlName = currentPokemon['species']['url'];
    const responseName = await fetch(urlName);
    currentPokemonName = await responseName.json();
}

async function renderPokemonInfo(i) {
    renderPokemonCard(i);
    renderPokemonInfoText(i)
    renderPokemonInfoBgColor(`img${i}`);
    await renderPokemonInfoTyp(i);
}

function renderPokemonCard(i) {
    document.getElementById('pokedex').innerHTML += `
    <div id="pokecard${i}" class="pokecard" onclick="openCard(${i})">
        <img src="./icon/dump.jpg" id="img${i}" class="poke_img" loading="lazy">
        <div id="nr${i}" class="poke_nr"><span>Nr. <span>${currentPokemon['id']}</span></span></div>
        <div id="name${i}" class="poke_name">${currentPokemonName['names'][language]['name']}</div>
        <div id="text${i}" class="none"></div>
        <div id="typ${i}" class="poke_typ"></div></div>`;
}

function renderPokemonInfoBgColor(img) {
    try {
        document.getElementById(img).style.backgroundColor = currentPokemonName['color']['name'];
        document.getElementById(img).src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    } catch (error) { console.log('no data found!') }
}

async function renderPokemonInfoTyp(i) {
    for (let c = 0; c < currentPokemon['types'].length; c++) {
        const urlType = currentPokemon['types'][c]['type']['url'];
        const responseType = await fetch(urlType);
        const currentPokemonType = await responseType.json();
        renderPokemonInfoTypIn(i, c, currentPokemonType);
    }
}

function renderPokemonInfoTypIn(i, c, currentPokemonType) {
    try {
        document.getElementById(`typ${i}`).innerHTML += `
        <div class="typ_label ${currentPokemon['types'][c]['type']['name']}">${currentPokemonType['names'][pokeLanguage]['name']}</div>`;
    } catch (error) { console.log('no data found!') }
}

function renderPokemonInfoText(i) {
    try {
        document.getElementById(`name${i}`).innerHTML += `<div class="none">${currentPokemonName['flavor_text_entries'][language + 28]['flavor_text']}</div>`;
    } catch (error) { console.log('no data found!') }
}

function zoomOut() {
    if (!document.getElementById('zoomBg').classList.contains('none')) {
        zoom();
    }
}

async function openCard(i) {
    zoom();
    await loadPokemon(i);
    await loadPokemonName();
    renderZoomCard(i);
    renderZoomLeft();
    renderZoomRight();
    renderText();
    renderDetail();
    renderPokemonInfoTyp(999);
    renderEffectiveness();
    renderPokemonInfoBgColor(`detail`);
    renderPokeImg();
    await renderBar();
}

function renderPokeImg() {
    try {
        document.getElementById('imgCard').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    } catch (error) { console.log('no data found!') }
}

function checkNr(n, i) {
    if (i === 1 && n === -1) {
        n = 1009;
        return n
    } if (i === 1010 && n === 1) {
        n = -1009;
        return n
    } return n
}

function searchNr(n, i, searchLang) {
    n = checkNr(n, i);
    let result = null;
    let found = false;
    for (let i = 0; i < searchPoke.length; i++) {
        if (searchPoke[i]['pokemon_species_id'] === currentPokemon['id'] + n && searchPoke[i]['local_language_id'] === searchLang) {
            const id = searchPoke[i]['pokemon_species_id'];
            const name = searchPoke[i]['name'];
            result = { id, name };
            found = true;
            break;
        }
    } if (!found) {
        searchLang = 9;
        result = searchNr(n, i, searchLang);
    }
    return result;
}

function renderZoomCard(i) {
    const { down, up, current } = getdata(i);
    document.getElementById('top-side').innerHTML = `
    <div class="top_icon">    
    <div onclick="nextCard(${i - 1})" class="slider sleft"><img src="./icon/iconl.png" class="icon left" id="left"><b><span class="slider_nr">Nr. ${down['id']}</span>${down['name']}</b></div>
    <div onclick="nextCard(${i + 1})" class="slider sright"><b>${up['name']}<span class="slider_nr">Nr. ${up['id']}</span></b><img src="./icon/iconr.png" class="icon right" id="right"></div>
    </div>
    <div class="top_title">
    <h1 class="pokename title_zoom width">${current['name']}</h1>
    <h1 class="poke_nr_zoom title_zoom width">Nr. ${current['id']}</h1>
    </div>
    <img src="./icon/x-markierung.png" class="xicon none" onclick="zoom()">`;
}

function getdata(i) {
    let searchLang = searchLanguage;
    const down = searchNr(-1, i, searchLang);
    const current = searchNr(0, i, searchLang);
    const up = searchNr(1, i, searchLang);
    return { down, up, current };
}

function renderZoomLeft() {
    document.getElementById('left-side').innerHTML = `
    <img src="./icon/dump.jpg" class="zoomimg" id="imgCard">
    <div class="labels"><div class="types"><b>${translate[0][language][6]}</b></div>            
        <table class="charts-css column show-data-on-hover show-labels" id="my-chart">
        <tr id="chart0"><th scope="row"> No Data </th><td style="--size: calc( 0 / 100 )"></td></tr>
        <tr id="chart1"><th scope="row"> No Data </th><td style="--size: calc( 0 / 100 )"></td></tr>
        <tr id="chart2"><th scope="row"> no data </th><td style="--size: calc( 0 / 100 )"></td></tr>
        <tr id="chart3"><th scope="row"> no data </th><td style="--size: calc( 0 / 100 )"></td></tr>
        <tr id="chart4"><th scope="row"> no data </th><td style="--size: calc( 0 / 100 )"></td></tr>
        <tr id="chart5"><th scope="row"> no data </th><td style="--size: calc( 0 / 100 )"></td></tr>
    </table></div>`;
}

function renderZoomRight() {
    document.getElementById('right-side').innerHTML = `
    <div class="text" id='text'>no data</div>
    <div class="detail" id="detail"><div class="detailnames info">
            <div><b>${translate[0][language][0]}: </b></div>
            <div><b>${translate[0][language][1]}: </b></div>
            <div><b>${translate[0][language][2]}: </b></div></div>
        <div class="detailnames detaildata" id="details">
        <div><b>no data</b></div>
        <div><b>no data</b></div>
        <div><b>no data</b></div></div></div>
    <div><div class="labelpadding">${translate[0][language][3]}:</div>
        <div class="poke_typ wrap" id="typ999"></div></div>
    <div id="effectiveness"><div><div class="labelpadding">${translate[0][language][4]}:</div>
            <div id="strong" class="poke_typ wrap"></div></div>
        <div><div class="labelpadding">${translate[0][language][5]}:</div>
            <div id="weak" class="poke_typ wrap"></div></div></div>`;
}

function renderText() {
    try {
        for (let i = 0; i < currentPokemonName['flavor_text_entries'].length; i++) {
            if (currentPokemonName['flavor_text_entries'][i]['language']['name'] === translate[0][language][12]) {
                document.getElementById('text').innerHTML = `${currentPokemonName['flavor_text_entries'][i]['flavor_text']}`;
                return;
            }
        }
    } catch (error) { console.log('no data found!') }
}

function renderDetail() {
    try {
        let id = 'details';
        for (let i = 0; i < currentPokemonName['genera'].length; i++) {
            if (currentPokemonName['genera'][i]['language']['name'].includes(translate[0][language][12])) {
                document.getElementById(`${id}`).innerHTML = `
            <div><b>${currentPokemonName['genera'][i]['genus']}</b></div>
            <div><b>${(currentPokemon['height'] / 10)} ${translate[0][language][7]}</b></div>
            <div><b>${(currentPokemon['weight'] / 10)} ${translate[0][language][8]}</b></div>`;
                return;
            }
        }
    } catch (error) { console.log('no data found!') }
}

function zoom(event) {
    if (event) {
        event.stopPropagation();
    }
    document.getElementById('zoomBg').classList.toggle('none');
    document.getElementById('body').classList.toggle('scroll');
}

function preventPropagation(event) {
    event.stopPropagation();
}

async function renderEffectiveness() {
    document.getElementById('weak').innerHTML = ``;
    document.getElementById('strong').innerHTML = ``;
    await renderEachEffectiveness();
}

async function renderEachEffectiveness() {
    for (let i = 0; i < currentPokemon['types'].length; i++) {
        const url = currentPokemon['types'][i]['type']['url'];
        const response = await fetch(url);
        const responseAsJson = await response.json();
        await renderEach(responseAsJson);
    }
    effectively = [];
    notEffectively = [];
}

async function renderEach(responseAsJson) {
    let from = responseAsJson['damage_relations']['double_damage_from'];
    let stat = 'weak';
    await renderEffectiv(from, stat, notEffectively);
    from = responseAsJson['damage_relations']['double_damage_to'];
    stat = 'strong';
    await renderEffectiv(from, stat, effectively);
}

async function renderEffectiv(from, stat, effect) {
    let id = `${stat}`;
    try {
        for (let c = 0; c < from.length; c++) {
            const stronges = from[c]['url'];
            const strongresponse = await fetch(stronges);
            const strongAsJson = await strongresponse.json();
            if (!effect.includes(strongAsJson['names'][pokeLanguage]['name'])) {
                effect.push(strongAsJson['names'][pokeLanguage]['name'])
                document.getElementById(`${id}`).innerHTML += `<div class="typ_label ${from[c]['name']}">${strongAsJson['names'][pokeLanguage]['name']}</div>`;
            }
        }
    } catch (error) {
        console.log('no data found!')
        document.getElementById(`${id}`).innerHTML += `<div>no data</div>`;
    }
}

async function renderBar() {
    for (let i = 0; i < currentPokemon['stats'].length; i++) {
        const url = currentPokemon['stats'][i]['stat']['url'];
        const response = await fetch(url);
        const responseAsJson = await response.json();
        renderBarStats(i, responseAsJson);
    }
}

function renderBarStats(i, responseAsJson) {
    document.getElementById(`chart${i}`).innerHTML = `
        <tr><th scope="col" class="dia-container"><span class="diagonal"> ${responseAsJson['names'][pokeLanguage]['name']} </span></th>
        <td style="--size: calc( ${currentPokemon['stats'][i]['base_stat']} / 110 )"></td></tr>`;
}

function loadNextPokemons() {
    Pokemons = Pokemons + 20;
    loadPokemons();
}

async function search() {
    if (funcStop === false) {
        funcStop = true;
        await delay(500);
        resetStopFunction();
        if (document.getElementById('searchinput').value.length > 0) {
            results = [];
            searchAfter = ['name',]
            let input = document.getElementById('searchinput');
            let search = input.value.toLowerCase();
            searchWork(search);
            searchResult(results);
        } else { resetPoke(); }
    }
}

function searchWork(search) {
    for (let i = 0; i < searchPoke.length; i++) {
        const pokemon = searchPoke[i];
        const id = pokemon['pokemon_species_id'].toString();
        const name = pokemon['name'].toLowerCase();
        if ((name.includes(search) || id.includes(search)) && pokemon['local_language_id'] === searchLanguage) {
            results.push(pokemon);
        }
    }
}

function nextCard(i) {
    zoom();
    if (i === 0) {
        i = 1010;
    } if (i === 1011) {
        i = 1;
    }
    openCard(i);
}

function searchResult(results) {
    if (results.length > 0) {
        document.getElementById('bottom').innerHTML = `<button onclick="loadNextPokemons()" class="button-17">${translate[0][language][10]}</button>`;
        document.getElementById('pokedex').innerHTML = ``;
        renderSearch();
    } else {
        document.getElementById('pokedex').innerHTML = `<h1>${translate[0][language][9]}</h1>`;
        document.getElementById('bottom').innerHTML = `<button class="button-17" onclick="resetPoke()">${translate[0][language][11]}</button>`;
    }
}

async function renderSearch() {
    for (let i = 0; i < results.length; i++) {
        if (funcStop === false) {
            const element = results[i]['pokemon_species_id'];
            await loadPokemon(element);
            await loadPokemonName();
            await renderPokemonInfo(element);
        }
    } resetStopFunction();
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function resetStopFunction() {
    funcStop = false;
}