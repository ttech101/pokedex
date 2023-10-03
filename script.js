// CODE to be measured
//var start = performance.now();


/**
 * initializes the Pokedex
 * 
 */
function init() {
    loadBlock();
    scrollToTop();
    generateImpressum();
}

/**
 * This function starts loading the maps as specified
 */
async function loadBlock() {
    if (card_number <= loading_counter) {
        card_number++;
        await loadDataPrimar(card_number);
        pushToLocalCard();
        loadDataSecondary(card_number - 1);
        createSmallCard();
        loadLikePokemon(card_number - 1);
        loadProgressbar();
        loadBlock();
    } else {
        BlockEnd();
    }
}

/**
 * This asynchronous function stops loading the maps
 */
function BlockEnd() {
    document.getElementById('load-card-more').disabled = false;
    loadOtherLanguages(language);
    var time = performance.now();
    //console.log('Dauer: ' + ((time - start).toFixed(2)) + ' ms.');
}

/**
 * This asyncrone function loads the body of the JSON
 * Attention, this function is asyncron
 * 
 * @param {Number} card_number Number of cards to be loaded
 */
async function loadDataPrimar(card_number) {
    let urls = await loadPokemonMain(card_number);
    await loadPokemonSpecies(urls.species.url),
        await loadPokemonTyps(urls.types);
}

/**
 * This function loads the secondary JSON
 * Attention, this function is asyncron
 * 
 * @param {String} id ID of cardnumbers
 */
async function loadDataSecondary(id) {
    let a1 = loadPokemonEgg_groups(id);
    let a2 = loadPokemonAbilities(id);
    let a3 = leadPokemonHabitat(id);
    let a4 = loadPokemonEvolutionChain(id);
    await Promise.all([a1, a2, a3, a4]);

}

/**
 * This function loads the main Json and converts it (Main)
 * Attention, this function is asyncron
 * 
 * @param {Number} card_number  Number of cards to be loaded
 * @returns                     Returns the main URL of the map
 */
async function loadPokemonMain(card_number) {
    let load_pokemon_main_url = main_url + card_number;
    let show_pokemon_main = await fetch(load_pokemon_main_url);
    var show_pokemon_AsJson = await show_pokemon_main.json();
    loadPokemonMainDataFromJson(show_pokemon_AsJson);
    return show_pokemon_AsJson;
}

/**
 * This function loads the main Json and converts it (Species)
 * Attention, this function is asyncron
 * 
 * @param {String} url Strings of the found URLs from the main JSON
 */
async function loadPokemonSpecies(url) {
    designation = [];
    let show_pokemon_species = await fetch(url);
    let show_pokemon_speciesAsJson = await show_pokemon_species.json();
    loadPokemonSpeciesDataFromJson(show_pokemon_speciesAsJson);
    for (let i = 0; i < show_pokemon_speciesAsJson.names.length; i++) {
        const element = show_pokemon_speciesAsJson.names[i];
        sortLanguageDesignation(element);
    }
}

/**
 * This function loads the main Json and converts it (Typs)
 * Attention, this function is asyncron
 * 
 * @param {String} url Strings of the found URLs from the main JSON
 */
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

/**
 * This function loads the main Json and converts it (Egg_groups)
 * Attention, this function is asyncron
 * 
 * @param {Number} id id of cardnumbers
 */
async function loadPokemonEgg_groups(id) {
    let egg_groups_temp = pokemon_main[id].egg_groups;
    pokemon_main[id].egg_groups = [];
    for (let k = 0; k < egg_groups_temp.length; k++) {
        const element = egg_groups_temp[k];
        let show_pokemon_egg_group_url = await fetch(element.url);
        let show_pokemon_egg_group_AsJson = await show_pokemon_egg_group_url.json();
        pokemon_main[id]['egg_groups'].push(show_pokemon_egg_group_AsJson.names);
    }
}

/**
 * This function loads the main Json and converts it (Abilities)
 * Attention, this function is asyncron
 * 
 * @param {Number} id id of cardnumbers
 */
