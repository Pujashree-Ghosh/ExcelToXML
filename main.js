const { app, BrowserWindow } = require("electron");
const electron = require("electron");
const path = require("path");
const Menu = electron.Menu;
var ipc = require("electron").ipcMain;
var os = require("os");
var { dialog } = require("electron");
var mainWindow = null;

ipc.on("close-main-window", function () {
  app.quit();
});

app.on("ready", function () {
  mainWindow = new BrowserWindow({
    resizable: true,
    height: 600,
    width: 800,
    webPreferences: {
      contextIsolation: false,
      enableRemoteModule: false,
      nodeIntegration: true,
    },
  });
  mainWindow.setMenu(null);
  //   mainWindow.webContents.openDevTools();

  mainWindow.loadURL("file://" + __dirname + "/index.html");
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
  global.filepath = null;
  ipc.on("open-file-dialog-for-file", function (event) {
    if (os.platform() === "linux" || os.platform() === "win32") {
      dialog
        .showOpenDialog({
          title: "Select a file",
          defaultPath: path.join(__dirname, "../assets/"),
          buttonLabel: "Upload",
          filters: [
            {
              name: "Excel Files",
              extensions: ["xlsx"],
            },
          ],
          properties: ["openFile"],
        })
        .then((file) => {
          if (!file.canceled) {
            global.filepath = file.filePaths[0].toString();

            event.sender.send("selected-file", global.filepath);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dialog
        .showOpenDialog({
          title: "Select the File to be uploaded",
          defaultPath: path.join(__dirname, "../assets/"),
          buttonLabel: "Upload",
          filters: [
            {
              name: "Excel Files",
              extensions: ["xlsx"],
            },
          ],
          properties: ["openFile", "openDirectory"],
        })
        .then((file) => {
          console.log(file.canceled);
          if (!file.canceled) {
            global.filepath = file.filePaths[0].toString();
            console.log(global.filepath);
            event.sender.send("selected-file", global.filepath);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});
