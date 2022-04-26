/*
Co je za úkol v tomto projektu:

2) Doplň hledání - v hlavičce odkomentuj pole pro hledání. Pri kliknutí na tlačítko Hledat
by se měl seznam receptů vyfiltrovat podle hledaného slova.

3) Doplň filtrovanání receptů podle kategorie.

4) Doplň řazení receptů podle hodnocení.

5) Na recepty v seznamu by mělo jít kliknout a na pravé polovině, se objeví detail receptu.
Doplň patričné údaje receptu do HTML prvků s ID recept-foto, recept-kategorie,
recept-hodnoceni, recept-nazev, recept-popis.

6) Poslední vybraný recept ulož do Local Storage, aby se při novém otevření aplikace načetl.
*/

//pole s recepty => recepty

i = 0;

window.addEventListener("load", poNacteni);

function poNacteni() {
    vypisRecepty();
}

//Vytvoření náhledového boxíku receptu
function vypisRecepty() {
    for (let i=0; i<recepty.length; i++) {
        const poleReceptu = document.querySelector('#recepty');

        const boxReceptu = document.createElement('div');
        const boxObrazkuReceptu = document.createElement('div');
        const obrazekReceptu = document.createElement('img');
        const receptInfo = document.createElement('div');
        const receptNadpis = document.createElement('h3');

        boxReceptu.className = "recept";
        boxObrazkuReceptu.className = "recept-obrazek";
        receptInfo.className = "recept-info";
        boxReceptu.dataset.index = i;

        obrazekReceptu.src = recepty[i].img;
        obrazekReceptu.alt = recepty[i].nadpis;

        receptNadpis.innerHTML = recepty[i].nadpis;

        poleReceptu.appendChild(boxReceptu);
        boxReceptu.appendChild(boxObrazkuReceptu);
        boxReceptu.appendChild(receptInfo);
        boxObrazkuReceptu.appendChild(obrazekReceptu);
        receptInfo.appendChild(receptNadpis);

        boxReceptu.addEventListener('click', vypisPopis);
    }

}

//Vytvoření detailního popisu ke zvolenému receptu

function vypisPopis(vybranyRecept) {
    let index = vybranyRecept.currentTarget.dataset.index;

    document.querySelector('#recept-foto').src = recepty[index].img;
    document.querySelector('#recept-kategorie').innerHTML = recepty[index].kategorie;
    document.querySelector('#recept-hodnoceni').innerHTML = recepty[index].hodnoceni;
    document.querySelector('#recept-nazev').innerHTML = recepty[index].nadpis;
    document.querySelector('#recept-popis').innerHTML = recepty[index].popis;
}

//Vyhledávání receptu

function zaznamHledanehoVyrazu() {
    let hledanyVyraz = document.querySelector('input[id=hledat]').value;
    return hledanyVyraz;
}

function hledejPodleNazvu() {
    let seznamReceptu = [];

    for (let i=0; i<recepty.length; i++) {
        seznamReceptu.push(recepty[i].nadpis);
    }

    document.getElementById("#recepty-info").innerHTML = seznamReceptu;
}

