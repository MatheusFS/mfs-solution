
$ = document.querySelectorAll.bind(document);
var possibility = 0, currentIndex, currentDiv;

window.addEventListener('load', e => {
    $('body')[0].innerHTML = `
        <h1 class="logo"><i class="material-icons">public</i>Piru grosso</h1>
        ${structure.map((possibilities, index) => 
            possibilities.map((select, n) => select.type == "single" ? 
                `<div id="${index ? (n ? 'existing_': 'new_') : 'start_'}${index}" class="overlay z-depth-5">
                    <h2 class="overlay-title">${select.title}</h2>
                    <div class="selector ${isNextImport(index-1) ? 'import' : ''}">
                    ${select.options.map((option, i) => 
                        `<div class="card blue-grey hoverable" 
                              onclick="show(${index+1}, ${i});${isNextImport(index) ? `render(${structure[index+1][n].options},${i})` : ''}">
                            <div class="card-content white-text">
                                <span class="card-title">
                                    <i class="material-icons">${option.icon}</i>
                                    ${option.title}
                                </span>
                                <p>${option.subtitle}</p>
                            </div>
                        </div>`
                    ).join('')}
                    </div> 
                </div>`
                :
                `<div id="${index ? (n ? 'existing_': 'new_') : 'start_'}${index}" class="overlay z-depth-5">
                    <h2 class="overlay-title">
                        ${select.title}
                        <span class="text-helper">(múltipla escolha)</span>
                    </h2>
                    <div class="selector ${isNextImport(index-1) ? 'import' : ''}">
                        ${Array.isArray(select.options) 
                            ? select.options.map(option => 
                            `<div class="card blue-grey lighten-2 hoverable" onclick="select(this)">
                                <div class="card-content white-text">
                                    <span class="card-title">
                                        <i class="material-icons">${option.icon}</i>
                                        ${option.title}
                                    </span>
                                    <p>${option.subtitle}</p>
                                </div>
                            </div>`).join('')
                            : ``
                        }
                        <a class="waves-effect waves-light btn next" onclick="show(${index+1});${isNextImport(index) ? `render(${structure[index+1][n].options})`: ''}">
                            <i class="material-icons right">navigate_next</i>
                            Continuar
                        </a>
                    </div>
                </div>`
            ).join('')
        ).join('')}
        <div class="dotsNav">
            ${structure.map((possibilities, index) => `
                <div id="dot${index}" class="dot" onclick="show(${index}, possibility)"></div>
            `).join('')}
        </div>
    `;

    show(0);
});

function show(level_index, selected = null){
    if(level_index == 1) possibility = selected;
    $(".overlay").forEach(node_div => 
        node_div.id != `${level_index ? (possibility ? 'existing_': 'new_') : 'start_'}${level_index}` 
        ? node_div.classList.add("fadeOut") 
        : node_div.classList.remove("fadeOut")
    );
    $(".dot").forEach(node_div => 
        node_div.id != `dot${level_index}` 
        ? node_div.classList.remove("active") 
        : node_div.classList.add("active")
    );
    currentIndex = level_index;
    currentDiv = $("div.overlay:not(.fadeOut)")[0];
}

function select(el_option){
    el_option.classList.toggle("lighten-2");
    el_option.classList.toggle("selected");
    let classes = Array.from(el_option.classList);
    classes.includes("selected") ? null: null;
}

function render(type, selected = 0){
    let trans = [];
    for(option in type){
        trans.push(option);
    }
    let html = `
        ${type[trans[selected]].map(option => `
            <div class="card blue-grey lighten-2 hoverable" onclick="select(this)">
                <div class="card-content white-text">
                    <span class="card-title">
                        <i class="material-icons">layers</i>
                        ${option}
                    </span>
                </div>
            </div>
        `).join('')}
        <a class="waves-effect waves-light btn next" onclick="show(${currentIndex+1});${isNextImport(currentIndex) ? `render(${structure[currentIndex+1][n].options})`: ''}">
            <i class="material-icons right">navigate_next</i>
            Continuar
        </a>
    `;
    $(`span.import-selected`)[0].innerText = trans[selected];
    $("div.import")[possibility].innerHTML = html;
}

function isNextImport(index){
    return structure[index+1] 
    ? Array.isArray(structure[index+1][possibility].options) 
        ? false 
        : true 
    : false;
}