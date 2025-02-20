// Bezeichnungen für die Personen
const personenBezeichnungen = {
  1: "Referee",
  2: "Umpire",
  3: "Linesman",
  4: "Linejudge",
  5: "Backjudge",
  6: "Sidejudge",
  7: "Fieldjudge",
  8: "Centerjudge",
};

// Funktion zum Erstellen der Kilometer-Eingabefelder
function createKilometerFields(anzahlPersonen) {
  const kilometerFelder = document.getElementById('kilometer-felder');
  kilometerFelder.innerHTML = ''; // Vorhandene Felder löschen

  for (let i = 1; i <= anzahlPersonen; i++) {
    const container = document.createElement('div');
    const label = document.createElement('label');
    label.textContent = `${personenBezeichnungen[i]}:`;
    const input = document.createElement('input');
    input.type = 'number';
    input.placeholder = `Kilometer`;
    input.id = `person-${i}`;
    input.value = ''; // Keine Vorausfüllung mit 0

    container.appendChild(label);
    container.appendChild(input);
    kilometerFelder.appendChild(container);
  }
}

// Beim Laden der Seite Felder für die Standardanzahl (5 Personen) erstellen
window.addEventListener('load', function () {
  const standardAnzahl = 5; // Standardmäßig 5 Personen
  createKilometerFields(standardAnzahl);
});

// Beim Ändern der Crew-Größe Felder aktualisieren
document.getElementById('crew').addEventListener('change', function () {
  const anzahlPersonen = parseInt(this.value);
  createKilometerFields(anzahlPersonen);
});

// Reset-Button: Kilometer-Eingaben auf 0 setzen
document.getElementById('reset').addEventListener('click', function () {
  const inputs = document.querySelectorAll('#kilometer-felder input');
  inputs.forEach(input => (input.value = ''));
});

// Berechnung der Fahrtkosten und Anzeige der Ergebnisse
document.getElementById('berechnen').addEventListener('click', function () {
  const anzahlPersonen = parseInt(document.getElementById('crew').value);
  const kilometerWerte = [];

  // Kilometerwerte sammeln
  for (let i = 1; i <= anzahlPersonen; i++) {
    const kilometer = parseFloat(document.getElementById(`person-${i}`).value) || 0;
    kilometerWerte.push({ person: i, kilometer });
  }

  // Anzahl der Autos ermitteln
  const anzahlAutos = anzahlPersonen === 5 ? 2 : 3;

  // Personen mit den meisten Kilometern ermitteln (kopiere die Liste, um die ursprüngliche Reihenfolge zu behalten)
  const topFahrer = [...kilometerWerte]
    .sort((a, b) => b.kilometer - a.kilometer)
    .slice(0, anzahlAutos);

  // Gesamtkilometer der Top-Fahrer berechnen
  const gesamtKilometer = topFahrer.reduce((sum, fahrer) => sum + fahrer.kilometer, 0);

  // Gesamtkosten berechnen
  const gesamtkosten = gesamtKilometer * 0.35;

  // Anteilige Berechnung basierend auf den gefahrenen Kilometern
  const gesamteGefahreneKilometer = kilometerWerte.reduce((sum, fahrer) => sum + fahrer.kilometer, 0);
  const betraege = kilometerWerte.map(fahrer => ({
    person: fahrer.person,
    kilometer: fahrer.kilometer,
    betrag: (fahrer.kilometer / gesamteGefahreneKilometer) * gesamtkosten,
  }));

  // Beträge auf den vollen Euro abrunden
  const abgerundeteBetraege = betraege.map(fahrer => ({
    ...fahrer,
    betrag: Math.floor(fahrer.betrag), // Abrunden
  }));

  // Restbetrag berechnen
  const summeAbgerundet = abgerundeteBetraege.reduce((sum, fahrer) => sum + fahrer.betrag, 0);
  const restbetrag = gesamtkosten - summeAbgerundet;

  // Restbetrag auf die Top-Fahrer aufteilen (in vollen Euro)
  const restProPerson = Math.floor(restbetrag / anzahlAutos);
  topFahrer.forEach((fahrer, index) => {
    abgerundeteBetraege[fahrer.person - 1].betrag += restProPerson;
  });

  // Verbleibenden Restbetrag dem Fahrer mit den meisten Kilometern gutschreiben
  const verbleibenderRest = gesamtkosten - abgerundeteBetraege.reduce((sum, fahrer) => sum + fahrer.betrag, 0);
  if (verbleibenderRest > 0) {
    abgerundeteBetraege[topFahrer[0].person - 1].betrag += verbleibenderRest;
  }

  // Ergebnisse anzeigen
  document.getElementById('startseite').style.display = 'none';
  document.getElementById('ergebnisseite').style.display = 'block';

  // Tabelle erstellen (behält die Reihenfolge der Startseite)
  const tabelle = `
    <table>
      <tr>
        <th>Person</th>
        <th>Kilometer</th>
        <th>Erhaltener Betrag</th>
      </tr>
      ${kilometerWerte
        .map(
          (fahrer) => {
            const betrag = abgerundeteBetraege.find(b => b.person === fahrer.person).betrag;
            return `
              <tr>
                <td>${personenBezeichnungen[fahrer.person]}</td>
                <td>${fahrer.kilometer} km</td>
                <td>${betrag.toFixed(2)} €</td>
              </tr>
            `;
          }
        )
        .join('')}
    </table>
  `;
  document.getElementById('ergebnis-tabelle').innerHTML = tabelle;

  // Zusammenfassung anzeigen (Top-Autos als "Auto 1", "Auto 2" usw.)
  const summary = `
    <p>Gesamtsumme: ${gesamtkosten.toFixed(2)} €</p>
    <p>Berechnete Autos:</p>
    <ul>
      ${topFahrer
        .map(
          (fahrer, index) => `
        <li>Auto ${index + 1}: ${fahrer.kilometer} km × 0,35 €/km = ${(
            fahrer.kilometer * 0.35
          ).toFixed(2)} €</li>
      `
        )
        .join('')}
    </ul>
  `;
  document.getElementById('ergebnis-summary').innerHTML = summary;
});

// Zurück-Button: Zur Startseite zurückkehren
document.getElementById('zurueck').addEventListener('click', function () {
  document.getElementById('startseite').style.display = 'block';
  document.getElementById('ergebnisseite').style.display = 'none';
});
