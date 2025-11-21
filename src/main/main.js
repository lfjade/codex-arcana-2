const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
require('../backend/server.js')

function createMainWindow(){
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    })

    mainWindow.loadFile(path.join(__dirname, '../renderer/html/login.html'))
}

app.whenReady().then(() => {
    createMainWindow(),
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length===0) createMainWindow()
    })
})

app.on('window-all-closed', () =>{
    if (process.platform!== 'darwin'){
        app.quit()
    }
})