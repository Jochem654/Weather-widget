// This is for the creation of a browser window
const { app, BrowserWindow } = require('electron');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true,               
    titleBarStyle: 'hidden',  
    titleBarOverlay: true,  
    webPreferences: {
        contextIsolation: true
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();
});
