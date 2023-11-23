/**
 * This function creates the individual cards
 *
 */

function createSmallCard() {
  let id_number = card_number - 1;
  if (pokemon_main[id_number].like == 1) {
    bg_color = bg_color + '-animation';
  }
  for (let i = 0; i < designation.length; i++) {
    const element = designation[i];
    if (element.language == language) {
      document.getElementById('content-small').innerHTML += `
        <div onclick="loadCard(${id_number},'about')" id="card-number-${id_number}" class="card border-2 shadow m-3 ${bg_color} " style="width: 250px; height: 170px; ">
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
            <span class=" mb-2 badge rounded-pill span shadow  ${bg_color}-typs">${element.text}</span>
            `;
      }
    }
  }
}

/**
 * This function translates the layout in the selected language
 *
 * @param {String} l Language choice of language
 */

function changeLanguages(l) {
  for (let h = 0; h < language_other_data.length; h++) {
    const element = language_other_data[h];
    if (element.language == l) {
      document.getElementById('search_input').placeholder = `${element.search}`;
      document.getElementById('search_input_bottom').placeholder = `${element.search}`;
      document.getElementById('load-card-more').innerHTML = `${element['10_cards']}`;
      document.getElementById('country').innerHTML = `
            <img  class="menu-flag justify-content-between align-items-center" src="./img/icon/${element.language}.png" alt="">${element.speak}`;
      document.getElementById('brand').innerHTML = `${element.brand}`;
      document.getElementById('flagg-list').innerHTML = `
            <li onclick="loadOtherLanguages('de')"><a
                class="menu dropdown-item d-flex justify-content-between align-items-center">${element.de}<img
                  src="./img/icon/de.png" alt=""></a></li>
            <li onclick="loadOtherLanguages('en')"><a
                class="menu dropdown-item d-flex justify-content-between align-items-center">${element.en}<img
                  src="./img/icon/en.png" alt=""></a></li>
            <li onclick="loadOtherLanguages('fr')"><a
                class="menu dropdown-item d-flex justify-content-between align-items-center">${element.fr}<img
                  src="./img/icon/fr.png" alt=""></a></li>
            <li onclick="loadOtherLanguages('es')"><a
                class="menu dropdown-item d-flex justify-content-between align-items-center">${element.es}<img
                  src="./img/icon/es.png" alt=""></a></li>
            <li onclick="loadOtherLanguages('it')"><a
                class="menu dropdown-item d-flex justify-content-between align-items-center">${element.it}<img
                  src="./img/icon/it.png" alt=""></a></li>
            <li onclick="loadOtherLanguages('ja')"><a
                class="menu dropdown-item d-flex justify-content-between align-items-center">${element.ja}<img
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
                <span class=" mb-2 badge rounded-pill span shadow ${bg_color}-typs">${element.text}</span>
                `;
        }
      }
    }
  }
}

/**
 *
 * This function creates connects the data of the base data with a prgress bar
 *
 * @param {String} name           Name of the bar
 * @param {String} base_stat      Value of status
 * @param {String} progress_color Background color of the respective type
 * @returns                       Return to the finished progress bar
 *
 */

