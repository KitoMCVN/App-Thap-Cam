import { join } from "path";
import { BrowserWindow, app, ipcMain, IpcMainEvent, nativeTheme } from "electron";
import isDev from "electron-is-dev";

const height = 720;
const width = 1280;

let prevBounds = { width, height, x: 0, y: 0 };

function createWindow() {
  const window = new BrowserWindow({
    width,
    height,
    transparent: true,
    frame: false,
    show: true,
    resizable: true,
    fullscreenable: true,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
    },
    icon: __dirname + "./resources/app.ico",
  });

  const port = process.env.PORT || 3000;
  const url = isDev ? `http://localhost:${port}` : join(__dirname, "../src/out/index.html");

  if (isDev) {
    window?.loadURL(url);
  } else {
    window?.loadFile(url);
  }

  ipcMain.on("minimize", () => {
    window.isMinimized() ? window.restore() : window.minimize();
  });

  ipcMain.on("maximize", () => {
    if (window.isMaximized()) {
      window.restore();
      window.setBounds(prevBounds);
    } else {
      prevBounds = window.getBounds();
      window.maximize();
    }
  });

  ipcMain.on("close", () => {
    window.close();
  });

  ipcMain.handle("dark-mode:toggle", () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = "light";
    } else {
      nativeTheme.themeSource = "dark";
    }
    return nativeTheme.shouldUseDarkColors;
  });

  ipcMain.handle("dark-mode:system", () => {
    nativeTheme.themeSource = "system";
  });
}

app.setUserTasks([
  {
    program: process.execPath,
    arguments: "--new-window",
    iconPath: process.execPath,
    iconIndex: 0,
    title: "New Window",
    description: "Create a new window",
  },
]);

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("message", (event: IpcMainEvent, message: any) => {
  console.log(message);
  setTimeout(() => event.sender.send("message", "hi from electron"), 500);
});
