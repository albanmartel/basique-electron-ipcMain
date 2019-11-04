// Ceci va fonctionner dans le processus principal, mais sera`undefined`
// dans un processus de rendu :
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

let mainWindow = null

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600,
    autoHideMenuBar : true,
    webPreferences: {plugins: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  /*
  // Afficher les outils de développements dans la fenêter électron
  // disponible aussi via Ctrl+Shift+I
  mainWindow.webContents.openDevTools()
  */


  // and load the index.html of the app.
  // mainWindow.loadFile('test.html')
  let file = 'file://'+__dirname+'/index.html'
  mainWindow.loadURL(file)
  // Emitted when the window is moved.
  mainWindow.on('move',function(){
      console.log('electron move')
  })
  // Emitted when the window is minimize.
  mainWindow.on('minimize',function(){
      console.log('electron minimize')
  })
  // Emitted when the window is maximize.
  mainWindow.on('maximize',function(){
      console.log('electron maximize')
  })
  // Emitted when the window is restore.
  mainWindow.on('restore',function(){
      console.log('electron restore')
  })
  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    console.log("arret application")
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function(){
  createWindow()
  console.log("fenetre créée")
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// Dans le processus principal .
// Ecoute de ce que nous envoie la vue

ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // affiche "ping asynchrone"
  event.reply('asynchronous-reply', 'pong asynchronous')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // affiche "ping synchrone"
  event.returnValue = 'pong synchronous'
})