function createStatsTabelSingel(name, base_stat, progress_color) {
  let name_small = name.replace("special-", "sp-");
  let template = `<div class="d-flex justify-content-between align-items-center">
    <div class="basic-data-left ">
            <p id="translate-${name}" class="mb-2">${name_small}</p>
        </div>
    <div class="basic-data-center ">
        <p class="mb-2">${base_stat}</p>
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

/**
 * This function creates the values ​​of the respective bar
 *
 * @param {Number} total                  Value of each bar
 * @param {String} progress_color_total   Color of the bar divided into 3 levels
 * @param {Number} total_percent          Total cash
 * @returns                               Return to the finished progress bar
 */

function createStatsTabelEnd(total, progress_color_total, total_percent) {
  let template = `<div class="d-flex justify-content-between align-items-center">
    <div class="basic-data-left ">
            <p id="translate-total" class="mb-2">Total</p>
        </div>
    <div class="basic-data-center ">
        <p class="mb-2">${total}</p>
    </div>
    <div class="basic-data-right ">
        <div class="progress mb-2" style="height: 0.5rem;" role="progressbar" aria-label="Success example"
            aria-valuenow="25" aria-valuemin="0" aria-valuemax="600">
        <div class="progress-bar  ${progress_color_total}" style="width: ${total_percent}%"></div>
        </div>
    </div>
</div>
`;
  return template
}

/**
 * This function generates the layout for 3 Pokomons
 *
 * @param {Number} id id of the respective card
 */

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
    <h5 id="header_bas_stats" class="text-center mb-4" >Evolutiondsa Chain</h5>
                <div class="d-flex justify-content-between justify-content-center">
                  <div class="evolution-left d-flex justify-content-center flex-column">
                    <img onclick="loadCard(${pokemon_main[id].evolution_chain[0].index},'${opinion}')"
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon_main[id].evolution_chain[0].index + 1}.svg"
                      alt="">
                    <p class="text-center">${name_stufe1}</p>
                  </div>
                  <div class="evolution-center d-flex justify-content-center align-items-center flex-column">
                  <p class=" m-0">${pokemon_main[id].evolution_chain[1].level_up}</p>
                    <svg class="ps-2 pe-2" xmlns="http://www.w3.org/2000/svg" width="70" height="40"
                      viewBox="0 0 70 40">
                      <line x1="0" y1="20" x2="60" y2="20" stroke="rgba(0, 0, 0, 0.2)" stroke-width="2" />
                      <polygon points="60,15 70,20 60,25" fill="rgba(0, 0, 0, 0.2)" />
                    </svg>
                    <p class="text-center" id="lvl-status1">>Lvl</p>
                  </div>
                  <div class="evolution-right d-flex justify-content-center flex-column ">
                    <img  onclick="loadCard(${pokemon_main[id].evolution_chain[1].index},'${opinion}')"
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon_main[id].evolution_chain[1].index + 1}.svg"
                      alt="">
                    <p class="text-center">${name_stufe2}</p>
                  </div>
                </div>
                <div span class="border-bottom mb-3"></div>
                <div class="d-flex justify-content-between justify-content-center">
                  <div class="evolution-left d-flex justify-content-center flex-column">
                    <img onclick="loadCard(${pokemon_main[id].evolution_chain[1].index},'${opinion}')"
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon_main[id].evolution_chain[1].index + 1}.svg"
                      alt="">
                    <p class="text-center">${name_stufe2}</p>
                  </div>
                  <div class="evolution-center d-flex justify-content-center align-items-center flex-column">
                  <p class=" m-0">${pokemon_main[id].evolution_chain[2].level_up}</p>
                  <svg class="ps-2 pe-2" xmlns="http://www.w3.org/2000/svg" width="70" height="40"
                      viewBox="0 0 70 40">
                      <line x1="0" y1="20" x2="60" y2="20" stroke="rgba(0, 0, 0, 0.2)" stroke-width="2" />
                      <polygon points="60,15 70,20 60,25" fill="rgba(0, 0, 0, 0.2)" />
                    </svg>
                    <p class="text-center" id="lvl-status2">Lvl</p>
                  </div>
                  <div class="evolution-right d-flex justify-content-center flex-column ">
                    <img onclick="loadCard(${pokemon_main[id].evolution_chain[2].index},'${opinion}')"
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon_main[id].evolution_chain[2].index + 1}.svg"
                      alt="">
                    <p class="text-center">${name_stufe3}</p>
                  </div>
                </div>
                `;
}

