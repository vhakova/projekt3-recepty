/*
Co je za úkol v tomto projektu:

2) Doplň hledání - v hlavičce odkomentuj pole pro hledání. Pri kliknutí na tlačítko Hledat
by se měl seznam receptů vyfiltrovat podle hledaného slova.

3) Doplň filtrovanání receptů podle kategorie.
*/

//pole s recepty => recepty

i = 0;
localStorage = [];
let vypisHodnoceni = [];
let vypisKategorii = [];
let vypisNazvu = [];

window.addEventListener("load", poNacteni);

function poNacteni() {
    alzheimerPojistka();
    vypisRecepty();
}

//Vytvoření náhledového boxíku receptu
function vypisRecepty() {
    for (let i=0; i<recepty.length; i++) {
        const poleReceptu = document.querySelector('#recepty');

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

        //Při kliknutí zavolej vypisPopis()
        boxReceptu.addEventListener('click', vypisPopis);
    }

}

//Vytvoření detailního popisu ke zvolenému receptu
function vypisPopis(vybranyRecept) {
    //Zaměření indexu kliknutého políčka podle data-index = i
    i = vybranyRecept.currentTarget.dataset.index;

    vytvorSablonuPrispevku();

    //Vymazání předchozího záznamu v localStorage
    localStorage.clear();
    //Zapsání posledního receptu do localStorage
    localStorage.setItem("index", i);
}

//Vytvoření šablony pro detailní příspěvek
function vytvorSablonuPrispevku() {
    document.querySelector('#recept-foto').src = recepty[i].img;
    document.querySelector('#recept-kategorie').innerHTML = recepty[i].kategorie;
    document.querySelector('#recept-hodnoceni').innerHTML = recepty[i].hodnoceni;
    document.querySelector('#recept-nazev').innerHTML = recepty[i].nadpis;
    document.querySelector('#recept-popis').innerHTML = recepty[i].popis;
}

//Vypsání posledního příspěvku z localStorage
function alzheimerPojistka() {
    index = localStorage.getItem("index");

    vytvorSablonuPrispevku();
}

function hledej() {
    const poleReceptu = document.querySelector('#recepty');
    let vstup = document.getElementById("hledat").value;
    let nalezeneRecepty = recepty.filter((value) => {
      return value.nadpis.toLowerCase().includes(vstup.toLowerCase());
    });
    console.log(nalezeneRecepty);
    poleReceptu.innerHTML = vypisRecepty(nalezeneRecepty);
}
  
//Řazení podle hodnocení
function serad() {
    document.getElementById("recepty").innerText = "";
    let soupis = document.getElementById("razeni");
    if (soupis.value === "2") {
      vypisRecepty(recepty.sort(odNejhorsich));
    } else if (soupis.value === "1") {
      vypisRecepty(recepty.sort(odNejlepsich));
    }
}
  
function odNejhorsich(a, b) {
    if (a.hodnoceni > b.hodnoceni) {
      return 1;
    } else {
      return -1;
    }
}

function odNejlepsich(a, b) {
    if (a.hodnoceni < b.hodnoceni) {
      return 1;
    } else {
      return -1;
    }
}


