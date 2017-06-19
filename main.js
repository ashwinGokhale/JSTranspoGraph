
var path = require('path');
const Location = require('./lib/location');
const Vehicle = require('./lib/vehicle');
const Passenger = require('./lib/passenger');
const Edge = require('./lib/edge');
const Graph = require('./lib/graph');

// Module to control application life.
'use strict';

var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;


var mainWindow = null;

// Start up the app
app.on('ready', function(){
    // Create the browser window.
    mainWindow = new BrowserWindow({ width: 1700, height: 900 });

    // and load the index.html of the app.
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    // Open the devtools.
    mainWindow.openDevTools();
    // Emitted when the window is closed.
    mainWindow.on('closed', function () {

        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
        app.quit();
    }
});