/**
 * This function generates the layout for 2 Pokomons
 *
 * @param {Number} id id of the respective card
 */

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
    <h5 id="header_bas_stats" class="text-center mb-4" >Evolution Chain</h5>
                <div class="d-flex justify-content-between justify-content-center">
                  <div class="evolution-left d-flex justify-content-center flex-column">
                    <img onclick="loadCard(${pokemon_main[id].evolution_chain[0].index},'${opinion}')"
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon_main[id].evolution_chain[0].index + 1}.svg"
                      alt="">
                    <p class="text-center">${name_stufe1}</p>
                  </div>
                  <div class="evolution-center d-flex justify-content-center align-items-center flex-column">
                  <p class=" m-0">${pokemon_main[id].evolution_chain[1].level_up}</p>
                  <svg class="ps-2 pe-2" xmlns="http://www.w3.org/2000/svg" width="70" height="40"
                      viewBox="0 0 70 40">
                      <line x1="0" y1="20" x2="60" y2="20" stroke="rgba(0, 0, 0, 0.2)" stroke-width="2" />
                      <polygon points="60,15 70,20 60,25" fill="rgba(0, 0, 0, 0.2)" />
                    </svg>
                    <p class="text-center" id="lvl-status1">Lvl</p>
                  </div>
                  <div class="evolution-right d-flex justify-content-center flex-column ">
                    <img onclick="loadCard(${pokemon_main[id].evolution_chain[1].index},'${opinion}')"
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon_main[id].evolution_chain[1].index + 1}.svg"
                      alt="">
                    <p class="text-center">${name_stufe2}</p>
                  </div>
                </div>
                `;
}

/**
 * This function generates an abort scenario if all 3 have not been loaded
 *
 * @param {Number} id id of the respective card
 */

function createEvolutionTemplate3NotFound(id) {
  var name_stufe1 = '-';
  var name_stufe2 = '-';
  var name_stufe3 = '-';
  for (let k = 0; k < pokemon_main[id].evolution_chain.length; k++) {
    const element = pokemon_main[id].evolution_chain[k];
    var index = element.index;
    if (pokemon_main[index] != undefined) {
      for (let m = 0; m < pokemon_main[index].designation.length; m++) {
        const element = pokemon_main[index].designation[m];
        if (element.language == language) {
          let name = element.text;
          if (k == 0) {
            name_stufe1 = name;
          }
          if (k == 1) {
            name_stufe2 = name;
          }
          if (k == 2) {
            name_stufe3 = name;
          }
        }
      }
    } else {
      var not_found_index = '#' + (index + 1);
    }
  }
  document.getElementById('evolution').innerHTML = `
    <h5 id="header_bas_stats" class="text-center mb-4" >Evolutiondsa123 Chain</h5>
                <div class="d-flex justify-content-between justify-content-center">
                  <div class="evolution-left d-flex justify-content-center flex-column" style="cursor: no-drop;">
                    <img
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon_main[id].evolution_chain[0].index + 1}.svg"
                      alt="">
                    <p class="text-center">${name_stufe1}</p>
                  </div>
                  <div class="evolution-center d-flex justify-content-center align-items-center flex-column">
                  <p class=" m-0"><b>-</b></p>
                    <svg class="ps-2 pe-2" xmlns="http://www.w3.org/2000/svg" width="70" height="40"
                      viewBox="0 0 70 40">
                      <line x1="0" y1="20" x2="60" y2="20" stroke="rgba(0, 0, 0, 0.2)" stroke-width="2" />
                      <polygon points="60,15 70,20 60,25" fill="rgba(0, 0, 0, 0.2)" />
                    </svg>
                    <p class="text-center" id="lvl-status1">Lvl</p>
                  </div>
                  <div class="evolution-right d-flex justify-content-center flex-column " style="cursor: no-drop;">
                    <img onklick="loadCard(${pokemon_main[id].card_number - 1})"
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon_main[id].evolution_chain[1].index + 1}.svg"
                      alt="">
                    <p class="text-center">${name_stufe2}</p>
                  </div>
                </div>
                <div span class="border-bottom mb-3"></div>
                <div class="d-flex justify-content-between justify-content-center">
                  <div class="evolution-left d-flex justify-content-center flex-column" style="cursor: no-drop;">
                    <img
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon_main[id].evolution_chain[1].index + 1}.svg"
                      alt="">
                    <p class="text-center">${name_stufe2}</p>
                  </div>
                  <div class="evolution-center d-flex justify-content-center align-items-center flex-column">
                  <p class=" m-0"><b>-</b></p>
                  <svg class="ps-2 pe-2" xmlns="http://www.w3.org/2000/svg" width="70" height="40"
                      viewBox="0 0 70 40">
                      <line x1="0" y1="20" x2="60" y2="20" stroke="rgba(0, 0, 0, 0.2)" stroke-width="2" />
                      <polygon points="60,15 70,20 60,25" fill="rgba(0, 0, 0, 0.2)" />
                    </svg>
                    <p class="text-center" id="lvl-status2">Lvl</p>
                  </div>
                  <div class="evolution-right d-flex justify-content-center flex-column " style="cursor: no-drop;">
                    <img
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon_main[id].evolution_chain[2].index + 1}.svg"
                      alt="">
                    <p class="text-center">${name_stufe3}</p>
                  </div>
                </div>
                <div>
                <p id="header-bas-stats_not_found" class="text-center" >The following cards still need to be loaded</p>
                <h4 class="text-center mt-0">---> ${not_found_index} <---</h4
                </div>
                `;
}

/**
 * This function generates an abort scenario if all 2 have not been loaded
 *
 * @param {Number} id id of the respective card
 */

function createEvolutionTemplate2NotFound(id) {
  for (let k = 0; k < pokemon_main[id].evolution_chain.length; k++) {
    const element = pokemon_main[id].evolution_chain[k];
    var index = element.index;
    if (pokemon_main[index] != undefined) {
      var name_stufe1 = '-';
      var name_stufe2 = '-';
      for (let m = 0; m < pokemon_main[index].designation.length; m++) {
        const element = pokemon_main[index].designation[m];
        if (element.language == language) {
          let name = element.text;
          if (k == 0) {
            name_stufe1 = name;
          }
          if (k == 1) {
            name_stufe2 = name;
          }
        }
      }
    }
    var not_found_index = index + 1;
  }
  document.getElementById('evolution').innerHTML = `
    <h5 id="header_bas_stats" class="text-center mb-4" >Evolution Chain</h5>
                <div class="d-flex justify-content-between justify-content-center">
                  <div class="evolution-left d-flex justify-content-center flex-column" style="cursor: no-drop;">
                    <img
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon_main[id].evolution_chain[0].index + 1}.svg"
                      alt="">
                    <p class="text-center">${name_stufe1}</p>
                  </div>
                  <div class="evolution-center d-flex justify-content-center align-items-center flex-column">
                  <p class=" m-0"><b>-</b></p>
                  <svg class="ps-2 pe-2" xmlns="http://www.w3.org/2000/svg" width="70" height="40"
                      viewBox="0 0 70 40">
                      <line x1="0" y1="20" x2="60" y2="20" stroke="rgba(0, 0, 0, 0.2)" stroke-width="2" />
                      <polygon points="60,15 70,20 60,25" fill="rgba(0, 0, 0, 0.2)" />
                    </svg>
                    <p class="text-center" id="lvl-status1">Lvl </p>
                  </div>
                  <div class="evolution-right d-flex justify-content-center flex-column " style="cursor: no-drop;">
                    <img
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon_main[id].evolution_chain[1].index + 1}.svg"
                      alt="">
                    <p class="text-center">${name_stufe2}</p>
                    </div></div>
                  <p id="header-bas-stats_not_found" class="text-center" >The following cards still need to be loaded</p>
                  <h4 class="text-center mt-0">---> ${not_found_index} <---</h4
                </div></div>
                `;
}

/**
 *
This function generates the left arrow for each card
 *
 * @returns arrow
 */

function createSmallBottomLeft() {
  let a = `  <svg class="card-hover" style="height: 30px; width: 30px;" xmlns="http://www.w3.org/2000/svg" width="100" height="100"
    viewBox="0 0 24 24">
    <g transform="scale(-1, 1) translate(-24, 0)">
      <path fill="black" d="M14 12l-6-6 1.41-1.41L16.83 12l-7.42 7.42L8 18z" />
    </g>
  </svg>`;
  return a;
}

/**
 *
This function generates the right arrow for each card
 *
 * @returns arrow
 */

function createSmallBottomRight() {
  let a = `  <svg class="card-hover" style="height: 30px; width: 30px;" xmlns="http://www.w3.org/2000/svg" width="100"
    height="100" viewBox="0 0 24 24">
    <path fill="black" d="M14 12l-6-6 1.41-1.41L16.83 12l-7.42 7.42L8 18z" />
  </svg>`;
  return a;
}



function templateImpressum() {

  return `<div class='impressum'><h1>Impressum</h1><p>Angaben gemäß § 5 TMG</p><p>Tony Tech <br>
