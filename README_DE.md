# Electron: Fullscreen App

[English](README.md)

Ein minimaler p5.js-Sketch in einer
[Electron](https://www.electronjs.org/)-App, die im Vollbild ohne
Browser-Oberfläche startet – für Installationen und Ausstellungen. Mit
Entwicklungsmodus inklusive Live-Reload und fertigen Builds für macOS,
Windows und Linux, die ohne Node.js oder VS Code laufen.

## Installation

Voraussetzungen: [Node.js](https://nodejs.org/) (LTS) und
[Visual Studio Code](https://code.visualstudio.com/).

1. Den Ordner in Visual Studio Code öffnen.
2. Ein Terminal öffnen (`Terminal → New Terminal`) und die Abhängigkeiten
   installieren (nur einmal nötig):
   ```sh
   npm install
   ```

Abhängigkeiten (`package.json`): Electron 44, electron-builder 26.
Bibliotheken in `sketch/libraries/`: p5.js 1.10.0, p5.sound 1.0.1
(eingebunden, nicht verwendet).

## Ausführen

Entwicklungsmodus starten:

```sh
npm run dev
```

`npm run dev` öffnet die App in einem Fenster, die Entwicklertools in einem
eigenen Fenster (für `console.log()`-Ausgaben und Fehler). Beim Speichern
einer Datei in `sketch/` lädt der Sketch neu; bei Änderungen an `main.js`
startet die App neu. `npm start` zeigt die App wie in der Ausstellung:
Vollbild, ohne Entwicklertools und Reload, und der Bildschirm geht nicht in
den Ruhezustand.

Tasten: `Escape` beendet die App, `Cmd/Ctrl` + `F` schaltet Vollbild
ein/aus, `F12` die Entwicklertools.

### App bauen

Ein Build macht aus dem Projekt eine eigenständige App. Alle Ergebnisse
landen in `dist/`.

| Befehl                | Ergebnis                                                                      |
| --------------------- | ----------------------------------------------------------------------------- |
| `npm run pack`        | Schneller Test-Build für den eigenen Computer, ohne Installer                 |
| `npm run build`       | Build für den Computer, auf dem gearbeitet wird                               |
| `npm run build:mac`   | macOS: `.dmg` und `.zip` (läuft auf Apple Silicon und Intel)                  |
| `npm run build:win`   | Windows: Installer (`Setup.exe`) und `portable.exe` (läuft ohne Installation) |
| `npm run build:linux` | Linux: `.AppImage`                                                            |
| `npm run build:all`   | Alle oben genannten                                                           |

Alle Plattformen lassen sich auf einem Mac bauen. Der erste Build dauert
länger, weil die nötigen Werkzeuge heruntergeladen werden.

- **Name und Version:** `productName` im Abschnitt `build` und `version` in
  `package.json` anpassen. Beides erscheint in den Dateinamen des Builds.
- **App-Icon:** einen Ordner `build/` mit einem quadratischen `icon.png`
  (mindestens 1024 × 1024 px) anlegen. Ohne Icon erscheint das
  Standard-Icon von Electron.
- **App auf einem anderen Computer öffnen:** Die Builds sind nicht
  signiert, deshalb warnt das System beim ersten Start. macOS: Rechtsklick
  auf die App → *Öffnen* → *Öffnen*; meldet macOS, die App sei
  «beschädigt», `xattr -cr "/Applications/Electron P5 Starter.app"`
  ausführen. Windows: im SmartScreen-Dialog auf *Weitere Informationen* →
  *Trotzdem ausführen* klicken. Linux: `chmod +x *.AppImage`.

## Coding-Hilfe

### Projektstruktur

```
Electron_P5_Starter/
├── .vscode/                # VS-Code-Einstellungen, p5.js-Autovervollständigung
├── build/                  # (optional) App-Icon
├── dist/                   # Hier landen die gebauten Apps
├── sketch/
│   ├── libraries/
│   │   ├── p5.min.js
│   │   └── p5.sound.min.js
│   ├── index.html          # Lädt Bibliotheken + Sketch
│   ├── sketch.js           # Dein Sketch — diese Datei bearbeiten
│   └── style.css
├── main.js                 # Electron-Hauptprozess (erstellt das Fenster)
└── package.json            # Scripts und Build-Konfiguration
```

### Was passiert wo

- **`sketch/sketch.js`**: `setup()` erstellt eine Zeichenfläche in
  Fenstergrösse, `draw()` füllt sie weiss und zeichnet ein «X» darüber,
  `windowResized()` passt die Zeichenfläche an die Bildschirmgrösse an. Das
  durch den eigenen Sketch ersetzen. Für eine Installation `noCursor();` in
  `setup()` einfügen, um den Mauszeiger auszublenden.
- **`main.js` → `createWindow()`**: öffnet ein Fenster mit 1280×800, im
  Vollbild, ausser mit `--dev`, und lädt `sketch/index.html`. Der Handler
  `before-input-event` setzt die Tasten um.
- **`main.js` → `watchForChanges()`**: nur im Entwicklungsmodus. Lädt die
  Seite neu, wenn sich eine Datei in `sketch/` ändert, und startet die App
  neu, wenn sich `main.js` ändert.
- **`main.js` (Ende)**: erlaubt nur eine laufende Instanz und hält
  ausserhalb des Entwicklungsmodus den Bildschirm mit `powerSaveBlocker`
  wach.
- **`package.json` → `build`**: Einstellungen für electron-builder (App-ID,
  Produktname, welche Dateien in die App kommen, Ziele pro Plattform).
