"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const electron_1 = require("electron");
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
const height = 720;
const width = 1280;
let prevBounds = { width, height, x: 0, y: 0 };
function createWindow() {
    const window = new electron_1.BrowserWindow({
        width,
        height,
        transparent: true,
        frame: false,
        show: true,
        resizable: true,
        fullscreenable: true,
        webPreferences: {
            preload: (0, path_1.join)(__dirname, "preload.js"),
        },
    });
    const port = process.env.PORT || 3000;
    const url = electron_is_dev_1.default ? `http://localhost:${port}` : (0, path_1.join)(__dirname, "../src/out/index.html");
    if (electron_is_dev_1.default) {
        window?.loadURL(url);
    }
    else {
        window?.loadFile(url);
    }
    electron_1.ipcMain.on("minimize", () => {
        window.isMinimized() ? window.restore() : window.minimize();
    });
    electron_1.ipcMain.on("maximize", () => {
        if (window.isMaximized()) {
            window.restore();
            window.setBounds(prevBounds);
        }
        else {
            prevBounds = window.getBounds();
            window.maximize();
        }
    });
    electron_1.ipcMain.on("close", () => {
        window.close();
    });
    electron_1.ipcMain.handle("dark-mode:toggle", () => {
        if (electron_1.nativeTheme.shouldUseDarkColors) {
            electron_1.nativeTheme.themeSource = "light";
        }
        else {
            electron_1.nativeTheme.themeSource = "dark";
        }
        return electron_1.nativeTheme.shouldUseDarkColors;
    });
    electron_1.ipcMain.handle("dark-mode:system", () => {
        electron_1.nativeTheme.themeSource = "system";
    });
}
electron_1.app.setUserTasks([
    {
        program: process.execPath,
        arguments: "--new-window",
        iconPath: process.execPath,
        iconIndex: 0,
        title: "New Window",
        description: "Create a new window",
    },
]);
electron_1.app.whenReady().then(() => {
    createWindow();
    electron_1.app.on("activate", () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin")
        electron_1.app.quit();
});
electron_1.ipcMain.on("message", (event, message) => {
    console.log(message);
    setTimeout(() => event.sender.send("message", "hi from electron"), 500);
});
