function createSmallCard() {
    let id_number = card_number - 1;
    for (let i = 0; i < designation.length; i++) {
        const element = designation[i];
        if (element.language == language) {
            document.getElementById('content-small').innerHTML += `
        <div onclick="loadCard(${id_number})" id="card-number-${id_number}" class="card border-2 shadow m-3 ${bg_color} " style="width: 250px; height: 170px; ">
            <div class=" g-0 d-flex p-0 justify-content-between pokeball-img">
                <div style="">
                    <div class="card-body ">
                        <h5 class="card-title" id="name-small-${id_number}">${designation[i]['text']}</h5>
                        <div id="typs-small-${id_number}" class="typ-small">
                     
                        </div>
                    </div>
                    <div>
                        <p class="card-body pt-0 pb-0 id-style">${id}</p>
                    </div>
                </div>
                <div class="">
                    <img class="img-fluid rounded-start pokemon"
                    src="${img}"alt="...">
                </div>
            </div>
        </div>
        `;
        }
    }
    for (let i = 0; i < typs.length; i++) {
        const element = typs[i];
        let typ = element;

        for (let l = 0; l < typ.length; l++) {
            const element = typ[l];
            if (element.language == language) {
                document.getElementById(`typs-small-${id_number}`).innerHTML += `
            <span class=" mb-2 badge rounded-pill shadow ${bg_color}-typs">${element.text}</span>
            `;
            }
        }
    }
}

function changeLanguages(l) {
    for (let h = 0; h < language_other_data.length; h++) {
        const element = language_other_data[h];
        if (element.language == l) {
            document.getElementById('search_input').placeholder = `${element.search}`;
            document.getElementById('country').innerHTML = `
            <img  class="menu-flag justify-content-between align-items-center" src="./img/icon/${element.language}.png" alt="">${element.speak}`;
            document.getElementById('brand').innerHTML = `${element.brand}`;
            document.getElementById('flagg-list').innerHTML = `
            <li onclick="loadOtherLanguages('de')"><a
                class="dropdown-item d-flex justify-content-between align-items-center" href="#" >${element.de}<img
                  src="./img/icon/de.png" alt=""></a></li>
            <li onclick="loadOtherLanguages('en')"><a
                class="dropdown-item d-flex justify-content-between align-items-center" href="#" >${element.en}<img
                  src="./img/icon/en.png" alt=""></a></li>
            <li onclick="loadOtherLanguages('fr')"><a
                class="dropdown-item d-flex justify-content-between align-items-center" href="#" >${element.fr}<img
                  src="./img/icon/fr.png" alt=""></a></li>
            <li onclick="loadOtherLanguages('es')"><a
                class="dropdown-item d-flex justify-content-between align-items-center" href="#" >${element.es}<img
                  src="./img/icon/es.png" alt=""></a></li>
            <li onclick="loadOtherLanguages('it')"><a
                class="dropdown-item d-flex justify-content-between align-items-center" href="#" >${element.it}<img
                  src="./img/icon/it.png" alt=""></a></li>
            <li onclick="loadOtherLanguages('ja')"><a
                class="dropdown-item d-flex justify-content-between align-items-center" href="#" >${element.ja}<img
                  src="./img/icon/ja.png" alt=""></a></li>
                  `;
            document.getElementById('search-not-found').innerHTML = `
            <div class="mt-5 d-flex justify-content-center align-items-center flex-column text-center">
            ${element.load_more}
            <img style="width: 250px; margin-top: 50px;" src="./img/pokemon-cliparts.png" alt="">
            </div>
            `;
        }
    }
    for (let i = 0; i < pokemon_main.length; i++) {
        const element = pokemon_main[i];
        let bg_color = pokemon_main[i].bg_color;
        let card_number = i;
        document.getElementById(`typs-small-${card_number}`).innerHTML = '';
        for (let j = 0; j < pokemon_main[i].designation.length; j++) {
            const element = pokemon_main[i].designation[j];
            if (element.language == l) {
                document.getElementById(`name-small-${card_number}`).innerHTML = `${element.text}`;
            }
        }
        for (let k = 0; k < pokemon_main[i].typs.length; k++) {
            const element = pokemon_main[i].typs[k];

            let typs_translate = element;

            for (let m = 0; m < typs_translate.length; m++) {
                const element = typs_translate[m];


                if (element.language == l) {
                    document.getElementById(`typs-small-${card_number}`).innerHTML += `
                <span class=" mb-2 badge rounded-pill shadow ${bg_color}-typs">${element.text}</span>
                `;
                }
            }
        }
    }
}

