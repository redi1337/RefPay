/* Dark Mode */
body {
  font-family: Arial, sans-serif;
  background-color: #121212;
  color: #e0e0e0;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.container {
  background-color: #1e1e1e;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 90%;
  max-width: 500px;
  margin: 20px 0 60px; /* Mehr Abstand unten für Footer */
  flex-grow: 0;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

#ergebnisseite .logo-container {
  margin-bottom: 10px;
}

.logo {
  width: 100%;
  max-width: 250px;
  height: auto;
}

label {
  display: block;
  margin-bottom: 10px;
  color: #e0e0e0;
}

select, input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #444;
  border-radius: 4px;
  background-color: #333;
  color: #e0e0e0;
}

select:focus, input:focus {
  border-color: #28a745;
  outline: none;
}

button {
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin: 5px 5px 15px; /* Mehr Abstand unten */
}

button:hover {
  background-color: #218838;
}

#kilometer-felder div {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

#kilometer-felder label {
  width: 120px;
  margin-right: 10px;
  text-align: left;
  color: #e0e0e0;
}

#kilometer-felder input {
  flex: 1;
  background-color: #333;
  color: #e0e0e0;
}

#ergebnis-tabelle table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

#ergebnis-tabelle th, #ergebnis-tabelle td {
  border: 1px solid #444;
  padding: 8px;
  text-align: left;
  color: #e0e0e0;
}

#ergebnis-tabelle th {
  background-color: #333;
}

#ergebnis-summary p {
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #e0e0e0;
}

.berechnete-autos-ueberschrift {
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #e0e0e0;
}

#ergebnis-summary ul {
  list-style-type: none;
  padding: 0;
  margin-top: 10px;
}

#ergebnis-summary li {
  margin-bottom: 10px;
  font-size: 16px;
  color: #e0e0e0;
}

/* Impressumsseite */
#impressum-page {
  max-width: 600px;
}

.impressum-content {
  padding: 20px;
}

.impressum-content h2 {
  color: #28a745;
  margin-bottom: 20px;
  text-align: center;
}

.impressum-content h3 {
  color: #e0e0e0;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 16px;
}

.impressum-content p {
  margin-bottom: 10px;
  line-height: 1.5;
}

/* Footer */
footer {
  position: relative;
  margin-top: 20px;
  padding: 15px 0;
  background-color: #1e1e1e;
  width: 100%;
  text-align: center;
}

.footer-content {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;
}

.footer-links {
  margin-bottom: 10px;
}

.footer-links a {
  color: #28a745;
  text-decoration: none;
}

.footer-links a:hover {
  text-decoration: underline;
}

.version {
  font-size: 12px;
  color: #999;
}

.footer-spacer {
  height: 20px;
}

/* Mobile Optimierungen */
@media (max-width: 768px) {
  .container {
    margin-bottom: 40px;
    padding-bottom: 20px;
  }
  
  button {
    padding: 12px 24px;
  }
  
  #ergebnisseite {
    padding-bottom: 30px;
  }
}
