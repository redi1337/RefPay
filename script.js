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
    const input = document.createElement('input');
    input.type = 'number';
    input.placeholder = `Kilometer für ${personenBezeichnungen[i]}`;
    input.id = `person-${i}`;
    input.value = 0; // Standardwert auf 0 setzen
    kilometerFelder.appendChild(input);
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
  inputs.forEach(input => (input.value = 0));
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

  // Personen mit den meisten Kilometern ermitteln
  const topFahrer = kilometerWerte
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
    betrag: (fahrer.kilometer / gesamteGefahreneKilometer) * gesamtkosten,
  }));

  // Ergebnisse anzeigen
  document.getElementById('startseite').style.display = 'none';
  document.getElementById('ergebnisseite').style.display = 'block';

  // Tabelle erstellen
  const tabelle = `
    <table>
      <tr>
        <th>Person</th>
        <th>Kilometer</th>
        <th>Erhaltener Betrag</th>
      </tr>
      ${betraege
        .map(
          (fahrer) => `
        <tr>
          <td>${personenBezeichnungen[fahrer.person]}</td>
          <td>${fahrer.kilometer} km</td>
          <td>${fahrer.betrag.toFixed(2)} €</td>
        </tr>
      `
        )
        .join('')}
    </table>
  `;
  document.getElementById('ergebnis-tabelle').innerHTML = tabelle;

  // Zusammenfassung anzeigen
  const summary = `
    <p>Gesamtsumme: ${gesamtkosten.toFixed(2)} €</p>
    <p>Berechnete Autos:</p>
    <ul>
      ${topFahrer
        .map(
          (fahrer) => `
        <li>${personenBezeichnungen[fahrer.person]}: ${fahrer.kilometer} km × 0,35 €/km = ${(
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
