
function init() {
    loadBlock();
    //loadOtherLanguages(language);
    scrollToTop();

}

async function loadBlock() {
    if (card_number <= loading_counter) {
        card_number++;
        await loadData(card_number);
        pushToLocalCard();
        loadPokemonEgg_groups(card_number - 1);
        loadPokemonAbilities(card_number - 1);
        leadPokemonHabitat(card_number - 1);
        loadPokemonEvolutionChain(card_number - 1);
        createSmallCard();
        loadBlock();
        loadProgressbar();
    } else {
        console.log('STOP! Es wurden ' + card_number + ' Karten geladen.');
        console.log('Pokemon Main= ', pokemon_main)
    }
}

async function loadData(card_number) {
    let url_start = loadPokemonMain(card_number);
    let urls = await url_start;
    let a1 = loadPokemonSpecies(urls.species.url);
    let a2 = loadPokemonTyps(urls.types);

    await Promise.all([a1, a2]);
}

async function loadPokemonMain(card_number) {
    let load_pokemon_main_url = main_url + card_number;
    let show_pokemon_main = await fetch(load_pokemon_main_url);
    var show_pokemon_AsJson = await show_pokemon_main.json();
    // console.log('Main Main= ', show_pokemon_AsJson);
    loadPokemonMainDataFromJson(show_pokemon_AsJson);
    return show_pokemon_AsJson;
}

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



async function loadPokemonEvolutionChain(id) {
    let evolution_chain_temp = pokemon_main[id].evolution_chain.url;
    pokemon_main[id]['evolution_chain'] = [];
    let show_pokemon_evolution_chain_url = await fetch(evolution_chain_temp);
    let show_pokemon_evolution_chain_AsJson = await show_pokemon_evolution_chain_url.json();
    pokemon_main[id]['evolution_chain'] = show_pokemon_evolution_chain_AsJson;
    queryEvolutionChain(id);
}

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

function shortText(text) {
    return Number(text.slice(42, 46).replace("/", "")) - 1;
}

async function leadPokemonHabitat(id) {
    let habitat_temp = pokemon_main[id].habitat;
    pokemon_main[id].habitat = [];
    let show_pokemon_habitat_url = await fetch(habitat_temp.url);
    let show_pokemon_habitat_AsJson = await show_pokemon_habitat_url.json();
    pokemon_main[id]['habitat'].push(show_pokemon_habitat_AsJson.names);
}


function loadPokemonMainDataFromJson(show_pokemon_AsJson) {
    img = show_pokemon_AsJson.sprites.other.dream_world.front_default;
    id = pokemonId(show_pokemon_AsJson.id);
    stats = show_pokemon_AsJson.stats;
    weight = show_pokemon_AsJson.weight;
    height = show_pokemon_AsJson.height;
    abilities = show_pokemon_AsJson.abilities;
}

function loadPokemonSpeciesDataFromJson(show_pokemon_speciesAsJson) {
    egg_groups = show_pokemon_speciesAsJson.egg_groups;
    bg_color = show_pokemon_speciesAsJson.color.name;
    genera = show_pokemon_speciesAsJson.genera;
    habitat = show_pokemon_speciesAsJson.habitat
    gender_rate = show_pokemon_speciesAsJson.gender_rate
    flavor_text_entries = show_pokemon_speciesAsJson.flavor_text_entries
    evolution_chain = show_pokemon_speciesAsJson.evolution_chain;
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
        evolution_chain
    });
}

function loadOtherLanguages(country) {
    changeLanguages(country);
    language = country;
    loadStats(id);
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
    showCard('ture');
    loadCardOption('about')
    id = i,
        // i = i - 1;
        loadCardElements(i);
    cardTypsSmall(i, language)

    console.log('karten index=', i)
    console.log('karten Nummer=', i)

    document.getElementById('card-id').innerHTML = pokemonId(i + 1);
    loadStats(i);

}

function cardTypsSmall(id) {
    document.getElementById('card-name').innerHTML = translator1Instance(id, ['designation'], language);
    document.getElementById('card-typs-small').innerHTML = "";
    for (let i = 0; i < pokemon_main[id].typs.length; i++) {
        let typ = translator2Instance(id, ['typs'], language, i);
        document.getElementById('card-typs-small').innerHTML += `
        <span class=" mb-2 badge rounded-pill shadow ${pokemon_main[id]['bg_color']}-typs">${typ}</span>`;
    }
}

function loadCardElements(i) {
    loadBottomSmallCard(i);
    console.warn(pokemon_main[i]['img'])
    document.getElementById('card-img').src = pokemon_main[i]['img'];
    document.getElementById('card-screen-bg').classList = `card rounded-5 border-0 mt-4 ${pokemon_main[i]['bg_color']}`;

}

