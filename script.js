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

// Kilometer-Eingabefelder erstellen
function createKilometerFields(anzahlPersonen) {
  const kilometerFelder = document.getElementById('kilometer-felder');
  kilometerFelder.innerHTML = '';

  for (let i = 1; i <= anzahlPersonen; i++) {
    const container = document.createElement('div');
    const label = document.createElement('label');
    label.textContent = `${personenBezeichnungen[i]}:`;
    const input = document.createElement('input');
    input.type = 'number';
    input.placeholder = 'Kilometer';
    input.id = `person-${i}`;
    input.value = '';

    container.appendChild(label);
    container.appendChild(input);
    kilometerFelder.appendChild(container);
  }
}

// Initiale Felder erstellen
window.addEventListener('load', function() {
  createKilometerFields(5);
});

// Crew-Größe ändern
document.getElementById('crew').addEventListener('change', function() {
  createKilometerFields(parseInt(this.value));
});

// Reset-Button
document.getElementById('reset').addEventListener('click', function() {
  const inputs = document.querySelectorAll('#kilometer-felder input');
  inputs.forEach(input => (input.value = ''));
});

// Berechnung der Ergebnisse
document.getElementById('berechnen').addEventListener('click', function() {
  const anzahlPersonen = parseInt(document.getElementById('crew').value);
  const kilometerWerte = [];

  for (let i = 1; i <= anzahlPersonen; i++) {
    const kilometer = parseFloat(document.getElementById(`person-${i}`).value) || 0;
    kilometerWerte.push({ person: i, kilometer });
  }

  const anzahlAutos = anzahlPersonen === 5 ? 2 : 3;
  const topFahrer = [...kilometerWerte].sort((a, b) => b.kilometer - a.kilometer).slice(0, anzahlAutos);
  const gesamtKilometer = topFahrer.reduce((sum, fahrer) => sum + fahrer.kilometer, 0);
  const gesamtkosten = gesamtKilometer * 0.35;
  const gesamteGefahreneKilometer = kilometerWerte.reduce((sum, fahrer) => sum + fahrer.kilometer, 0);

  const betraege = kilometerWerte.map(fahrer => ({
    person: fahrer.person,
    kilometer: fahrer.kilometer,
    betrag: Math.floor((fahrer.kilometer / gesamteGefahreneKilometer) * gesamtkosten)
  }));

  const summeAbgerundet = betraege.reduce((sum, fahrer) => sum + fahrer.betrag, 0);
  const restbetrag = gesamtkosten - summeAbgerundet;
  const restProPerson = Math.floor(restbetrag / anzahlAutos);

  topFahrer.forEach(fahrer => {
    betraege[fahrer.person - 1].betrag += restProPerson;
  });

  const verbleibenderRest = gesamtkosten - betraege.reduce((sum, fahrer) => sum + fahrer.betrag, 0);
  if (verbleibenderRest > 0) {
    betraege[topFahrer[0].person - 1].betrag += verbleibenderRest;
  }

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
      ${kilometerWerte.map(fahrer => `
        <tr>
          <td>${personenBezeichnungen[fahrer.person]}</td>
          <td>${fahrer.kilometer} km</td>
          <td>${betraege.find(b => b.person === fahrer.person).betrag.toFixed(2)} €</td>
        </tr>
      `).join('')}
    </table>
  `;
  document.getElementById('ergebnis-tabelle').innerHTML = tabelle;

  // Zusammenfassung anzeigen
  const summary = `
    <p>Gesamtsumme: ${gesamtkosten.toFixed(2)} €</p>
    <p class="berechnete-autos-ueberschrift">Berechnete Autos:</p>
    <ul>
      ${topFahrer.map((fahrer, index) => `
        <li>Auto ${index + 1}: ${fahrer.kilometer} km × 0,35 €/km = ${(fahrer.kilometer * 0.35).toFixed(2)} €</li>
      `).join('')}
    </ul>
  `;
  document.getElementById('ergebnis-summary').innerHTML = summary;
});

// Zurück-Button
document.getElementById('zurueck').addEventListener('click', function() {
  document.getElementById('ergebnisseite').style.display = 'none';
  document.getElementById('startseite').style.display = 'block';
});

// Impressum-Links
document.getElementById('impressum-link').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('startseite').style.display = 'none';
  document.getElementById('ergebnisseite').style.display = 'none';
  document.getElementById('impressum-page').style.display = 'block';
});

document.getElementById('impressum-link-ergebnis').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('startseite').style.display = 'none';
  document.getElementById('ergebnisseite').style.display = 'none';
  document.getElementById('impressum-page').style.display = 'block';
});

// Zurück-Button Impressum
document.getElementById('zurueck-impressum').addEventListener('click', function() {
  document.getElementById('impressum-page').style.display = 'none';
  document.getElementById('startseite').style.display = 'block';
});
