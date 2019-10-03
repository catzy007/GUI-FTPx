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
var data;
ipcMain.on('arrMsg',(event, arg) => {
  console.log('index ' + arg);
  var Client = require('ftp');
  var c = new Client();
  c.on('ready', function() {
    c.list(function(err, list) {
      if (err) throw (err);
      //console.log(list);
      event.returnValue = list
      console.log(list[0].name);
    c.end();
    });
  });
  // connect to server
  c.connect({
    host: arg[0],
    port: arg[1],
    user: arg[2],
    password: arg[3],
    //debug: console.log
  });
});

//https://github.com/mscdex/node-ftp

