/*
Co je za úkol v tomto projektu:

1) Do prvku s id="recepty" vygeneruj z dat seznam všech receptů z naší "databáze".
HTML vzor, jak vygenerovaný recept vypadá, je zakomentovaný v index.html.

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
//Vytvoření šablony receptu

window.addEventListener("load", vypisRecept);

function vypisRecept() {
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

        obrazekReceptu.src = recepty[i].img;
        obrazekReceptu.alt = recepty[i].nadpis;

        receptNadpis.innerHTML = recepty[i].nadpis;

        poleReceptu.appendChild(boxReceptu);
        boxReceptu.appendChild(boxObrazkuReceptu);
        boxReceptu.appendChild(receptInfo);
        boxObrazkuReceptu.appendChild(obrazekReceptu);
        receptInfo.appendChild(receptNadpis);
    }

}