function translator1Instance(id, paragraph, translate_in) {
    for (let i = 0; i < pokemon_main[id][paragraph].length; i++) {
        const element = pokemon_main[id][paragraph][i];
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

function translator3Instance(id, paragraph, translate_in) {
    for (let i = 0; i < pokemon_main[id][paragraph].length; i++) {
        const element = pokemon_main[id][paragraph][i];
        if (element.language.name == translate_in) {
            return element.genus;
        }
    }
}

function translator4Instance(id, paragraph, translate_in, tabel) {
    for (let i = 0; i < pokemon_main[id][paragraph][tabel].length; i++) {
        const element = pokemon_main[id][paragraph][tabel][i];
        if (element.language.name == translate_in) {
            return element.name;
        }
    };
};

function loadStats(i) {
    loadEvolutionStats(i);
    translateLayout(i);
    loadStatsAbout(i);
    loadStatsbasestats(i);
    loadBottomSmallCard(i);
    cardTypsSmall(i)
};

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

function changeEvolution(element) {
    console.log(element);
    document.getElementById('header-bas-stats').innerHTML = element.evo_chain;
    document.getElementById('lvl-status1').innerHTML = element.lvl;
    if (document.getElementById('lvl-status2') != null) {
        document.getElementById('lvl-status2').innerHTML = element.lvl;
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
    changeBaseStatsLoad();
}

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

function loadStatsAbout(i) {
    let height = Number((pokemon_main[i].height / 2.54)).toFixed(2);
    let weight = Number((pokemon_main[i].weight * 2.535)).toFixed(1);
    document.getElementById('card-height').innerHTML = `${height}´´ (${(pokemon_main[i].height / 10).toFixed(2)} cm)`;
    document.getElementById('card-weight').innerHTML = `${weight} lbs (${(pokemon_main[i].weight / 10).toFixed(1)} kg)`;
    document.getElementById('card-species').innerHTML = translator3Instance([i], ['genera'], language);
    document.getElementById('card-female').innerHTML = Number(100 - ((pokemon_main[i].gender_rate / 5) * 100));
    document.getElementById('card-male').innerHTML = Number((pokemon_main[i].gender_rate / 5) * 100);
    createEggGroup(i);
    createAbilities(i);
    createHabitat(i);
}

function createEggGroup(id) {
    document.getElementById('card-egg_groups').innerHTML = "";
    for (let j = 0; j < pokemon_main[id]['egg_groups'].length; j++) {
        const element = pokemon_main[id]['egg_groups'][j];
        let group = translator4Instance(id, ['egg_groups'], language, j);
        if (group !== undefined) {
            group = group.replace("1", "");
            document.getElementById('card-egg_groups').innerHTML += `<b>${group} </b>`;
        } else {
            document.getElementById('card-egg_groups').innerHTML = not_found;
        }
    }
}

function createAbilities(id) {
    document.getElementById('card-abilities').innerHTML = "";
    for (let j = 0; j < pokemon_main[id]['abilities'].length; j++) {
        const element = pokemon_main[id]['abilities'][j];
        let group = translator4Instance(id, ['abilities'], language, j);
        if (group !== undefined) {
            document.getElementById('card-abilities').innerHTML += `<b>${group} </b>`;
        } else {
            document.getElementById('card-abilities').innerHTML = not_found;
        }
    }
}

function createHabitat(id) {
    document.getElementById('card-egg_cycle').innerHTML = "";
    for (let j = 0; j < pokemon_main[id]['habitat'].length; j++) {
        const element = pokemon_main[id]['habitat'][j];
        let group = translator4Instance(id, ['habitat'], language, 0);
        if (group !== undefined) {
            document.getElementById('card-egg_cycle').innerHTML = `<b>${group} </b>`;
        } else {
            document.getElementById('card-egg_cycle').innerHTML = not_found;
        }
    }
}

function loadStatsbasestats(i) {
    createStats(i);
    createFacts(i);
}

function createStats(i) {
    document.getElementById('create-base-stats').innerHTML = "";
    let total = 0;
    let total_percent = 0
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

function createFacts(i) {

    for (let j = 0; j < pokemon_main[i]['flavor_text_entries'].length; j++) {
        const element = pokemon_main[i]['flavor_text_entries'][j];
        if (element.language.name == language) {
            document.getElementById('translate-facts').innerHTML = element.flavor_text;
            break;
        }
    }
}

function changeBaseStatsLoad() {
    for (let i = 0; i < language_other_data.length; i++) {
        const element = language_other_data[i];
        if (element.language == language) {
            changeBaseStats(element);
        }
    }
}

function loadEvolutionStats(i) {
    if (pokemon_main[i].evolution_chain.length == 3) {
        createEvolutionTemplate3(i);
    } else if (pokemon_main[i].evolution_chain.length == 2) {
        createEvolutionTemplate2(i);
    }
}

function loadBottomSmallCard(i) {
    console.log('hier hallo:', i)

    let addi = i + 1;
    let remove1 = i - 1;

    if (i == 0) {
        document.getElementById('left-card').innerHTML = `
        <div style="height: 30px; width: 30px;"></div>
        `;

        i = 0;
    } else {
        document.getElementById('left-card').innerHTML = `  <svg  style="height: 30px; width: 30px;" xmlns="http://www.w3.org/2000/svg" width="100" height="100"
        viewBox="0 0 24 24">
        <g transform="scale(-1, 1) translate(-24, 0)">
          <path fill="black" d="M14 12l-6-6 1.41-1.41L16.83 12l-7.42 7.42L8 18z" />
        </g>
      </svg>`;
        document.getElementById("left-card").onclick = function () { loadCard(remove1) };

        document.getElementById("right-card").onclick = function () { loadCard(addi) };

    }




}