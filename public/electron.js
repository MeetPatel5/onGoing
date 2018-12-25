const { BrowserWindow, app, dialog, ipcMain, Menu } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

const createWindow = () => {
  process.stdout.write("Creating a window");
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      webSecurity: isDev ? false : true
    }
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:5000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  mainWindow.on("closed", () => (mainWindow = null));
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  process.stdout.write("quiting a window");
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
// ==================================================
// Custom Code Goes Here
// ==================================================
ipcMain.on("send-data", (event, data) => {
  dialog.showMessageBox({
    type: "info",
    buttons: ["Okkk"],
    message: `Your Input Data: ${data}`
  });
});