function createSliderBottom() {

    for (let i = 0; i < designation.length; i++) {
        const element = designation[i];
        if (element.language == language) {
            document.getElementById('silder-bottom').innerHTML += `
            <swiper-slide class="d-flex justify-content-center">
        <div id="card-number-${card_number}" class=" card border-2 shadow m-3 ${bg_color} " style="width: 250px; height: 170px;">
            <div class=" g-0 d-flex p-0 justify-content-center pokeball-img">
                <div style="">
                    <div class="card-body ">
                        <h5 class="card-title" id="name-small-${card_number}">${designation[i]['text']}</h5>
                        <div id="typs-small-${card_number}" class="typ-small">
                     
                        </div>
                    </div>
                    <div>
                        <p class="card-body pt-0 pb-0 id-style">${id}</p>
                    </div>
                </div>
                <div class="">
                    <img class="img-fluid rounded-start pokemon"
                    src="${img}"alt="...">
                </div>
            </div>
        </div>
        </swiper-slide>
        `;
        }
    }
    for (let i = 0; i < typs.length; i++) {
        const element = typs[i];
        if (element.language == language) {
            document.getElementById(`typs-small-${card_number}`).innerHTML += `
            <span class=" mb-2 badge rounded-pill shadow ${bg_color}-typs">${element.text}</span>
            `;
        }
    }
}

function createStatsTabelSingel(name, base_stat, progress_color) {
    let name_small = name.replace("special-", "sp-");



    let template = `<div class="d-flex justify-content-between align-items-center">
    <div class="basic-data-left ">
            <p id="translate-${name}" class="mb-2">${name_small}</p>
        </div>
    <div class="basic-data-center ">
        <p class="mb-2"><b>${base_stat}</b></p>
    </div>
    <div class="basic-data-right ">
        <div class="progress mb-2" style="height: 0.5rem;" role="progressbar" aria-label="Success example"
            aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar  ${progress_color}" style="width: ${base_stat}%"></div>
        </div>
    </div>
</div>
`;
    return template
}

function createStatsTabelEnd(total, progress_color_total, total_percent) {
    let template = `<div class="d-flex justify-content-between align-items-center">
    <div class="basic-data-left ">
            <p id="translate-total" class="mb-2">Total</p>
        </div>
    <div class="basic-data-center ">
        <p class="mb-2"><b>${total}</b></p>
    </div>
    <div class="basic-data-right ">
        <div class="progress mb-2" style="height: 0.5rem;" role="progressbar" aria-label="Success example"
            aria-valuenow="25" aria-valuemin="0" aria-valuemax="600">
        <div class="progress-bar  ${progress_color_total}" style="width: ${total_percent}px"></div>
        </div>
    </div>
</div>
`;
    return template
}

