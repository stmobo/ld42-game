const process = require('process');
const {app, BrowserWindow} = require('electron');

let win = null;

function openMainWindow() {
    win = new BrowserWindow({width: 900, height: 700, webPreferences: { webSecurity: false }});
    win.loadFile('index.html');
}

app.on('ready', openMainWindow);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') { 
        app.quit();
    }
});

app.on('activate', () => {
    if(win === null) {
        openMainWindow();
    }
})
