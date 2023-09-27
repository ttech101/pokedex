function init() {
    //loadAllTypen();
    loadBlock();
    loadOtherLanguages(language);
    scrollToTop();
}


(async function() { 
    // Request the random numbers and save the promises. 
    var aPromise = getRandomWithPromise(); 
    var bPromise = getRandomWithPromise(); 
    var a = await aPromise; 
    var b = await bPromise; 
    console.log(`Your random numbers are ${a} and ${b}!`);})();
    // [Execution Time] 0.283 ms total



async function loadBlock() {
    if (card_number <= loading_counter) {
        card_number++;
        await loadPokemonMain(card_number);
        
        
        
        pushToLocalCard();
        createSmallCard();
        loadBlock();
        loadProgressbar();
    } else {
        console.log('STOP! Es wurden ' + card_number + ' Karten geladen.');
    }
}

async function loadPokemonMain(card_number) {
    let load_pokemon_main_url = main_url + card_number;
    let show_pokemon_main = await fetch(load_pokemon_main_url);
    var show_pokemon_AsJson = await show_pokemon_main.json();
    console.log(show_pokemon_AsJson);
    loadPokemonMainDataFromJson(show_pokemon_AsJson);
    let load_pokemon_species = show_pokemon_AsJson.species.url;
    let load_pokemon_typs = show_pokemon_AsJson.types;

    await loadPokemonSpecies(load_pokemon_species);
    await loadPokemonTyps(load_pokemon_typs);

}

async function loadPokemonSpecies(url) {
    designation = [];
    let show_pokemon_species = await fetch(url);
    let show_pokemon_speciesAsJson = await show_pokemon_species.json();
    //console.log(show_pokemon_speciesAsJson);
    loadPokemonSpeciesDataFromJson(show_pokemon_speciesAsJson);
    for (let i = 0; i < show_pokemon_speciesAsJson.names.length; i++) {
        const element = show_pokemon_speciesAsJson.names[i];
        sortLanguageDesignation(element);
    }
}

async function loadPokemonTyps(url) {
    typs = [];
    for (let i = 0; i < url.length; i++) {
        const element = url[i];
        let typ_url = element.type.url;
        let show_pokemon_typ = await fetch(typ_url);
        let show_pokemon_typAsJson = await show_pokemon_typ.json();
        typs.push([]);
        for (let j = 0; j < show_pokemon_typAsJson.names.length; j++) {
            const element = show_pokemon_typAsJson.names[j];
            sortLanguageTyps(element, i);
        }
    }
}

function loadPokemonMainDataFromJson(show_pokemon_AsJson) {
    img = show_pokemon_AsJson.sprites.other.dream_world.front_default;
    id = pokemonId(show_pokemon_AsJson.id);
    stats = show_pokemon_AsJson.stats;
    weight = show_pokemon_AsJson.weight;
    height = show_pokemon_AsJson.height;
}

function loadPokemonSpeciesDataFromJson(show_pokemon_speciesAsJson) {
    egg_groups = show_pokemon_speciesAsJson.egg_groups;
    bg_color = show_pokemon_speciesAsJson.color.name;
    egg_groups = show_pokemon_speciesAsJson.egg_groups;
    console.log(egg_groups);
}

function pokemonId(id) {
    if (id < 10) {
        return '#' + '00' + id;;
    }
    if (id < 100) {
        return '#' + '0' + id;;
    }
    if (id < 1000) {
        return '#' + id;;
    }
}

function pushToLocalCard() {
    pokemon_main.push({
        card_number: card_number,
        img: img,
        id: id,
        bg_color: bg_color,
        designation: designation,
        stats: stats,
        egg_groups: egg_groups,
        weight: weight,
        height: height,
        egg_groups : egg_groups,
        typs: typs
    });
}

function loadOtherLanguages(country) {
    changeLanguages(country);
    language = country;
    translateLayout(language);
}

function sortLanguageDesignation(b) {
    let a = b.language.name;
    if (a == 'de' || a == 'en' || a == 'it' || a == 'es' || a == 'ja' || a == 'fr') {
        designation.push({
            'language': a,
            'text': b.name
        });
    }
}

function sortLanguageTyps(b, i) {
    let a = b.language.name;
    if (a == 'de' || a == 'en' || a == 'it' || a == 'es' || a == 'ja' || a == 'fr') {
        typs[i].push({
            'language': a,
            'text': b.name
        });
    }
}

function loadProgressbar(i) {
    if (card_number == loading_counter + 1) {
        loadingScreenRemove();
    } else {
        document.getElementById('body').classList.add('fixed');
        let percent = card_number / loading_counter;
        percent = Math.round(percent * 100);
        document.getElementById('progress-status').style.width = `${percent}%`;
        document.getElementById('progress-status').innerHTML = `${percent} %`;
    }
}

function loadingScreenRemove() {
    document.getElementById('cards-screen').classList.remove('dn');
    const loader = document.getElementById('loader');
    loader.style.display = "none";
    document.getElementById('body').classList.remove('fixed');
};

function searchPokemon() {
    let search = document.getElementById('search_input').value;
    search = search.toLowerCase();
    let found = 0;
    for (let i = 0; i < pokemon_main.length; i++) {
        const element = pokemon_main[i];
        for (let j = 0; j < pokemon_main[i].designation.length; j++) {
            const element = pokemon_main[i].designation[j];
            let card_number = i + 1;
            if (element.text.toLowerCase().includes(search)) {
                document.getElementById(`card-number-${card_number}`).classList.remove('dn');
                found++;
                break;
            } else {
                document.getElementById(`card-number-${card_number}`).classList.add('dn');
            }
        };
        serachNotFound(found);
    };
};


