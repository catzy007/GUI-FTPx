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
var serverAddr = "localhost";
var serverPort = "21";
var usernameFtp = "efi4";
var passwordFtp = "1033";


//=============================================
function getData () {
  return new Promise((resolve, reject) => {
    var Client = require('ftp');
    var c = new Client();
    c.on('ready', function() {
      c.list(function(err, list) {
        if (err) reject(err); //reject promise
        //console.log(list);
        resolve(list) //resolve promise
      c.end();
      });
    });
    // connect to localhost:21 as efi4 with password 1033
    c.connect({
      host: serverAddr,
      port: serverPort,
      user: usernameFtp,
      password: passwordFtp,
      //debug: console.log
    });
  });
}

//==================================
function getFile(){
  return new Promise((resolve, reject) => {
    var Client = require('ftp');
    var fs = require('fs');

    var c = new Client();
    c.on('ready', function() {
      c.put('2.jpeg', '/home/efi4/2x.jpeg', function(err) {
        if (err) reject(err);
        resolve("done!");
        c.end();
      });
    });
    // connect to localhost:21 as anonymous
    c.connect({
      host: serverAddr,
      port: serverPort,
      user: usernameFtp,
      password: passwordFtp,
    });
  });
}



//pass list data to electron window
ipcMain.on('listData', (event) => {
  getData().then((list) => {    
    event.sender.send('listData', { mylist: list });
  }).catch((err) => {
    event.sender.send('errorData', { error: err });
  })

  getFile().then((out) => {
    console.log(out);
  }).catch((err) => {
    console.log(err);
  })
});
//https://github.com/mscdex/node-ftp