function createEvolutionTemplate3(id) {
    for (let k = 0; k < pokemon_main[id].evolution_chain.length; k++) {
        const element = pokemon_main[id].evolution_chain[k];
        var index = element.index;
        for (let m = 0; m < pokemon_main[index].designation.length; m++) {
            const element = pokemon_main[index].designation[m];
     
            if (element.language == language) {
                let name = element.text;
                if (k == 0) {
                    var name_stufe1 = name;
                }
                if (k == 1) {
                    var name_stufe2 = name;
                }
                if (k == 2) {
                    var name_stufe3 = name;
                }
            }
        }
    }
    document.getElementById('evolution').innerHTML = `
    <h5 id="header-bas-stats" class="text-center mb-4" >Evolutiondsa Chain</h5>
                <div class="d-flex justify-content-between justify-content-center">
                  <div class="evolution-left d-flex justify-content-center flex-column">
                    <img 
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon_main[id].evolution_chain[0].index + 1}.svg"
                      alt="">
                    <p class="text-center"><b>${name_stufe1}</b></p>
                  </div>
                  <div class="evolution-center d-flex justify-content-center align-items-center flex-column">
                    <svg class="ps-2 pe-2" xmlns="http://www.w3.org/2000/svg" width="70" height="40"
                      viewBox="0 0 70 40">
                      <line x1="0" y1="20" x2="60" y2="20" stroke="rgba(0, 0, 0, 0.2)" stroke-width="2" />
                      <polygon points="60,15 70,20 60,25" fill="rgba(0, 0, 0, 0.2)" />
                    </svg>
                    <p class="text-center"><b id="lvl-status1">Lvl</b>${pokemon_main[id].evolution_chain[1].level_up}</p>
                  </div>
                  <div class="evolution-right d-flex justify-content-center flex-column ">
                    <img onklick="loadCard(${pokemon_main[id].card_number-1})"
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon_main[id].evolution_chain[1].index + 1}.svg"
                      alt="">
                    <p class="text-center"><b>${name_stufe2}</b></p>
                  </div>
                </div>
                <div span class="border-bottom mb-3"></div>
                <div class="d-flex justify-content-between justify-content-center">
                  <div class="evolution-left d-flex justify-content-center flex-column">
                    <img
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon_main[id].evolution_chain[1].index + 1}.svg"
                      alt="">
                    <p class="text-center"><b>${name_stufe2}</b></p>
                  </div>
                  <div class="evolution-center d-flex justify-content-center align-items-center flex-column">
                    <svg class="ps-2 pe-2" xmlns="http://www.w3.org/2000/svg" width="70" height="40"
                      viewBox="0 0 70 40">
                      <line x1="0" y1="20" x2="60" y2="20" stroke="rgba(0, 0, 0, 0.2)" stroke-width="2" />
                      <polygon points="60,15 70,20 60,25" fill="rgba(0, 0, 0, 0.2)" />
                    </svg>
                    <p class="text-center"><b id="lvl-status2">Lvl </b>${pokemon_main[id].evolution_chain[2].level_up}</p>
                  </div>
                  <div class="evolution-right d-flex justify-content-center flex-column ">
                    <img
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon_main[id].evolution_chain[2].index + 1}.svg"
                      alt="">
                    <p class="text-center"><b>${name_stufe3}</b></p>
                  </div>
                </div>
                `;
}


function createEvolutionTemplate2(id) {
    for (let k = 0; k < pokemon_main[id].evolution_chain.length; k++) {
        const element = pokemon_main[id].evolution_chain[k];
        var index = element.index;
        for (let m = 0; m < pokemon_main[index].designation.length; m++) {
            const element = pokemon_main[index].designation[m];
       
            if (element.language == language) {
                let name = element.text;
                if (k == 0) {
                    var name_stufe1 = name;
                }
                if (k == 1) {
                    var name_stufe2 = name;
                }
            }
        }
    }
    document.getElementById('evolution').innerHTML = `
    <h5 id="header-bas-stats" class="text-center mb-4" >Evolution Chain</h5>
                <div class="d-flex justify-content-between justify-content-center">
                  <div class="evolution-left d-flex justify-content-center flex-column">
                    <img
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon_main[id].evolution_chain[0].index + 1}.svg"
                      alt="">
                    <p class="text-center"><b>${name_stufe1}</b></p>
                  </div>
                  <div class="evolution-center d-flex justify-content-center align-items-center flex-column">
                    <svg class="ps-2 pe-2" xmlns="http://www.w3.org/2000/svg" width="70" height="40"
                      viewBox="0 0 70 40">
                      <line x1="0" y1="20" x2="60" y2="20" stroke="rgba(0, 0, 0, 0.2)" stroke-width="2" />
                      <polygon points="60,15 70,20 60,25" fill="rgba(0, 0, 0, 0.2)" />
                    </svg>
                    <p class="text-center"><b id="lvl-status1">Lvl </b>${pokemon_main[id].evolution_chain[1].level_up}</p>
                  </div>
                  <div class="evolution-right d-flex justify-content-center flex-column ">
                    <img
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon_main[id].evolution_chain[1].index + 1}.svg"
                      alt="">
                    <p class="text-center"><b>${name_stufe2}</b></p>
                  </div>
                </div>
                `;
}