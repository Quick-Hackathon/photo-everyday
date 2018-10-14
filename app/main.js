const { app, BrowserWindow } = require("electron");

// disable security warnings, useful but annoying
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    show: true,
    height: 600,
    width: 800
  });

  mainWindow.loadURL("https://google.com");
};

app.on("ready", () => {
  console.log("App ready, creating main window");
  // createMenu();
  createWindow();
});
