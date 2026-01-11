const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

require('dotenv').config()

let mainWindow

function createMainWindow(){
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.resolve(__dirname, '../preload/preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    })

    server=require('../backend/server.js')
    mainWindow.loadFile(path.join(__dirname, '../renderer/pages/login/login.html'))
}

ipcMain.handle('get-pw', () => {
    return process.env.PW
})

ipcMain.on('fechar', () => {
    app.quit()
})

ipcMain.on('navigate', (event, page) =>{
    const pages = {
        login: path.join(__dirname, '../renderer/pages/login/login.html'),
        home: path.join(__dirname, '../renderer/pages/home/home.html'),
        diarios: path.join(__dirname, '../renderer/pages/diarios/diarios.html'),
        feiticos: path.join(__dirname, '../renderer/pages/feiticos/feiticos.html'),
        clame: path.join(__dirname, '../renderer/pages/clame/clame.html')
    }
    if(pages[page]){
        mainWindow.loadFile(pages[page])
    } else {
        console.error(`Página desconhecida: ${page}`)
    }
})

ipcMain.on('ir-para-pagina', (event, pagina) =>{
    if (mainWindow && pagina){
        mainWindow.loadURL(path.join(__dirname, `../renderer/pages/${pagina}/${pagina}.html`))
    }
})

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