async function loadPokemonAbilities(id) {
    let abilities_temp = pokemon_main[id].abilities;
    pokemon_main[id]['abilities'] = [];
    for (let l = 0; l < abilities_temp.length; l++) {
        const element = abilities_temp[l];
        let show_pokemon_abilities_url = await fetch(element.ability.url);
        let show_pokemon_abilities_AsJson = await show_pokemon_abilities_url.json();
        pokemon_main[id]['abilities'].push(show_pokemon_abilities_AsJson.names);
    }
}

/**
 * This function loads the main Json and converts it (EvolutionChain)
 * Attention, this function is asyncron
 * 
 * @param {Number} id id of cardnumbers
 */
async function loadPokemonEvolutionChain(id) {
    let evolution_chain_temp = pokemon_main[id].evolution_chain.url;
    pokemon_main[id]['evolution_chain'] = [];
    let show_pokemon_evolution_chain_url = await fetch(evolution_chain_temp);
    let show_pokemon_evolution_chain_AsJson = await show_pokemon_evolution_chain_url.json();
    pokemon_main[id]['evolution_chain'] = show_pokemon_evolution_chain_AsJson;
    queryEvolutionChain(id);
}

/**
 * This function queries all evolutions and writes them back into the (pokemon_main) variable
 * 
 * @param {Number} id id of Cardnumbers
 */
function queryEvolutionChain(id) {
    var temp = pokemon_main[id]['evolution_chain'];
    pokemon_main[id]['evolution_chain'] = [];
    if (temp.chain.species.name.length >= 1) {
        let index = shortText(temp.chain.species.url);
        pokemon_main[id]['evolution_chain'].push({ "name": temp.chain.species.name, "stufe": 1, index });
        if (temp.chain.evolves_to[0].species.name.length >= 1) {
            let index = shortText(temp.chain.evolves_to[0].species.url);
            pokemon_main[id]['evolution_chain'].push({ index, "name": temp.chain.evolves_to[0].species.name, "level_up": temp.chain.evolves_to[0].evolution_details[0].min_level, "stufe": 2 });
            if (temp.chain.evolves_to[0].evolves_to.length >= 1) {
                let index = shortText(temp.chain.evolves_to[0].evolves_to[0].species.url);
                pokemon_main[id]['evolution_chain'].push({ index, "name": temp.chain.evolves_to[0].evolves_to[0].species.name, "level_up": temp.chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level, "stufe": 3 });
            }
        }
    }
}

/**
 * This function cleans the return and removes the ( / ) character
 * 
 * @param {String} text     Imported from a Json
 * @returns                 Return without disturbances /
 */
function shortText(text) {
    return Number(text.slice(42, 46).replace("/", "")) - 1;
}

/**
 * This function loads the main Json and converts it (Habitat)
 * Attention, this function is asyncron
 * 
 * @param {Number} id id of cardnumbers
 */
async function leadPokemonHabitat(id) {
    let habitat_temp = pokemon_main[id].habitat;
    pokemon_main[id].habitat = [];
    let show_pokemon_habitat_url = await fetch(habitat_temp.url);
    let show_pokemon_habitat_AsJson = await show_pokemon_habitat_url.json();
    pokemon_main[id]['habitat'].push(show_pokemon_habitat_AsJson.names);
}

/**
 * This function processes the main Json and sets the necessary data
 * 
 * @param {String} show_pokemon_AsJson This string contains a complete Pokemon card MAIN
 */
function loadPokemonMainDataFromJson(show_pokemon_AsJson) {
    img = show_pokemon_AsJson.sprites.other.dream_world.front_default;
    id = pokemonId(show_pokemon_AsJson.id);
    stats = show_pokemon_AsJson.stats;
    weight = show_pokemon_AsJson.weight;
    height = show_pokemon_AsJson.height;
    abilities = show_pokemon_AsJson.abilities;
}

/**
 * This function processes the species Json and sets the necessary data
 * 
 * @param {String} show_pokemon_speciesAsJson This string contains a complete Pokemon card SPECIES
 */
function loadPokemonSpeciesDataFromJson(show_pokemon_speciesAsJson) {
    egg_groups = show_pokemon_speciesAsJson.egg_groups;
    bg_color = show_pokemon_speciesAsJson.color.name;
    genera = show_pokemon_speciesAsJson.genera;
    habitat = show_pokemon_speciesAsJson.habitat
    gender_rate = show_pokemon_speciesAsJson.gender_rate
    flavor_text_entries = show_pokemon_speciesAsJson.flavor_text_entries
    evolution_chain = show_pokemon_speciesAsJson.evolution_chain;
}

