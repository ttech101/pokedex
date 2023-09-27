function createSmallCard() {
    for (let i = 0; i < designation.length; i++) {
        const element = designation[i];
        if (element.language == language) {
            document.getElementById('content-small').innerHTML += `
        <div onclick="loadCard(${card_number})" id="card-number-${card_number}" class="card border-2 shadow m-3 ${bg_color} " style="width: 250px; height: 170px; ">
            <div class=" g-0 d-flex p-0 justify-content-between pokeball-img">
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
        `;
        }
    }
    for (let i = 0; i < typs.length; i++) {
        const element = typs[i];
        let typ = element;

        for (let l = 0; l < typ.length; l++) {
            const element = typ[l];
            if (element.language == language) {
                document.getElementById(`typs-small-${card_number}`).innerHTML += `
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
        let card_number = i + 1;
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