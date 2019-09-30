const { app, BrowserWindow, ipcMain } = require('electron');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadFile('index.html');
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});



//=============================================
var day=29; var month=08; var year=2019;
var DlDate = new Date(year,month,day);
//console.log(DlDate);

var Client = require('ftp');
var c = new Client();
c.on('ready', function() {
  c.list(function(err, list) {
    if (err) throw err;
    //pass list data to electron window
    ipcMain.on('listData', (event) => {
      event.sender.send('listData', { mylist: list });
    });
  c.end();
  });
});
// connect to localhost:21 as efi4 with password 1033
c.connect({
  host: "localhost",
  port: 21,
  user: "efi4",
  password: "1033",
  debug: console.log
});
//console.log(c);

//https://github.com/mscdex/node-ftp