/**
 * This function converts the card number into an ID with #
 * 
 * @param {Numer} id    contains the number of the loaded card
 * @returns             Returns the number as an ID with # in front of it
 */
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

/**
 * This function pushes all relevant data into an array
 */
function pushToLocalCard() {
    pokemon_main.push({
        card_number,
        img,
        id,
        bg_color,
        designation,
        stats,
        egg_groups,
        weight,
        height,
        egg_groups,
        genera,
        typs,
        abilities,
        habitat,
        gender_rate,
        flavor_text_entries,
        evolution_chain,
    });
    like_list.push("");
    loadLikeList();

}

/**
 * This function loads the respective language
 * 
 * @param {String} country Language
 */
function loadOtherLanguages(country) {
    changeLanguages(country);
    language = country;
    loadStats(id);

}

/**
 * This function pushes the translations into the respective array
 * 
 * @param {String} b the word found in each language
 */
function sortLanguageDesignation(b) {
    let a = b.language.name;
    if (a == 'de' || a == 'en' || a == 'it' || a == 'es' || a == 'ja' || a == 'fr') {
        designation.push({
            'language': a,
            'text': b.name
        });
    }
}

/**
 * This function pushes the translations into the respective array
 * 
 * @param {string} b the word found in each language
 * @param {Number} i the associated array
 */
function sortLanguageTyps(b, i) {
    let a = b.language.name;
    if (a == 'de' || a == 'en' || a == 'it' || a == 'es' || a == 'ja' || a == 'fr') {
        typs[i].push({
            'language': a,
            'text': b.name
        });
    }
}

/**
 * This function loads the loading screen
 */
function loadProgressbar() {
    if (card_number >= 10) {
        if (card_number <= 11) {
            loadingScreenRemove();
        }
    } else {
        document.getElementById('body').classList.add('fixed');
        let percent = card_number / loading_counter;
        percent = Math.round(percent * 100);
        document.getElementById('progress-status').style.width = `${percent}%`;
        document.getElementById('progress-status').innerHTML = `${percent} %`;
    }
}

/**
 * This feature removes the loading screen
 */
function loadingScreenRemove() {
    document.getElementById('cards-screen').classList.remove('dn');
    const loader = document.getElementById('loader');
    loader.style.display = "none";
    document.getElementById('body').classList.remove('fixed');
}

/**
 * This function starts the search in all available languages
 * 
 * @param {String} a the word to search for
 */
function searchPokemon(a) {
    if (a == 'header') {
        var search = document.getElementById('search_input').value;
        document.getElementById('search_input_bottom').value = search;
    } else {
        var search = document.getElementById('search_input_bottom').value;
        document.getElementById('search_input').value = search;
    }
    search = search.toLowerCase();
    let found = 0;
    for (let i = 0; i < pokemon_main.length; i++) {
        const element = pokemon_main[i];
        found = searchPokemonDesignation(i, search, found);
        serachNotFound(found);
    };
}

/**
 * This function starts the search in all available languages. This loop continues until no more are found
 * 
 * @param {Number} i        The array of Pokomon_main
 * @param {String} search   The input field of the search function
 * @param {*} found         Counter whether something was found
 * @returns                 Return which ones were found
 */
function searchPokemonDesignation(i, search, found) {
    for (let j = 0; j < pokemon_main[i].designation.length; j++) {
        const element = pokemon_main[i].designation[j];
        let card_number = i;
        if (element.text.toLowerCase().includes(search)) {
            document.getElementById(`card-number-${card_number}`).classList.remove('dn');
            found++;
            break;
        } else {
            document.getElementById(`card-number-${card_number}`).classList.add('dn');
        };
    };
    return found;
}

/**
 * This function controls a scroll to top button
 */
function scrollToTop() {
    document.getElementById('scrollTopButton').addEventListener('click', function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
}

/**
 * This monitoring function controls the height of the Y scroll direction
 */
window.addEventListener('scroll', function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 200) {
        document.getElementById('scrollTopButton').style.display = 'block';
    } else {
        document.getElementById('scrollTopButton').style.display = 'none';
    }
})

