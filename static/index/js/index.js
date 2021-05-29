// JavaScript source code
const electron = require('electron');
const url = require('url');
const path = require('path');
const { Main } = require('electron');


const { app, BrowserWindow, Menu } = electron;

let mainWindow;

// Listen for app to be ready
app.on('ready', function () {

    // Create new window.
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        icon: __dirname + '/img/logo.png',
        webPreferences: {
            nodeIntegration: true
        }
    });

    //Load HTML file into window >> "file://dirname/html/index.html".
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../html/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Quit app when closed
    mainWindow.on('closed', function () {
        app.quit();
    });

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    // Insert menu
    Menu.setApplicationMenu(mainMenu);
});

// Create menu template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Close',
                click() {
                    app.quit();
                }
            }
        ]
    }
];

// If MAC, add empty object to menu
if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({});
}

// Add developer tools item if not in production
if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}

// Check to see if we may need any hotkey implementations.
// Need to figure out how to change app icon.
// Need to figure out content security policy.