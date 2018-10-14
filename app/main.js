const { app, BrowserWindow } = require("electron");
const isElectronDev = require("electron-is-dev");
const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS,
    REDUX_DEVTOOLS
} = require("electron-devtools-installer");

// disable security warnings, useful but annoying
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";

/**
 * @type {BrowserWindow}
 */
let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        show: true,
        height: 600,
        width: 800
    });

    mainWindow.loadURL("http://localhost:3000/");
    mainWindow.on("show", mainWindowOnShow);
};

const initDevTools = () => {
    mainWindow.webContents.openDevTools();

    [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS].forEach(extension => {
        installExtension(extension)
            .then(name => console.log(`Added Extension: ${name}`))
            .catch(err => console.log("An error occurred: ", err));
    });
};

const mainWindowOnShow = () => {
    mainWindow.maximize();
};

app.on("ready", () => {
    console.log("App ready, creating main window");
    createWindow();
    if (isElectronDev) {
        initDevTools();
    }
});