/**
 * This function goes together with the search function and displays an image with a description if there is no hit
 * 
 * @param {Number} found if null then display none
 */
function serachNotFound(found) {
    if (found == 0) {
        document.getElementById('search-not-found').style.display = "";
    } else {
        document.getElementById('search-not-found').style.display = "none";
    }
}

/**
 * This function loads the respective layout of the individual cards
 * 
 * @param {String} layout This string contains the respective layout
 */
function loadCardOption(layout) {
    opinion = layout;
    removeClasslistCard();
    if (opinion == 'about') {
        loadCardOptionAbout(opinion);
    }
    if (opinion == 'base-stats') {
        loadCardOptionBaseStats(opinion);
    }
    if (opinion == 'evolution') {
        loadCardOptionEvolution(opinion);
    }
}

/**
 * This function loads the respective layout and hides the others
 * 
 * @param {String} opinion This string contains the respective layout
 */
function loadCardOptionAbout(opinion) {
    document.getElementById('about-option').classList.add('active');
    document.getElementById('about').classList.remove('dn');
    opinion = 'about';
}

/**
 * This function loads the respective layout and hides the others
 * 
 * @param {String} opinion This string contains the respective layout
 */
function loadCardOptionBaseStats(opinion) {
    document.getElementById('base-stats-option').classList.add('active');
    document.getElementById('base-stats').classList.remove('dn');
    opinion = 'base-stats';
}

/**
 * This function loads the respective layout and hides the others
 * 
 * @param {String} opinion This string contains the respective layout
 */
function loadCardOptionEvolution(opinion) {
    document.getElementById('evolution-option').classList.add('active');
    document.getElementById('evolution').classList.remove('dn');
    opinion = 'evolution';
}

/**
 * This function deletes all active rides in the individual map view
 */
function removeClasslistCard() {
    document.getElementById('about-option').classList.remove('active');
    document.getElementById('about').classList.add('dn');
    document.getElementById('base-stats-option').classList.remove('active');
    document.getElementById('base-stats').classList.add('dn');
    document.getElementById('evolution-option').classList.remove('active');
    document.getElementById('evolution').classList.add('dn');
}

/**
 * This function changes the view of all cards to a single view
 * 
 * @param {boolean} option This boolean value indicates on which a single card display is activated
 */
function showCard(option) {
    if (option == 'ture') {
        document.getElementById('cards-screen').classList.add('dn');
        document.getElementById('card-screen').classList.remove('dn');
    } else {
        enableSearchBottom();
        document.getElementById('card-screen').classList.add('dn');
        document.getElementById('cards-screen').classList.remove('dn');
    }
}

/**
 * This function loads the respective card
 * 
 * @param {Number} i        determines the card number that should be loaded
 * @param {String} layout   This string corresponds to the respective riding
 */
function loadCard(i, layout) {
    disableSearchBottom();
    showCard('ture');
    loadStats(i);
    loadCardOption(layout)
    id = i,
        loadCardElements(id);
    cardTypsSmall(id, language)
    document.getElementById('card-id').innerHTML = pokemonId(i + 1);
    loadBottomSmallCard(id);
    loadLikePokemon(id);
}

/**
 * This function generates the small type and translate
 * 
 * @param {Number} id the respective card number
 */
function cardTypsSmall(id) {
    document.getElementById('card-name').innerHTML = translator1Instance(id, ['designation'], language);
    document.getElementById('card-typs-small').innerHTML = "";
    for (let i = 0; i < pokemon_main[id].typs.length; i++) {
        let typ = translator2Instance(id, ['typs'], language, i);
        document.getElementById('card-typs-small').innerHTML += `
        <span class=" mb-2 badge rounded-pill span shadow ${pokemon_main[id]['bg_color']}-typs">${typ}</span>`;
    }
}

/**
 * 
This function loads the Pokemon image and loads the corresponding background
 * 
 * @param {Number} i the respective card number
 */
