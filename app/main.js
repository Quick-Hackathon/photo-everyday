const path = require("path");
const { app, BrowserWindow, Menu } = require("electron");
const isElectronDev = require("electron-is-dev");

// disable security warnings, useful but annoying
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";

/**
 * @type {Electron.BrowserWindow}
 */
let mainWindow;

const gotTheLock = app.requestSingleInstanceLock();

const appOnReady = () => {
    console.log("App ready, creating main window");
    createMenu();
    createWindow();
    if (isElectronDev) {
        initDevTools();
    }
};

const createWindow = () => {
    mainWindow = new BrowserWindow({
        show: true,
        resizable: isElectronDev,
        height: 700,
        width: isElectronDev ? 1600 : 700
    });

    if (isElectronDev) {
        mainWindow.loadURL("http://localhost:3000");
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), "build/index.html"));
    }

    mainWindow.on("show", mainWindowOnShow);
    mainWindow.on("close", mainWindowOnClose);
};

const initDevTools = () => {
    const {
        default: installExtension,
        REACT_DEVELOPER_TOOLS,
        REDUX_DEVTOOLS
    } = require("electron-devtools-installer");

    mainWindow.webContents.openDevTools();

    [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS].forEach(extension => {
        installExtension(extension)
            .then(name => console.log(`Added Extension: ${name}`))
            .catch(err => console.log("An error occurred: ", err));
    });
};

const createMenu = () => {
    const template = [
        {
            label: "Edit",
            submenu: [
                { role: "undo" },
                { role: "redo" },
                { type: "separator" },
                { role: "cut" },
                { role: "copy" },
                { role: "paste" },
                { role: "pasteandmatchstyle" },
                { role: "delete" },
                { role: "selectall" }
            ]
        },
        {
            label: "View",
            submenu: [
                { role: "reload" },
                { role: "forcereload" },
                { role: "toggledevtools" },
                { type: "separator" },
                { role: "resetzoom" },
                { role: "zoomin" },
                { role: "zoomout" },
                { type: "separator" },
                { role: "togglefullscreen" }
            ]
        },
        {
            role: "window",
            submenu: [{ role: "minimize" }, { role: "close" }]
        }
    ];

    if (process.platform === "darwin") {
        template.unshift({
            label: app.getName(),
            submenu: [
                { role: "about" },
                { type: "separator" },
                { role: "services", submenu: [] },
                { type: "separator" },
                { role: "hide" },
                { role: "hideothers" },
                { role: "unhide" },
                { type: "separator" },
                { role: "quit" }
            ]
        });

        // Window menu
        template[3].submenu = [
            { role: "close" },
            { role: "minimize" },
            { role: "zoom" },
            { type: "separator" },
            { role: "front" }
        ];
    }

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
};

const mainWindowOnShow = () => {
    mainWindow.maximize();
};

const mainWindowOnClose = () => {
    console.log("Main window closed, app quitting");
    app.quit();
};

if (!gotTheLock) {
    app.quit();
} else {
    app.on("second-instance", (event, commandLine, workingDirectory) => {
        console.log("App is already running");
        if (mainWindow) {
            if (mainWindow.isMinimized()) myWindow.restore();
            mainWindow.focus();
        }
    });

    app.on("ready", appOnReady);
}