function scrollToTop() {
    document.getElementById('scrollTopButton').addEventListener('click', function () {

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
};

window.addEventListener('scroll', function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 200) {
        document.getElementById('scrollTopButton').style.display = 'block';
    } else {
        document.getElementById('scrollTopButton').style.display = 'none';
    }
});

function serachNotFound(found) {
    if (found == 0) {
        document.getElementById('search-not-found').style.display = "";
    } else {
        document.getElementById('search-not-found').style.display = "none";
    }
};

function loadCardOption(choice) {
    removeClasslistCard();
    if (choice == 'about') {
        document.getElementById('about-option').classList.add('active')
        document.getElementById('about').classList.remove('dn');
    }
    if (choice == 'base-stats') {
        document.getElementById('base-stats-option').classList.add('active')
        document.getElementById('base-stats').classList.remove('dn');
    }
    if (choice == 'evolution') {
        document.getElementById('evolution-option').classList.add('active')
        document.getElementById('evolution').classList.remove('dn');
    }
}
function removeClasslistCard() {
    document.getElementById('about-option').classList.remove('active');
    document.getElementById('about').classList.add('dn');
    document.getElementById('base-stats-option').classList.remove('active');
    document.getElementById('base-stats').classList.add('dn');
    document.getElementById('evolution-option').classList.remove('active');
    document.getElementById('evolution').classList.add('dn');
}

function showCard(option) {
    if (option == 'ture') {
        document.getElementById('cards-screen').classList.add('dn');
        document.getElementById('card-screen').classList.remove('dn');
    } else {
        document.getElementById('card-screen').classList.add('dn');
        document.getElementById('cards-screen').classList.remove('dn');
    }
}

function loadCard(i) {
    loadStats(i);
    showCard('ture');
    loadCardOption('about')
    id = i,
        i = i - 1;
    loadCardElements(i);
    cardTypsSmall(i, language)

    console.log('karten index=', i)
    console.log('karten Nummer=', id)
    document.getElementById('card-name').innerHTML = translator1Instance(i, ['designation'], language);
    document.getElementById('card-id').innerHTML = pokemonId(id);
    loadStats(i, language);
}

function cardTypsSmall(id, language) {
    document.getElementById('card-typs-small').innerHTML = "";
    for (let i = 0; i < pokemon_main[id].typs.length; i++) {
        let typ = translator2Instance(id, ['typs'], language, i);
        document.getElementById('card-typs-small').innerHTML += `
        <span class=" mb-2 badge rounded-pill shadow ${pokemon_main[id]['bg_color']}-typs">${typ}</span>`;
    }
}


function loadCardElements(i) {
    document.getElementById('card-img').src = pokemon_main[i]['img'];
    document.getElementById('card-screen-bg').classList = `card rounded-5 border-0 mt-4 ${pokemon_main[i]['bg_color']}`;
}

function translator1Instance(cardNumber, paragraph, translate_in) {
    for (let i = 0; i < pokemon_main[cardNumber][paragraph].length; i++) {
        const element = pokemon_main[cardNumber][paragraph][i];
        if (element.language == translate_in) {
            return element.text;
        }
    }
}

function translator2Instance(id, paragraph, translate_in, tabel) {
    for (let i = 0; i < pokemon_main[id][paragraph][tabel].length; i++) {
        const element = pokemon_main[id][paragraph][tabel][i];
        if (element.language == translate_in) {
            return element.text;
        };
    };
};

function loadStats(i) {
    translateLayout(language);
    loadStatsAbout(i);

};



function translateLayout(language) {

    for (let i = 0; i < language_other_data.length; i++) {
        const element = language_other_data[i];
        if (element.language == language) {
            changeAbout(element);
            changeBaseStats(element);
            changeOption(element);
        }
    }
}

function changeOption(element) {
    document.getElementById('about-option').innerHTML = element.about;
    document.getElementById('base-stats-option').innerHTML = element.base_stats;
    document.getElementById('evolution-option').innerHTML = element.evolution;

}

function changeAbout(element) {
    document.getElementById('translate-species').innerHTML = element.species;
    document.getElementById('translate-height').innerHTML = element.height;
    document.getElementById('translate-weight').innerHTML = element.weight;
    document.getElementById('translate-abilities').innerHTML = element.abilities;
    document.getElementById('translate-gender').innerHTML = element.gender;
    document.getElementById('translate-egg_cycle').innerHTML = element.egg_cycle;
    document.getElementById('translate-egg_groups').innerHTML = element.egg_groups;
    document.getElementById('translate-breeding').innerHTML = element.breeding;
}

function changeBaseStats(element) {
    document.getElementById('translate-hp').innerHTML = element.hp;
    document.getElementById('translate-attack').innerHTML = element.attack;
    document.getElementById('translate-defense').innerHTML = element.defense;
    document.getElementById('translate-sp_atk').innerHTML = element.sp_atk;
    document.getElementById('translate-sp_def').innerHTML = element.sp_def;
    document.getElementById('translate-speed').innerHTML = element.speed;
    document.getElementById('translate-total').innerHTML = element.total;
    document.getElementById('translate-type_defenses').innerHTML = element.type_defenses;
}

function loadStatsAbout(i) {



}