Eschenweg 6<br>
78604 Rietheim-Weilheim <br>
</p><p> <strong>Vertreten durch: </strong><br>
Tony Tech<br>
</p><p><strong>Kontakt:</strong> <br>
E-Mail: <a href='mailto:tony@tech-mail.eu'>tony@tech-mail.eu</a></br></p><p><strong>Haftungsausschluss: </strong><br><br><strong>Haftung für Inhalte</strong><br><br>
Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.<br><br><strong>Haftung für Links</strong><br><br>
Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.<br><br><strong>Urheberrecht</strong><br><br>
Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.<br><br><strong>Datenschutz</strong><br><br>
Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben. <br>
Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich. <br>
Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.<br>
<br><br><strong>Google Analytics</strong><br><br>
Diese Website benutzt Google Analytics, einen Webanalysedienst der Google Inc. (''Google''). Google Analytics verwendet sog. ''Cookies'', Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website durch Sie ermöglicht. Die durch den Cookie erzeugten Informationen über Ihre Benutzung dieser Website (einschließlich Ihrer IP-Adresse) wird an einen Server von Google in den USA übertragen und dort gespeichert. Google wird diese Informationen benutzen, um Ihre Nutzung der Website auszuwerten, um Reports über die Websiteaktivitäten für die Websitebetreiber zusammenzustellen und um weitere mit der Websitenutzung und der Internetnutzung verbundene Dienstleistungen zu erbringen. Auch wird Google diese Informationen gegebenenfalls an Dritte übertragen, sofern dies gesetzlich vorgeschrieben oder soweit Dritte diese Daten im Auftrag von Google verarbeiten. Google wird in keinem Fall Ihre IP-Adresse mit anderen Daten der Google in Verbindung bringen. Sie können die Installation der Cookies durch eine entsprechende Einstellung Ihrer Browser Software verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website voll umfänglich nutzen können. Durch die Nutzung dieser Website erklären Sie sich mit der Bearbeitung der über Sie erhobenen Daten durch Google in der zuvor beschriebenen Art und Weise und zu dem zuvor benannten Zweck einverstanden.<br><br><strong>Google AdSense</strong><br><br>
Diese Website benutzt Google Adsense, einen Webanzeigendienst der Google Inc., USA (''Google''). Google Adsense verwendet sog. ''Cookies'' (Textdateien), die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website durch Sie ermöglicht. Google Adsense verwendet auch sog. ''Web Beacons'' (kleine unsichtbare Grafiken) zur Sammlung von Informationen. Durch die Verwendung des Web Beacons können einfache Aktionen wie der Besucherverkehr auf der Webseite aufgezeichnet und gesammelt werden. Die durch den Cookie und/oder Web Beacon erzeugten Informationen über Ihre Benutzung dieser Website (einschließlich Ihrer IP-Adresse) werden an einen Server von Google in den USA übertragen und dort gespeichert. Google wird diese Informationen benutzen, um Ihre Nutzung der Website im Hinblick auf die Anzeigen auszuwerten, um Reports über die Websiteaktivitäten und Anzeigen für die Websitebetreiber zusammenzustellen und um weitere mit der Websitenutzung und der Internetnutzung verbundene Dienstleistungen zu erbringen. Auch wird Google diese Informationen gegebenenfalls an Dritte übertragen, sofern dies gesetzlich vorgeschrieben oder soweit Dritte diese Daten im Auftrag von Google verarbeiten. Google wird in keinem Fall Ihre IP-Adresse mit anderen Daten der Google in Verbindung bringen. Das Speichern von Cookies auf Ihrer Festplatte und die Anzeige von Web Beacons können Sie verhindern, indem Sie in Ihren Browser-Einstellungen ''keine Cookies akzeptieren'' wählen (Im MS Internet-Explorer unter ''Extras > Internetoptionen > Datenschutz > Einstellung''; im Firefox unter ''Extras > Einstellungen > Datenschutz > Cookies''); wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website voll umfänglich nutzen können. Durch die Nutzung dieser Website erklären Sie sich mit der Bearbeitung der über Sie erhobenen Daten durch Google in der zuvor beschriebenen Art und Weise und zu dem zuvor benannten Zweck einverstanden.</p><br>
Website Impressum erstellt durch <a href="https://www.impressum-generator.de">impressum-generator.de</a> von der <a href="https://www.kanzlei-hasselbach.de/" rel="nofollow">Kanzlei Hasselbach</a>
 </div>`;
}