function loadCardElements(i) {
    loadBottomSmallCard(i);
    if (pokemon_main[i].like == 1) {
        document.getElementById('card-img').src = pokemon_main[i]['img'];
        document.getElementById('card-screen-bg').classList = `card-screen-small card rounded-5 border-0  ${pokemon_main[i]['bg_color'] + '-animation'}`;
    } else {
        document.getElementById('card-img').src = pokemon_main[i]['img'];
        document.getElementById('card-screen-bg').classList = `card-screen-small card rounded-5 border-0  ${pokemon_main[i]['bg_color']}`;
    }
}

/**
 * This function translates the following into the respective language
 * 
 * @param {Number} id               number of the card
 * @param {String} paragraph        paragraph of the language to be sent
 * @param {String} translate_in     language to translate
 * @returns                         returns the translated text
 */
function translator1Instance(id, paragraph, translate_in) {
    for (let i = 0; i < pokemon_main[id][paragraph].length; i++) {
        const element = pokemon_main[id][paragraph][i];
        if (element.language == translate_in) {
            return element.text;
        }
    }
}

/**
 * This function translates the following into the respective language
 * 
 * @param {Number} id               number of the card
 * @param {String} paragraph        paragraph of the language to be sent
 * @param {String} translate_in     language to translate
 * @param {Number} tabel            table of the language to be translated
 * @returns                         returns the translated text
 */
function translator2Instance(id, paragraph, translate_in, tabel) {
    for (let i = 0; i < pokemon_main[id][paragraph][tabel].length; i++) {
        const element = pokemon_main[id][paragraph][tabel][i];
        if (element.language == translate_in) {
            return element.text;
        };
    };
};

/**
 * This function translates the following into the respective language
 * 
 * @param {Number} id               number of the card
 * @param {String} paragraph        paragraph of the language to be sent
 * @param {String} translate_in     language to translate
 * @returns                         returns the translated text
 */
function translator3Instance(id, paragraph, translate_in) {
    for (let i = 0; i < pokemon_main[id][paragraph].length; i++) {
        const element = pokemon_main[id][paragraph][i];
        if (element.language.name == translate_in) {
            return element.genus;
        }
    }
}

/**
 * This function translates the following into the respective language
 * 
 * @param {Number} id               number of the card
 * @param {String} paragraph        paragraph of the language to be sent
 * @param {String} translate_in     language to translate
 * @param {Number} tabel            table of the language to be translated
 * @returns                         returns the translated text
 */
function translator4Instance(id, paragraph, translate_in, tabel) {
    for (let i = 0; i < pokemon_main[id][paragraph][tabel].length; i++) {
        const element = pokemon_main[id][paragraph][tabel][i];
        if (element.language.name == translate_in) {
            return element.name;
        }
    };
};

/**
 * This function loads all stas of the respective card ID
 * 
 * @param {Number} i card number
 */
function loadStats(i) {
    if (typeof i == 'string') {
        i = 1;
        loadStats(i);
    } else {
        loadEvolutionStats(i);
        loadStatsAbout(i);
        loadStatsbasestats(i);
        cardTypsSmall(i)
        translateLayout(i);
    }
};

/**
 * This function translates the layout into the respective language
 */
function translateLayout() {
    for (let i = 0; i < language_other_data.length; i++) {
        const element = language_other_data[i];
        if (element.language == language) {
            changeAbout(element);
            changeBaseStats(element);
            changeOption(element);
            changeEvolution(element);
        }
    }
}

/**
 * This function checks whether the card has an evolution and whether it is already loaded
 * 
 * @param {String} element the respective stage of evolution
 */
function changeEvolution(element) {
    document.getElementById('header_bas_stats').innerHTML = element.evo_chain;
    if (document.getElementById('header-bas-stats_not_found') != undefined) {
        document.getElementById('header-bas-stats_not_found').innerHTML = element.evo_not_found;
    }
    document.getElementById('lvl-status1').innerHTML = element.lvl;
    if (document.getElementById('lvl-status2') != null) {
        document.getElementById('lvl-status2').innerHTML = element.lvl;
    };
}

/**
 * This function translates the respective paragraph
 * 
 * @param {string} element id of each paragraph to be translated
 */
function changeOption(element) {
    document.getElementById('about-option').innerHTML = element.about;
    document.getElementById('base-stats-option').innerHTML = element.base_stats;
    document.getElementById('evolution-option').innerHTML = element.evolution;
}

