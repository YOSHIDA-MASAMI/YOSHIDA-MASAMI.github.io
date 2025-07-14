const { app, BrowserWindow } = require('electron')
const path = require('path') // Asegúrate de importar path

const createWindow = () => {
  const win = new BrowserWindow({
    width: 720,
    height: 600,
    minWidth: 400, // Ancho mínimo recomendado para una buena UI
    minHeight: 550, // Altura mínima recomendada
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js'), // Si necesitas preload, descomenta y crea el archivo
      contextIsolation: true, // Recomendado por seguridad
      nodeIntegration: false // Recomendado por seguridad
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  // Manejo para macOS: reabrir ventana si se cierra todo y el dock icon se clica
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// Cerrar la aplicación cuando todas las ventanas están cerradas (excepto en macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})