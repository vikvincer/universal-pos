import { app, BrowserWindow } from 'electron';
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    // webPreferences: {
    //   preload: path.join(__dirname, 'preload.js')
    // }
  })
  win.maximize();

//   win.loadURL(`http://${hostConfig}:${portConfig}`);
  // win.loadURL(`http://127.0.0.1:5173/`);

  win.loadURL(`http://localhost:4000/`); //Default host


//   nativeTheme.themeSource = 'dark'
}

app?.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})



app?.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
