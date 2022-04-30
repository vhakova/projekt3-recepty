let poleReceptu = document.getElementById('recepty');

window.addEventListener("load", poNacteni);

function poNacteni() {
    generovaniReceptu()
    alzheimerovaPojistka();
}


function vypisRecepty(i) {

    //Generování struktury náhledového boxíku
    const boxReceptu = document.createElement('div');
    const boxObrazkuReceptu = document.createElement('div');
    const obrazekReceptu = document.createElement('img');
    const receptInfo = document.createElement('div');
    const receptNadpis = document.createElement('h3');

    //Nastavení atributů
    boxReceptu.className = "recept";
    boxObrazkuReceptu.className = "recept-obrazek";
    receptInfo.className = "recept-info";
    boxReceptu.dataset.index = i;

    //Generování obrázku a nadpisu
    obrazekReceptu.src = recepty[i].img;
    obrazekReceptu.alt = recepty[i].nadpis;

    //Vypsání položek
    receptNadpis.innerHTML = recepty[i].nadpis;

    poleReceptu.appendChild(boxReceptu);
    boxReceptu.appendChild(boxObrazkuReceptu);
    boxReceptu.appendChild(receptInfo);
    boxObrazkuReceptu.appendChild(obrazekReceptu);
    receptInfo.appendChild(receptNadpis);

    boxReceptu.addEventListener('click', () => {
        vypisDetailReceptu(i);
        ulozPosledniRecept(i)
    })
}

//Vypsání receptu do seznamu
function generovaniReceptu() {
    for (i = 0; i < recepty.length; i++) {
        vypisRecepty(i);
    }
}

// Vyhledávání
let vyhledavani = document.getElementById('hledat');

vyhledavani.addEventListener("input", (e) => {
    let zadanyText = e.target.value.toLowerCase();
    poleReceptu.innerHTML = '';

    for (let i = 0; i < recepty.length; i++) {
        if (recepty[i].nadpis.toLowerCase().includes(zadanyText)) {
            vypisRecepty(i);
        }
    }
})

//Filtrování podle kategorie jídla
let filterKategorie = document.getElementById('kategorie');

filterKategorie.addEventListener("input", (e) => {
    let vybranaKategorie = e.target.value;
    poleReceptu.innerHTML = '';

    for (let i = 0; i < recepty.length; i++) {
        if (recepty[i].stitek.includes(vybranaKategorie)) {
            vypisRecepty(i);
        } else if (vybranaKategorie == "vse") {
            vypisRecepty(i);
        }
    }
})

//Filtrování podle hodnocení
let filtrPodleHodnoceni = document.getElementById('razeni');

filtrPodleHodnoceni.addEventListener('input', (e) => {
    let vybraneHodnoceni = e.target.value;
    poleReceptu.innerHTML = '';

    if (vybraneHodnoceni == 1) {
        recepty.sort(function (a, b) {
            return b.hodnoceni - a.hodnoceni;
        })
        generovaniReceptu();
    }
    if (vybraneHodnoceni == 2) {
        recepty.sort(function (a, b) {
            return a.hodnoceni - b.hodnoceni;
        })
        generovaniReceptu();
    }
    if (vybraneHodnoceni == 0) {
        generovaniReceptu();
    }
})

//Zobrazení detailu receptu
function vypisDetailReceptu(i) {
    document.querySelector('#recept-foto').src = recepty[i].img;
    document.querySelector('#recept-kategorie').innerHTML = recepty[i].kategorie;
    document.querySelector('#recept-hodnoceni').innerHTML = recepty[i].hodnoceni;
    document.querySelector('#recept-nazev').innerHTML = recepty[i].nadpis;
    document.querySelector('#recept-popis').innerHTML = recepty[i].popis;
};

//Local storage
function ulozPosledniRecept(i) {
    let vybranyRecept = recepty[i];
    localStorage.vybranyRecept = JSON.stringify(vybranyRecept);
};

function alzheimerovaPojistka(i) {
    let posledniRecept = localStorage.vybranyRecept;

    if (!(posledniRecept === null || posledniRecept === undefined)) {
        vybranyRecept = JSON.parse(posledniRecept);
    }
    
    recepty[i] = vybranyRecept;
    vypisDetailReceptu(i);
};