/**
 * This function translates the respective paragraph
 * 
 * @param {string} element id of each paragraph to be translated
 */
function changeAbout(element) {
    document.getElementById('translate-species').innerHTML = element.species;
    document.getElementById('translate-height').innerHTML = element.height;
    document.getElementById('translate-weight').innerHTML = element.weight;
    document.getElementById('translate-abilities').innerHTML = element.abilities;
    document.getElementById('translate-gender').innerHTML = element.gender;
    document.getElementById('translate-egg_cycle').innerHTML = element.egg_cycle;
    document.getElementById('translate-egg_groups').innerHTML = element.egg_groups;
    document.getElementById('translate-breeding').innerHTML = element.breeding;
    changeBaseStatsLoad();
}

/**
 * This function translates the respective paragraph
 * 
 * @param {string} element id of each paragraph to be translated
 */
function changeBaseStats(element) {
    document.getElementById('translate-hp').innerHTML = element.hp;
    document.getElementById('translate-attack').innerHTML = element.attack;
    document.getElementById('translate-defense').innerHTML = element.defense;
    document.getElementById('translate-special-attack').innerHTML = element.sp_atk;
    document.getElementById('translate-special-defense').innerHTML = element.sp_def;
    document.getElementById('translate-speed').innerHTML = element.speed;
    document.getElementById('translate-total').innerHTML = element.total;
    document.getElementById('translate-fact').innerHTML = element.fact;
}

/**
 * This function sets the relevant data for the card number
 * 
 * @param {Number} i card number
 */
function loadStatsAbout(i) {
    let height = Number((pokemon_main[i].height / 2.54)).toFixed(2);
    let weight = Number((pokemon_main[i].weight * 2.535)).toFixed(1);
    document.getElementById('card-height').innerHTML = `${height}´´ (${(pokemon_main[i].height / 10).toFixed(2)} cm)`;
    document.getElementById('card-weight').innerHTML = `${weight} lbs (${(pokemon_main[i].weight / 10).toFixed(1)} kg)`;
    document.getElementById('card-species').innerHTML = translator3Instance([i], ['genera'], language);
    document.getElementById('card-female').innerHTML = Number(100 - ((pokemon_main[i].gender_rate / 10) * 100));
    document.getElementById('card-male').innerHTML = Number((pokemon_main[i].gender_rate / 10) * 100);
    createEggGroup(i);
    createAbilities(i);
    createHabitat(i);
}

/**
 * This function creates the EggGroup
 * 
 * @param {Number} id card number
 */
function createEggGroup(id) {
    document.getElementById('card-egg_groups').innerHTML = "";
    for (let j = 0; j < pokemon_main[id]['egg_groups'].length; j++) {
        const element = pokemon_main[id]['egg_groups'][j];
        let group = translator4Instance(id, ['egg_groups'], language, j);
        if (group !== undefined) {
            group = group.replace("1", "");
            document.getElementById('card-egg_groups').innerHTML += `${group}`;
        } else {
            document.getElementById('card-egg_groups').innerHTML = notFoundTranslate();
        }
    }
}

/**
* This function creates the Abilities
* 
* @param {Number} id card number
*/
function createAbilities(id) {
    document.getElementById('card-abilities').innerHTML = "";
    for (let j = 0; j < pokemon_main[id]['abilities'].length; j++) {
        const element = pokemon_main[id]['abilities'][j];
        let group = translator4Instance(id, ['abilities'], language, j);
        if (group !== undefined) {
            document.getElementById('card-abilities').innerHTML += `${group} `;
        } else {
            document.getElementById('card-abilities').innerHTML = notFoundTranslate();
        }
    }
}

/**
* This function creates the Habitat
* 
* @param {Number} id card number
*/
function createHabitat(id) {
    document.getElementById('card-egg_cycle').innerHTML = "";
    for (let j = 0; j < pokemon_main[id]['habitat'].length; j++) {
        const element = pokemon_main[id]['habitat'][j];
        let group = translator4Instance(id, ['habitat'], language, 0);
        if (group !== undefined) {
            document.getElementById('card-egg_cycle').innerHTML = `<b>${group} </b>`;
        } else {
            document.getElementById('card-egg_cycle').innerHTML = notFoundTranslate();
        }
    }
}

