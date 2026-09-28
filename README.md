# Electron: Fullscreen App

[Deutsch](README_DE.md)

A minimal p5.js sketch packaged in an [Electron](https://www.electronjs.org/)
app that opens fullscreen without any browser interface — for installations
and exhibitions. Includes a develop mode with live reload and ready-made
builds for macOS, Windows and Linux that run without Node.js or VS Code.

## Installation

Requirements: [Node.js](https://nodejs.org/) (LTS) and
[Visual Studio Code](https://code.visualstudio.com/).

1. Open the folder in Visual Studio Code.
2. Open a terminal (`Terminal → New Terminal`) and install the dependencies
   (only needed once):
   ```sh
   npm install
   ```

Dependencies (`package.json`): Electron 44, electron-builder 26. Libraries
in `sketch/libraries/`: p5.js 1.10.0, p5.sound 1.0.1 (included, not used).

## How to Run

Start the develop mode:

```sh
npm run dev
```

`npm run dev` opens the app in a window, with the developer tools in a
separate window (for `console.log()` output and errors). Saving a file in
`sketch/` reloads the sketch; changing `main.js` restarts the app.
`npm start` runs the app as in the exhibition: fullscreen, no dev tools, no
reload, and the display is kept from going to sleep.

Keys: `Escape` quits the app, `Cmd/Ctrl` + `F` toggles fullscreen, `F12`
toggles the developer tools.

### Building the App

A build turns the project into a standalone app. All results are saved in
`dist/`.

| Command               | Result                                                                        |
| --------------------- | ----------------------------------------------------------------------------- |
| `npm run pack`        | Quick test build for your own computer, no installer                          |
| `npm run build`       | Build for the computer you are working on                                     |
| `npm run build:mac`   | macOS: `.dmg` and `.zip` (runs on Apple Silicon and Intel)                    |
| `npm run build:win`   | Windows: installer (`Setup.exe`) and `portable.exe` (runs without installing) |
| `npm run build:linux` | Linux: `.AppImage`                                                            |
| `npm run build:all`   | All of the above                                                              |

All platforms can be built from a Mac. The first build takes a while,
because the needed tools are downloaded.

- **Name and version:** change `productName` in the `build` section and
  `version` in `package.json`. Both appear in the file names of the build.
- **App icon:** create a folder `build/` with a square `icon.png` (at least
  1024 × 1024 px). Without it, the default Electron icon is used.
- **Opening the app on another computer:** the builds are not signed, so
  the system warns the first time. macOS: right-click the app → *Open* →
  *Open*; if macOS says the app is "damaged", run
  `xattr -cr "/Applications/Electron P5 Starter.app"`. Windows: in the
  SmartScreen dialog, click *More info* → *Run anyway*. Linux:
  `chmod +x *.AppImage`.

## Coding Help

### Project Structure

```
Electron_P5_Starter/
├── .vscode/                # VS Code settings, p5.js autocomplete
├── build/                  # (optional) app icon
├── dist/                   # Built apps end up here
├── sketch/
│   ├── libraries/
│   │   ├── p5.min.js
│   │   └── p5.sound.min.js
│   ├── index.html          # Loads libraries + sketch
│   ├── sketch.js           # Your sketch — edit this file
│   └── style.css
├── main.js                 # Electron main process (creates the window)
└── package.json            # Scripts and build configuration
```

### What Happens Where

- **`sketch/sketch.js`**: `setup()` creates a canvas the size of the
  window, `draw()` paints it white and draws an "X" across it,
  `windowResized()` keeps the canvas in sync with the screen size. Replace
  this with your own sketch. For an installation, add `noCursor();` in
  `setup()` to hide the mouse pointer.
- **`main.js` → `createWindow()`**: opens a 1280×800 window, fullscreen
  unless started with `--dev`, and loads `sketch/index.html`. The
  `before-input-event` handler implements the keys.
- **`main.js` → `watchForChanges()`**: only in dev mode. Reloads the page
  when a file in `sketch/` changes and restarts the app when `main.js`
  changes.
- **`main.js` (end)**: allows only one running instance and, outside dev
  mode, keeps the display awake with `powerSaveBlocker`.
- **`package.json` → `build`**: electron-builder settings (app id, product
  name, which files go into the app, targets per platform).
