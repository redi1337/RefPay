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
    kilometerFelder.appendChild(input);
  }
}

// Beim Laden der Seite Felder für die Standardanzahl (5 Personen) erstellen
window.addEventListener('load', function () {
  const standardAnzahl = 5; // Standardmäßig 5 Personen
  createKilometerFields(standardAnzahl);
});

// Beim Ändern der Personenanzahl Felder aktualisieren
document.getElementById('personen').addEventListener('change', function () {
  const anzahlPersonen = parseInt(this.value);
  createKilometerFields(anzahlPersonen);
});

// Berechnung der Fahrtkosten und Anzeige der Ergebnisse in einer neuen Seite
document.getElementById('berechnen').addEventListener('click', function () {
  const anzahlPersonen = parseInt(document.getElementById('personen').value);
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

  // Anzahl der Fahrer ermitteln
  const fahrer = kilometerWerte.filter(fahrer => fahrer.kilometer > 0).length;

  // Kosten pro Person berechnen (aufgerundet)
  const kostenProPerson = Math.round(gesamtkosten / fahrer);

  // Restbetrag berechnen
  const restbetrag = gesamtkosten - (kostenProPerson * fahrer);

  // Ergebnisse in eine neue Seite übertragen
  const resultsPage = window.open('', '_blank');
  resultsPage.document.write(`
    <html>
      <head>
        <title>Fahrtgeld-Ergebnisse</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
          .summary {
            margin-top: 20px;
            font-size: 18px;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <h1>Fahrtgeld-Ergebnisse</h1>
        <table>
          <tr>
            <th>Person</th>
            <th>Kilometer</th>
            <th>Erhaltener Betrag</th>
          </tr>
          ${kilometerWerte
            .map(
              (fahrer) => `
            <tr>
              <td>${personenBezeichnungen[fahrer.person]}</td>
              <td>${fahrer.kilometer} km</td>
              <td>${fahrer.kilometer > 0 ? kostenProPerson + ' €' : '0 €'}</td>
            </tr>
          `
            )
            .join('')}
        </table>
        <div class="summary">
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
          <p>Restbetrag: ${restbetrag.toFixed(2)} € (wird ${personenBezeichnungen[1]} gutgeschrieben)</p>
        </div>
      </body>
    </html>
  `);
  resultsPage.document.close();
});