/**
 * This function creates the basic stats
 * 
 * @param {Number} i card number
 */
function loadStatsbasestats(i) {
    createStats(i);
    createFacts(i);
}

/**
 * This function creates the Stats and load data
 * 
 * @param {Number} i card number
 */
function createStats(i) {
    document.getElementById('create-base-stats').innerHTML = "";
    let total = 0;
    for (let j = 0; j < pokemon_main[i]['stats'].length; j++) {
        const element = pokemon_main[i]['stats'][j];
        if (element.base_stat <= 45) {
            var progress_color = 'bg-danger';
        } else if (element.base_stat <= 65) {
            var progress_color = 'bg-warning';
        } else {
            var progress_color = 'bg-success';
        }
        total = total + element.base_stat;
        document.getElementById('create-base-stats').innerHTML += createStatsTabelSingel(element.stat.name, element.base_stat, progress_color);
    }
    createProgressBarEnd(total);
    changeBaseStatsLoad();
}

/**
 * This function creates the progress bars of the stats
 * 
 * @param {Number} total the individual values ​​of the stats
 */
function createProgressBarEnd(total) {
    total_percent = (total / 6).toFixed(0);
    if (total <= 30) {
        var progress_color_total = 'bg-danger';
    } else if (total <= 60) {
        var progress_color_total = 'bg-warning';
    } else {
        var progress_color_total = 'bg-success';
    }
    document.getElementById('create-base-stats').innerHTML += createStatsTabelEnd(total, progress_color_total, total_percent);
};

/**
 * This function loads the facs of the individual cards
 * 
 * @param {Number} i card number
 */
function createFacts(i) {
    for (let j = 0; j < pokemon_main[i]['flavor_text_entries'].length; j++) {
        const element = pokemon_main[i]['flavor_text_entries'][j];
        if (element.language.name == language) {
            document.getElementById('translate-facts').innerHTML = element.flavor_text;
            break;
        }
    }
}

/**
 * This function change the facs of the individual cards
 * 
 */
function changeBaseStatsLoad() {
    for (let i = 0; i < language_other_data.length; i++) {
        const element = language_other_data[i];
        if (element.language == language) {
            changeBaseStats(element);
        }
    }
}

/**
 * This function loads the evolutionsStats of the individual cards
 * 
 * @param {Number} i card number
 */
function loadEvolutionStats(i) {
    number = card_number - 1;
    if (pokemon_main[i].evolution_chain.length == 3) {
        if (pokemon_main[i].evolution_chain[0].index <= number && pokemon_main[i].evolution_chain[1].index <= number && pokemon_main[i].evolution_chain[2].index <= number) {
            createEvolutionTemplate3(i);
        } else {
            createEvolutionTemplate3NotFound(i);
        }
    }
    if (pokemon_main[i].evolution_chain.length == 2) {
        if (pokemon_main[i].evolution_chain[0].index <= number && pokemon_main[i].evolution_chain[1].index <= number) {
            createEvolutionTemplate2(i);
        } else {
            createEvolutionTemplate2NotFound(i);
        }
    }
}

/**
 * This function modifies and generates the left and right arrows
 * 
 * @param {Number} i card number
 */
function loadBottomSmallCard(i) {
    let addi = i + 1;
    let removei = i - 1;
    if (i == 0) {
        loadBottomSmallCardLeft()
    } else
        if (i == loading_counter) {
            loadBottomSmallCardRight()
        } else {
            document.getElementById('left-card').innerHTML = createSmallBottomLeft();
            document.getElementById('right-card').innerHTML = createSmallBottomRight();
            document.getElementById("left-card").onclick = function () { loadCard(removei, opinion) };
            document.getElementById("right-card").onclick = function () { loadCard(addi, opinion) };
        }
}

/**
 * This function clears the left arrow when the first card is shown
 */
function loadBottomSmallCardLeft() {
    document.getElementById('left-card').innerHTML = `
    <div style="height: 30px; width: 30px;"></div>`;
    document.getElementById('right-card').innerHTML = createSmallBottomRight();
    document.getElementById("right-card").onclick = function () { loadCard(1, opinion) };
    i = 0;
}

/**
 * This function clears the left arrow when the last card is shown
 */
function loadBottomSmallCardRight() {
    document.getElementById('right-card').innerHTML = `
<div style="height: 30px; width: 30px;"></div>`;
    document.getElementById('left-card').innerHTML = createSmallBottomLeft();
    document.getElementById("left-card").onclick = function () { loadCard(loading_counter - 1, opinion) };
}

/**
 * 
This function is used if no translation was found
 */
function notFoundTranslate() {
    for (let i = 0; i < language_other_data.length; i++) {
        const element = language_other_data[i];
        if (element.language == language) {
            return element.not_found;
        }
    }
}

/**
 * This function deactivates the search bar when a map is called up
 */
function disableSearchBottom() {
    document.getElementById('nav-footer').classList.add('dn');
}

/**
 * This function activates the search bar when a map is called up
 */
function enableSearchBottom() {
    document.getElementById('nav-footer').classList.remove('dn');
}

/**
 * This function looks for the ID based on the card number and marks it with a red heart
 */
function likePokemon() {
    if (like_list[id] == "") {
        like_list[id] = 1;
        saveLikeList();
        heartRed(id);
    } else {
        like_list[id] = 0;
        heartBlack(id);
        saveLikeList();
    }
}

/**
 * This function loads all ready-leaked cards. The cards that have received a like are in the like_list
 * 
 * @param {Number} cn I like the card number
 */
function loadLikePokemon(cn) {
    if (like_list[cn] == 1) {
        heartRed(cn);

    } else {
        like_list[cn] = "";
        heartBlack(cn);
    }
}

/**
 * This function changes the heart to a red one
 * 
 * @param {Numer} cn the card number of the card I like
 */
function heartRed(cn) {
    document.getElementById('card-screen-bg').classList.remove(pokemon_main[cn]['bg_color']);
    document.getElementById('card-screen-bg').classList.add(pokemon_main[cn]['bg_color'] + '-animation');
    document.getElementById(`card-number-${cn}`).classList.remove(pokemon_main[cn]['bg_color']);
    document.getElementById(`card-number-${cn}`).classList.add(pokemon_main[cn]['bg_color'] + '-animation');
    document.getElementById('heat').innerHTML = `<path  stroke="red" fill="red"
    d="M12 21.35l-1.45-1.32C5.4 16.18 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 7.68-8.55 11.54L12 21.35z" />`;
}

/**
 * This function changes the heart to a black one
 * 
 * @param {Numer} cn the card number of the card I like
 */
function heartBlack(cn) {
    document.getElementById('card-screen-bg').classList.remove(pokemon_main[cn]['bg_color'] + '-animation');
    document.getElementById('card-screen-bg').classList.add(pokemon_main[cn]['bg_color']);
    document.getElementById(`card-number-${cn}`).classList.remove(pokemon_main[cn]['bg_color'] + '-animation');
    document.getElementById(`card-number-${cn}`).classList.add(pokemon_main[cn]['bg_color']);
    document.getElementById('heat').innerHTML = `<path  stroke="black" fill="transparent"
    d="M12 21.35l-1.45-1.32C5.4 16.18 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 7.68-8.55 11.54L12 21.35z" />`;
}

/**
 * I like this function to store data in the local storage
 */
function saveLikeList() {
    let like_listAsText = JSON.stringify(like_list);
    localStorage.setItem('like_list', like_listAsText);
}

/**
 * This function loads the data into the local storage
 */
function loadLikeList() {
    let like_listAsText = localStorage.getItem('like_list');
    if (like_listAsText) {
        like_list = JSON.parse(like_listAsText);
    }
}

/**
 * This function controls the more loading botton
 * 
 * @param {Number} i card number
 */
function loadCardMore(i) {
    loading_counter = loading_counter + 10;
    document.getElementById('load-card-more').disabled = true;
    document.getElementById('search_input').value = "";
    document.getElementById('search_input_bottom').value = "";
    searchPokemon('header');
    loadBlock();
}

/**
 * This function generates the imprint and the documentation
 */
function generateImpressum(){
    document.getElementById('impressum-header').innerHTML = 'Dokumentation / Impressum'

    document.getElementById('impressum-text').innerHTML += templateImpressum();
}